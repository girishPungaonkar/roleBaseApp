import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-corporate-dashboard',
  templateUrl: './corporate-dashboard.component.html',
  styleUrls: ['./corporate-dashboard.component.css']
})
export class CorporateDashboardComponent implements OnInit {
  modules: { module_name: string }[] = [];  // Define 'modules' as an array of objects

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Fetch the modules from the API based on the role
    this.apiService.getModulesForRole('Corporate').subscribe(response => {
      this.modules = response.modules;
    });
  }
}
