import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {
  submitted = false;
  selectedFile!:File
  editForm!: FormGroup;
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiServiceService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.updateEmployee();
    let id :any = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployee(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required]],
      image:['',[Validators.required]],
      phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getEmployee(id:number) {
    this.apiService.getEmployee(id).subscribe((data) => {
      console.log("data",data)
      this.editForm.setValue({
        name: data.name,
        email: data.email,
        image:data.image,
        password:data.password,
        phoneNo: data.phoneNo,
      });
    });
  }

  updateEmployee() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required]],
      image:['',[Validators.required]],
      phoneN: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  onSubmit() :any{
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id:any = this.actRoute.snapshot.paramMap.get('id');
        const formData = new FormData();
      formData.append('name', this.editForm?.value.name);
      formData.append('email', this.editForm?.value.email);
      formData.append('password', this.editForm?.value.password);
      formData.append('phoneNo', this.editForm?.value.phoneNo);
      formData.append('image', this.selectedFile)
       return this.apiService.updateEmployee(id, this.editForm?.value).subscribe({
          complete: () => {
            return this.router.navigateByUrl('/employees-list');
            console.log('Content updated successfully!');
          },
          error: (e:any) => {
            return e
          },
        });
      }
    }
  }
}
