import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit, OnDestroy, AfterViewInit {
  private scrollButton: HTMLElement | undefined;
  @ViewChild('homeContainer') scrollContainer!: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollButton = this.document.querySelector(
        '.scroll-button'
      ) as HTMLElement;
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
    };
  }

  handleScroll = (): void => {
    const scrollPosition = this.scrollContainer.nativeElement.scrollTop;
    if (scrollPosition > 50) {
      this.scrollButton?.classList.add('visible');
    } else {
      this.scrollButton?.classList.remove('visible');
    };
  };

  scrollToTop() {
    if (this.scrollContainer?.nativeElement) {
      this.scrollContainer.nativeElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  }

  jumpToAbout() {
    const introSection = this.document.getElementById('Intro');
    introSection?.scrollIntoView({
      behavior: 'smooth', block: "end"
    });
  }

  jumpToProjects() {
    const projectSection = this.document.getElementById('Projects');
    projectSection?.scrollIntoView({
      behavior: 'smooth'
    });
  }

   copyText(id: string) {
    const textToCopy = document.getElementById(id)!.textContent || '';
    navigator.clipboard.writeText(textToCopy);
  }
}
