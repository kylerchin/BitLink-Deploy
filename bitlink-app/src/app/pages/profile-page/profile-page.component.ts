import {Component, ViewEncapsulation} from '@angular/core';
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {User} from "../../schemas/user";
import {NgIf} from "@angular/common";
import {AccountManagementService} from "../../services/account-management/account-management.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    SidebarComponent,
    NgIf,
    FormsModule
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProfilePageComponent {
  currentName : String | undefined;
  error: string | undefined;
  success: boolean | undefined;

  id: string = "664a8e9008885a342d2837b4";
  nameInput: string | undefined;
  usernameInput: string | undefined;
  emailInput: string | undefined;
  passwordInput: string | undefined;
  password2Input: string | undefined;

  constructor(private accountManagementService: AccountManagementService) {
    this.currentName = this.nameInit();
  }

  nameInit() {
    let name = undefined;
    this.accountManagementService.fetchUser("664a8e9008885a342d2837b4").subscribe({
      next: (res)=> {console.log(res); name = JSON.parse(res).name}
    });
    if (name) return name;
    else return undefined;
  }

  update() {
    if (this.passwordInput != undefined) {
      if (this.passwordInput != this.password2Input) {
        this.error = "Passwords do not match.";
        return;
      }
    }

    let changes = new User();
    if (this.nameInput) changes.name = this.nameInput;
    if (this.usernameInput) changes.username = this.usernameInput;
    if (this.emailInput) changes.email = this.emailInput;
    if (this.passwordInput) changes.password = this.passwordInput;

    this.accountManagementService.updateUser(this.id, changes)
      .subscribe(() => {
        }
    )

    this.accountManagementService.fetchUser(this.id).subscribe((res : any) => {
      window.location.reload();
      this.currentName = res.name;
    })
  }
}
