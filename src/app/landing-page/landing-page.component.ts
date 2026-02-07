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

  public router = inject(Router);
  public currentIndex: number = 0;
  public currentYear: number = new Date().getFullYear();

  @ViewChild('homeContainer') scrollContainer!: ElementRef;

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
    };
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
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

  jumpToContent(id: string) {
    const section = this.document.getElementById(id);
    section?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }

}
