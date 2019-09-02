import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPLOYEES } from '../enums/links.enum';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  getQuery(query: string) {
    const url = `${EMPLOYEES}${query}`;
    const authToken = this.authService.getToken();

    return this.httpClient.get<[any]>(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken
      }
    }).toPromise();
  }

  getAll() {
    return this.getQuery(``);
  }

  getById(itemId: string) {
    return this.getQuery(itemId);
  }

  getByName(name: string) {
    return this.getQuery(`name/${name}`);
  }

  postQuery(query: string, item: any) {
    const url = `${EMPLOYEES}${query}`;
    const authToken = this.authService.getToken();

    return this.httpClient.post<any>(url, item, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken
      }
    }).toPromise();
  }

  postItem(item: any) {
    return this.postQuery(``, item);
  }

  updateQuery(query: string, item: any) {
    const url = `${EMPLOYEES}${query}`;
    const authToken = this.authService.getToken();

    return this.httpClient.put<any>(url, item, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken
      }
    }).toPromise();
  }

  updateItem(item: any) {
    return this.updateQuery(``, item);
  }

  deleteQuery(query: string, id: number) {
    const url = `${EMPLOYEES}${query}${id}`;
    const authToken = this.authService.getToken();

    return this.httpClient.delete<any>(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken
      }
    }).toPromise();
  }

  deleteItem(id: number) {
    return this.deleteQuery(``, id);
  }
}
