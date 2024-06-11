import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../schemas/user';

@Injectable({
  providedIn: 'root',
})
export class AccountManagementService {
  baseUrl: string = 'https://bitlinkbackend.catenarymaps.org/accounts';

  constructor(private http: HttpClient) {}

  createNewUser(data: User) {
    console.log(`${this.baseUrl}/`);
    console.log(data);
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  updateUser(id: string, data: User) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  fetchUser(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  printUsers() {
    return this.http.get<User[]>(this.baseUrl + '/getAllUsers');
  }

  login(email: string, password: string) {
    let data = {
      email: email,
      password: password,
    };
    return this.http.post(
      `${this.baseUrl}/login/?email=${email}&password=${password}`,
      data,
      { withCredentials: true }
    );
  }

  getCurrentUser() {
    return this.http.get(this.baseUrl + '/user', {
      responseType: 'text',
      withCredentials: true,
    });
  }
}
