import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, RouterLink, RouterLinkActive],
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
