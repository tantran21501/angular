import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Division} from "../model/division";
import {Education} from "../model/education";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Education[]> {
    return this.http.get<Education[]>(API_URL + '/educationList');
  }
}
