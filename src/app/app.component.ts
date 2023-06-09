import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Company {
  productId: string;
  list: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  companies: Company[] = [];
  filteredCompanies: Company[] = [];
  selectedCompany: string = '';
  searchText: string = '';
  showDropdown: boolean = false;
  noResultsFound: boolean = false;
  dropdownSearchText: string = '';
  filteredList: Company[] = [];
  showIcon: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCompanies();
  }

  togglebtn() {
    this.showIcon = !this.showIcon;
    this.showDropdown = !this.showDropdown;
  }

  fetchCompanies() {
    this.http.get<any>('assets/data.json').subscribe((data) => {
      this.companies = data.companies;
      this.filteredCompanies = this.companies.slice();
      this.checkNoResults();
    });
  }

  companyList() {
    this.http.get<any>('assets/companies.json').subscribe((data) => {
      this.companies.push(data.companies);
      this.filteredCompanies = this.companies.slice();
      this.checkNoResults();
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  createCompany(company: Company) {
    // Simulate creating a company with mock API
    this.http.post<any>('mock-api/companies', company).subscribe((data) => {
      // Update the companies array with the created company
      this.companies.push(data);
      this.filteredCompanies.push(data);
    });
  }

  updateCompanyapi(company: Company) {
    // Simulate updating a company with mock API
    this.http
      .put<any>('mock-api/companies/' + company.productId, company)
      .subscribe((data) => {
        // Find the index of the updated company in the companies array
        const index = this.companies.findIndex(
          (c) => c.productId === company.productId
        );
        if (index !== -1) {
          // Update the company in both the companies and filteredCompanies arrays
          this.companies[index] = data;
          this.filteredCompanies[index] = data;
        }
      });
  }

  filterCompanies() {
    if (!this.searchText) {
      this.filteredCompanies = this.companies.slice();
    } else {
      const searchValue = this.searchText.toLowerCase();
      this.filteredCompanies = this.companies.filter((company) =>
        company.list.toLowerCase().includes(searchValue)
      );
    }
    this.checkNoResults();
  }

  filterDropdownItems() {
    if (!this.dropdownSearchText) {
      this.filteredList = this.filteredCompanies.slice();
    } else {
      const searchValue = this.dropdownSearchText.toLowerCase();
      this.filteredList = this.filteredCompanies.filter((company) =>
        company.list.toLowerCase().includes(searchValue)
      );
    }
  }

  checkNoResults() {
    this.noResultsFound = this.filteredCompanies.length === 0;
    if (this.noResultsFound) {
      this.companyList();
    }
  }

  updateCompany(company: Company) {
    // Find the index of the updated company in the original companies array
    const index = this.companies.findIndex(
      (c) => c.productId === company.productId
    );
    if (index !== -1) {
      // Update the list value of the company
      this.companies[index].list = company.list;
    }
  }
}
