import { Component } from '@angular/core';
import { TextInputBoxComponent } from '../text-input-box/text-input-box.component';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    TextInputBoxComponent
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  name: String = "Full Name";
  email: String = "Email";
  message: String = "Message";
}
