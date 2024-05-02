import {Component, ViewEncapsulation} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {TextInputBoxComponent} from "../../components/text-input-box/text-input-box.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TextInputBoxComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent {
username_field : String = "Username or email";
password_field : String = "Password";
}
