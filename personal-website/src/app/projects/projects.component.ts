import { Component } from '@angular/core';
import { HeaderComponent } from "../shared-components/header/header.component";
import { FooterComponent } from "../shared-components/footer/footer.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

}
