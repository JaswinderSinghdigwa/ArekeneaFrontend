import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseUri: string = 'http://localhost:3000';
  // headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}
  // Create
  createEmployee(data:any): Observable<any> {
    let url = `${this.baseUri}/addUser`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }
  // Get all employees
  getEmployees() {
    return this.http.get(`${this.baseUri}/listOfUser`);
  }
  // Get employee
  getEmployee(id:number): Observable<any> {
    let url = `${this.baseUri}/User/${id}`;
    return this.http.get(url)
  }
  // Update employee
  updateEmployee(id:number, data:any): Observable<any> {
    let url = `${this.baseUri}/updateUser/${id}`;
    return this.http.put(url, data).pipe(catchError(this.errorMgmt));
  }
  // Delete employee
  deleteEmployee(id:number): Observable<any> {
    let url = `${this.baseUri}/deleteUser/${id}`;
    return this.http.delete(url).pipe(catchError(this.errorMgmt));
  }
  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
