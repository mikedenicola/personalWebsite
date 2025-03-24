import { Routes } from '@angular/router';

import { AboutMeComponent } from './about-me/about-me.component';
import { ProjectsComponent } from './projects/projects.component';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: LandingPageComponent, title: 'Home page' },
  { path: 'aboutMe', component: AboutMeComponent, title: 'About Me Page' },
  { path: 'projects', component: ProjectsComponent, title: 'Projects Page'},
  { path: '**', component: PageNotFoundComponent } // Wildcard route for 404 errors
];
