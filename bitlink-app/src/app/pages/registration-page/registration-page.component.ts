import {Component, ViewEncapsulation} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {TextInputBoxComponent} from "../../components/text-input-box/text-input-box.component";
import {User} from "../../schemas/user";
import {AccountManagementService} from "../../services/account-management/account-management.service";
import {HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TextInputBoxComponent,
    CommonModule
  ],
  providers: [HttpClientModule],
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
  success: boolean = false;
  accounts: User[] = [];

  error: string | undefined;

  newUser:any = {};

  constructor(private router:Router, private accountManagementService: AccountManagementService) {
  }

  GetEmail(email: string | undefined) {this.newUser.email = email;}
  GetEmail2(email: string | undefined) {this.newUser.email2 = email}
  GetUsername(username:string | undefined) {this.newUser.username = username}
  GetPassword(password:string | undefined) {this.newUser.password = password}
  GetPassword2(password:string | undefined) {this.newUser.password2 = password}

  validate() {
    console.log("Validating...")
    console.log(this.newUser)
    console.log(Object.hasOwn(this.newUser, "username"))
    if (!(Object.hasOwn(this.newUser, "email") && Object.hasOwn(this.newUser, "email2") && Object.hasOwn(this.newUser, "username") && Object.hasOwn(this.newUser, "password") && Object.hasOwn(this.newUser, "password2"))) {
      this.error = "All fields are required";
    }
    else if (this.newUser.email !== this.newUser.email2) {this.error = "Emails do not match";}
    else if (this.newUser.password !== this.newUser.password2) {this.error = "Passwords do not match";}
    else {
      this.error = undefined;
      let validUser: User = new User();
      validUser.email = this.newUser.email;
      validUser.password = this.newUser.password;
      validUser.username = this.newUser.username;
      validUser.name = this.newUser.username;

      this.accountManagementService.createNewUser(validUser).subscribe({
        next: () => {
          console.log("done");
        },
        error: () => {
        },
      });

      this.success = true;

      this.accountManagementService.printUsers().subscribe({
        next: (res) => {
          this.accounts = res;
        }
      })


    }
  }
}
