import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AttachService} from "../model/attach-service";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AttachServiceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<AttachService[]> {
    return this.http.get<AttachService[]>(API_URL + '/attachServiceList');
  }
}
