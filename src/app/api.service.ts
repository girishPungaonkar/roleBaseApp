import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private usersUrl = 'http://localhost:3000/users'; // Path to your JSON file
  private dashboardUrl = 'http://localhost:3000/response'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  getDashboardData(): Observable<any> {
    return this.http.get<any>(this.dashboardUrl);
  }
}
