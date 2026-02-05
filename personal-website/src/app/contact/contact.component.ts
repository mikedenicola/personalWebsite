import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: FormGroup;
  readonly MAX_WORDS = 5000;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, this.wordLimitValidator.bind(this)]]
    });
  }

  wordLimitValidator(control: any) {
    if (!control.value) return null;
    const wordCount = this.getWordCount(control.value);
    return wordCount > this.MAX_WORDS ? { wordLimit: true } : null;
  }

  getWordCount(text: string): number {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  get messageWordCount(): number {
    return this.getWordCount(this.contactForm.get('message')?.value || '');
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const { email, subject, message } = this.contactForm.value;
      // Create mailto link with form data
      const mailtoLink = `mailto:denicolamichael99@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${email}\n\n${message}`)}`;
      window.location.href = mailtoLink;
    }
  }
}

