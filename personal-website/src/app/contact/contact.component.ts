import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  public hoverPhone = false;
  public hoverEmail = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  copyText(id: string, tooltip: MatTooltip) {
    const textToCopy = this.document.getElementById(id)?.textContent ?? '';
    navigator.clipboard.writeText(textToCopy).then(() => {
      tooltip.disabled = false;
      tooltip.show();
      setTimeout(() => tooltip.hide(), 1000);
      setTimeout(() => (tooltip.disabled = true), 1100);
    });
  }
}

