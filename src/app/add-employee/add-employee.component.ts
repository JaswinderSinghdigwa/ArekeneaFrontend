import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  submitted = false;
  selectedFile!: File;
  employeeForm!: FormGroup;
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiServiceService
  ) {
    this.mainForm();
  }

  ngOnInit() {}

  mainForm() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      image: ['',[Validators.required]],
      password:['',[Validators.required]],
      phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  // Getter to access form control
  get myForm() {
    return this.employeeForm.controls;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    this.submitted = true;
    if (!this.employeeForm.valid) {
      return false;
    } else {
      const formData = new FormData();
      formData.append('name', this.employeeForm?.value.name);
      formData.append('email', this.employeeForm?.value.email);
      formData.append('password', this.employeeForm?.value.password);
      formData.append('phoneNo', this.employeeForm?.value.phoneNo);
      formData.append('image', this.selectedFile)
      return this.apiService.createEmployee(formData).subscribe({
        complete: () => {
          console.log('Employee successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        },
        error: (e:any) => {
          console.log(e);
        },
      });
    }
  }
}
