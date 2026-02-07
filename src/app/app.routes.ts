import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { IntroComponent } from './intro/intro.component';
import { StackComponent } from './stack/stack.component';
import { ExperienceComponent } from './experience/experience.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: '<Denicola/> Portfolio',
    children: [
      { path: 'intro', component: IntroComponent },
      { path: 'stack', component: StackComponent },
      { path: 'experience', component: ExperienceComponent },
      { path: 'contact', component: ContactComponent }
    ]
  }
];
