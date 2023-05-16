import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Position} from "../model/position";
import {HttpClient} from "@angular/common/http";
import {RentType} from "../model/rent-type";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class RentTypeService {

  constructor(private http:HttpClient) { }
  getAll(): Observable<RentType[]> {
    return this.http.get<RentType[]>(API_URL + '/rentTypeList');
  }
}
