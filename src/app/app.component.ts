import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterModule, RouterOutlet, RouterLink],
    template: `
    <main>
      <a [routerLink]="['/']">
      </a>
      <section class="content"><router-outlet></router-outlet></section>
    </main>
  `,
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'personal-website';
}
