import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MatTooltipModule, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})

export class LandingPageComponent implements OnDestroy, AfterViewInit {

  private scrollButton: HTMLElement | undefined;
  private autoSlideInterval!: ReturnType<typeof setInterval>;
  public hoverPhone: boolean = false;
  public hoverEmail: boolean = false;
  public currentIndex: number = 0;
  public techStackImages: string[] = [
    'assets/angular-logo.png',
    'assets/ts-logo.png',
    'assets/icons8-javascript.svg',
    'assets/aws-logo.png',
    'assets/icons8-bootstrap.svg',
    'assets/icons8-java.svg',
    'assets/icons8-node-js.svg',
    'assets/icons8-postgresql.svg',
  ];

  @ViewChild('homeContainer') scrollContainer!: ElementRef;
  @ViewChild('tooltip') tooltip: MatTooltip | undefined;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoSlide();
      this.scrollButton = this.document.querySelector('.scroll-button') as HTMLElement;
      this.scrollContainer.nativeElement.addEventListener('scroll', () => {
        this.handleScroll();
      });

      const highlight = document.querySelector('.cursor-highlight') as HTMLElement;
      document.addEventListener('mousemove', (e) => {
        highlight!.style.top = `${e.clientY}px`;
        highlight!.style.left = `${e.clientX}px`;
      });
    };
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.stopAutoSlide();
      this.scrollContainer.nativeElement.removeEventListener(
        'scroll',
        this.handleScroll
      );
    }
  }

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

  jumpToAbout() {
    const introSection = this.document.getElementById('Intro');
    introSection?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }

  jumpToStack() {
    const projectSection = this.document.getElementById('Stack');
    projectSection?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  jumpToExperience() {
    const projectSection = this.document.getElementById('experience');
    projectSection?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  jumpToContact() {
    const projectSection = this.document.getElementById('footer');
    projectSection?.scrollIntoView({
      behavior: 'smooth',
    });
  }


  copyText(id: string, tooltip: MatTooltip) {
    const textToCopy = this.document.getElementById(id)!.textContent || '';
    navigator.clipboard.writeText(textToCopy).then(() => {
      tooltip.disabled = false;
      tooltip.show();
      setTimeout(() => tooltip.hide(), 1000);
      setTimeout(() => (tooltip.disabled = true), 1100);
    });
  }


  getPositionClass(index: number): string {
    const total = this.techStackImages.length;
    const offset = (index - this.currentIndex + total) % total;

    if (offset === 0) return 'center';
    if (offset <= 2) return `right-${offset}`;
    if (offset >= total - 2) return `left-${total - offset}`;
    return '';
  }

  nextSlide() {
    this.stopAutoSlide();
    this.currentIndex = (this.currentIndex + 1) % this.techStackImages.length;
    this.startAutoSlide();
  }

  prevSlide() {
    this.stopAutoSlide();
    this.currentIndex = (this.currentIndex - 1 + this.techStackImages.length) % this.techStackImages.length;
    this.startAutoSlide();
  }

  startAutoSlide(intervalMs: number = 10000): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, intervalMs);
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    };
  }
}
