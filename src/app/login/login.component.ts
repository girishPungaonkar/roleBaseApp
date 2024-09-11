import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginId: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.apiService.getUsers().subscribe(users => {
      const user = users.find(u => u.login_id === this.loginId && u.password === this.password);
      if (user) {
        
        this.apiService.getDashboardData().subscribe(response => {

          // Save the entire response to localStorage
          localStorage.setItem('modules', JSON.stringify(response));
          
          // Redirect to dashboard
          this.router.navigate(['/dashboard']);
        }, error => {
          console.error('Error fetching dashboard data', error);
          alert('Failed to load dashboard data');
        });
      } else {
        alert('Invalid credentials');
      }
    }, error => {
      console.error('Error fetching users', error);
      alert('Failed to validate user');
    });
  }
}
