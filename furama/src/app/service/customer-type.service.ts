import { Injectable } from '@angular/core';
import {CustomerType} from "../model/customer-type";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<CustomerType[]> {
    return this.http.get<CustomerType[]>(API_URL + '/typeList');
  }

}
