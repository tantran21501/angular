import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Position} from "../model/position";
import {environment} from "../../environments/environment";
import {Division} from "../model/division";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Division[]> {
    return this.http.get<Division[]>(API_URL + '/divisionList');
  }
}
