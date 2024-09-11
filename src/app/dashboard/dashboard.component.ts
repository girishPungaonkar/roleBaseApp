import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menuItems: any[] = [];
  showIndividualDashboard: boolean = true;
  showCorporateDashboard: boolean = false;
  selectedMenu: string = '';
  formData: any = {
    name: '',
    mobileNumber: '',
    emailId: '',
    birthDate: '',
    addressLine1: '',
    addressLine2: '',
    district: '',
    city: '',
    state: '',
    pincode: '',
    panNumber: '',
    vehicleNumber: '',
    companyNumber: '',
    companyTin: '',
    companyType: '',
    contactPersonName: '',
    contactPersonMobile: '',
    contactPersonEmail: '',
    designation: '',
    corporateDetail1: '',
    corporateDetail2: ''
  };
basicDetailsForm: any;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    const role = localStorage.getItem('role') || 'Individual';

    this.apiService.getDashboardData().subscribe(response => {
      const roleData = response[role as keyof typeof response];

      if (roleData) {
        this.menuItems = roleData.modules;
        if (role === 'Individual') {
          this.showIndividualDashboard = true;
          this.showCorporateDashboard = false;
        } else if (role === 'Corporate') {
          this.showIndividualDashboard = false;
          this.showCorporateDashboard = true;
        }

        // Set the first menu item as active after loading the dashboard data
        if (this.menuItems.length > 0) {
          this.selectedMenu = this.menuItems[0].module_name;  // Select first item
        }
      } else {
        alert('Role data not found');
        this.router.navigate(['/login']);
      }
    });

    this.showIndividualDashboard = role === 'Individual';
    this.showCorporateDashboard = role === 'Corporate';
  }

  toggleDashboard(role: string): void {
    localStorage.setItem('role', role);

    if (role === 'Individual') {
      this.showIndividualDashboard = true;
      this.showCorporateDashboard = false;
    } else if (role === 'Corporate') {
      this.showIndividualDashboard = false;
      this.showCorporateDashboard = true;
    }

    // Reload dashboard data and set the first menu item as active
    this.loadDashboardData();

    // Set first menu item as active on toggle
    if (this.menuItems.length > 0) {
      this.selectedMenu = this.menuItems[0].module_name;
    }
  }

  selectMenu(menuName: string): void {
    this.selectedMenu = menuName;
  }

  save(menuName: string, form: NgForm): void {
    if (form.invalid) {
      Object.values(form.controls).forEach(control => control.markAsTouched());
      return; // Don't proceed if the form is invalid
    }
  }

  submit(): void {
    if (this.isSubmitEnabled()) {
    }
  }

    // Function to check if form data for a module is valid
    isFormValid(moduleName: string): boolean {
      switch (moduleName) {
        case 'Basic Details':
          return (
            this.formData.name &&
            this.formData.mobileNumber.match(/^\d{10}$/) &&
            this.formData.emailId &&
            this.formData.birthDate
          );
        case 'Address Details':
          return (
            this.formData.addressLine1 &&
            this.formData.city &&
            this.formData.state &&
            this.formData.pincode.match(/^\d{6}$/)
          );
        case 'Personal Details':
          return (
            this.formData.panNumber.match(/^[A-Z]{5}\d{4}[A-Z]{1}$/) &&
            this.formData.vehicleNumber.match(/^[A-Z]{2}\d{2}[A-Z]{2}\d{1,4}$/)
          );
        case 'Company Details':
          return (
            this.formData.companyNumber &&
            this.formData.companyTin.match(/^[A-Z0-9]{14}$/) &&
            this.formData.companyType
          );
        case 'Contact Person Details':
          return (
            this.formData.contactPersonName &&
            this.formData.contactPersonMobile.match(/^\d{10}$/) &&
            this.formData.contactPersonEmail
          );
        case 'Corporate Details':
          return (
            this.formData.corporateDetail1 &&
            this.formData.corporateDetail2
          );
        default:
          return false;
      }
    }
  

  isSubmitEnabled(): boolean {
    const requiredFieldsForIndividual = [
      'name', 'mobileNumber', 'emailId', 'birthDate',
      'addressLine1', 'district', 'city', 'state', 'pincode',
      'panNumber', 'vehicleNumber'
    ];

    const requiredFieldsForCorporate = [
      'companyNumber', 'companyTin', 'companyType',
      'contactPersonName', 'contactPersonMobile', 'contactPersonEmail', 'designation',
      'corporateDetail1', 'corporateDetail2'
    ];

    let requiredFields: string[] = [];  
    
    if (this.showIndividualDashboard) {
      requiredFields = requiredFieldsForIndividual;
    } else if (this.showCorporateDashboard) {
      requiredFields = requiredFieldsForCorporate;
    }

    return requiredFields.every(field => this.formData[field] && this.formData[field].trim() !== '');
  }

  logout(): void {
    localStorage.removeItem('role');
    localStorage.removeItem('modules');
    this.router.navigate(['/login']);
  }

  getIcon(moduleName: string): string {
    switch (moduleName) {
      case 'Basic Details':
        return 'fas fa-info-circle';
      case 'Address Details':
        return 'fas fa-map-marker-alt';
      case 'Personal Details':
        return 'fas fa-id-card';
      case 'Company Details':
        return 'fas fa-industry';
      case 'Contact Person Details':
        return 'fas fa-user-tie';
      case 'Corporate Details':
        return 'fas fa-briefcase';
      default:
        return 'fas fa-file-alt';
    }
  }
}
