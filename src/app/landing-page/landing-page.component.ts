import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild, inject} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})

export class LandingPageComponent implements OnDestroy, AfterViewInit {

  private scrollButton: HTMLElement | undefined;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: AntigravityParticle[] = [];
  private animationId: number | null = null;
  private mouseX: number = 0;
  private mouseY: number = 0;

  public router = inject(Router);
  public currentIndex: number = 0;


  @ViewChild('homeContainer') scrollContainer!: ElementRef;
  @ViewChild('waveCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollButton = this.document.querySelector('.scroll-button') as HTMLElement;
      this.scrollContainer.nativeElement.addEventListener('scroll', () => {
        this.handleScroll();
      });

      // Initialize wave effect
      this.initWaveEffect();
    };
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollContainer.nativeElement.removeEventListener(
        'scroll',
        this.handleScroll
      );

      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }

      this.document.removeEventListener('mousemove', this.handleMouseMove);
    }
  }

  initWaveEffect(): void {
    if (!this.canvasRef) {
      console.error('Canvas ref not found');
      return;
    }

    this.canvas = this.canvasRef.nativeElement;
    const context = this.canvas.getContext('2d');

    if (!context) {
      console.error('Could not get 2d context');
      return;
    }

    this.ctx = context;

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Create initial particles distributed across the screen
    this.createParticles();

    this.document.addEventListener('mousemove', this.handleMouseMove);
    this.animate();

    console.log('Wave effect initialized');
  }

  createParticles(): void {
    this.particles = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      this.particles.push(new AntigravityParticle(x, y));
    }
  }

  resizeCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  handleMouseMove = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;

    // Don't create effect when hovering over footer or header
    if (target.closest('.footer') || target.closest('.header')) {
      return;
    }

    // Update mouse position
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  animate = (): void => {
    if (!this.ctx || !this.canvas) {
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    for (const particle of this.particles) {
      // Apply antigravity force (subtle repulsion from cursor)
      const dx = particle.x - this.mouseX;
      const dy = particle.y - this.mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150 && distance > 0) {
        const force = (150 - distance) / 150;
        particle.vx += (dx / distance) * force * 0.5;
        particle.vy += (dy / distance) * force * 0.5;
      }

      particle.update();
      particle.draw(this.ctx);
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  handleScroll = (): void => {
    const scrollPosition = this.scrollContainer.nativeElement.scrollTop;
    if (scrollPosition > 50) {
      this.scrollButton?.classList.add('visible');
    } else {
      this.scrollButton?.classList.remove('visible');
    }
  };

  scrollToTop() {
    if (this.scrollContainer?.nativeElement) {
      this.scrollContainer.nativeElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  jumpToContent(id: string) {
    const section = this.document.getElementById(id);
    section?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }

}

class AntigravityParticle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.homeX = x;
    this.homeY = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.3 + 0.4;

    // Random color from palette
    const colors = ['#FA8072', '#7873f5', '#e877a0', '#a875d8'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(): void {
    // Spring force to pull back to home position
    const springStrength = 0.01;
    const dx = this.homeX - this.x;
    const dy = this.homeY - this.y;

    this.vx += dx * springStrength;
    this.vy += dy * springStrength;

    // Apply velocity
    this.x += this.vx;
    this.y += this.vy;

    // Apply damping (friction)
    this.vx *= 0.95;
    this.vy *= 0.95;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // Add subtle glow effect
    ctx.globalCompositeOperation = 'lighter';
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius * 3
    );
    gradient.addColorStop(0, this.color + '60');
    gradient.addColorStop(1, this.color + '00');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
