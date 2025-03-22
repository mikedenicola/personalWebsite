import { Component } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [LandingPageComponent, RouterModule],
  template: `
    <main>
      <a [routerLink]="['/']">
      </a>
      <section class="content"><router-outlet></router-outlet></section>
    </main>
  `,
  styleUrls: ['./app.component.scss'],
  standalone: true
})
export class AppComponent {
  title = 'personal-website';
}
