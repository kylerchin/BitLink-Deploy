import {Component, ViewEncapsulation} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {TextInputBoxComponent} from "../../components/text-input-box/text-input-box.component";
import {AccountManagementService} from "../../services/account-management/account-management.service";
import {User} from "../../schemas/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TextInputBoxComponent,
    CommonModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent {
  username_field : String = "Username or email";
  password_field : String = "Password";

  email: string | undefined = "";
  password: string | undefined = "";

  user: User | undefined;

  message: String = "";

  constructor(private accountManagementService: AccountManagementService, private router: Router) {
  }

  GetEmail(email: string | undefined) {this.email = email;}
  GetPassword(password:string | undefined) {this.password = password}

  validate() {
    console.log(this.email)
    console.log(this.password)
    if (!this.email || !this.password) {
      this.message = "Email and password is required";
      return;
    }
    this.accountManagementService.login(this.email, this.password).subscribe({
      next: () => {
        console.log("logged in");
      },
      error: () => {
        console.log("done")
        this.router.navigate(["settings"])
      },
    })
  }
}
