import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../schemas/user";

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {
  baseUrl: string = 'http://localhost:8888/api/account';

  constructor(private http: HttpClient) { }

  // private refreshEmployees() {
  //   this.http.get<User[]>(`${this.baseUrl}/account`)
  //     .subscribe(employees => {
  //       this.accounts$.set(employees);
  //     });
  // }

  createNewUser(data: User) {
    console.log(`${this.baseUrl}/`)
    console.log(data)
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  updateUser(id: string, data: User) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  fetchUser(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  printUsers() {
    return this.http.get<User[]>(this.baseUrl + "/getAllUsers");
  }
}
