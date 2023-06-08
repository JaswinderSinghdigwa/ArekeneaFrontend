import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  private actRoute!: ActivatedRoute
    Employee:any = [];
    constructor(private apiService: ApiServiceService) { 
      this.readEmployee();
    }
    ngOnInit() {}
    readEmployee(){
      this.apiService.getEmployees().subscribe((data) => {
       this.Employee = data;
      })    
    }
    removeEmployee(employee : any, index : number) {
      if(window.confirm('Are you sure?')) {
          this.apiService.deleteEmployee(employee._id).subscribe((data) => {
            this.Employee.splice(index, 1);
          }
        )    
      }
    }
  }
