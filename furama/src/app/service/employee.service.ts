import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer";
import {Employee} from "../model/employee";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_URL + '/employeeList');
  }
  createEmployee(employee):Observable<void>{
    return this.http.post<void>(API_URL+ '/employeeList',employee);
  }

  updateEmployee(employee:Employee):Observable<void>{
    return this.http.patch<void>(API_URL+'/employeeList'+'/'+employee.id,employee);
  }

  findById(id: number) {
    return this.http.get<Customer>(API_URL+'/employeeList/'+id);
  }

  deleteEmployee(id: number) {
    return this.http.delete<void>(API_URL+'/employeeList'+'/'+id);
  }

  search(empSearch: Employee):Observable<Employee[]> {
    let API = API_URL+'/employeeList'+'?'
      +'&code_like='+empSearch.code
      +'&name_like='+empSearch.name
      +'&phone_like='+empSearch.phone
      +'&email_like='+empSearch.email
      +'&address_like='+empSearch.address
      +'&idCard_like='+empSearch.idCard
      +'&birthday_like='+empSearch.birthday
      +'&salary_like='+empSearch.salary ;

    if(empSearch.position.name != undefined){
      API += '&position.id='+empSearch.position.id;
    }
    if(empSearch.division.name != undefined){
      API+='&division.id='+empSearch.division.id;
    }
    if(empSearch.education.name != undefined){
      API+='&education.id='+empSearch.education.id;
    }
   return this.http.get<Employee[]>(API);
  }
}
