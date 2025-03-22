import { Component } from '@angular/core';
import { FooterComponent } from '../shared-components/footer/footer.component';
import { HeaderComponent } from '../shared-components/header/header.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {

}
