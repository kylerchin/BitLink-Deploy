import {Component, ViewEncapsulation} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {TextInputBoxComponent} from "../../components/text-input-box/text-input-box.component";

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TextInputBoxComponent
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegistrationPageComponent {
  email: String | undefined = "Email";
  email2: String | undefined = "Confirm Email";
  username : String = "Username";
  password: String = "Password";
  password2: String = "Confirm Password";

}
