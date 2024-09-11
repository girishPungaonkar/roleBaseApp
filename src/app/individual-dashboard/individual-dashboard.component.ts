import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-individual-dashboard',
  templateUrl: './individual-dashboard.component.html',
  styleUrls: ['./individual-dashboard.component.css']
})
export class IndividualDashboardComponent implements OnInit {
  modules: { module_name: string }[] = [];  // Define 'modules' as an array of objects

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Fetch the modules from the API based on the role (you would pass the appropriate API or role data)
    this.apiService.getModulesForRole('Individual').subscribe(response => {
      this.modules = response.modules;
    });
  }
}
