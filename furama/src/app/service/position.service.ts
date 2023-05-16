import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Position} from "../model/position";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})

export class PositionService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<Position[]> {
    return this.http.get<Position[]>(API_URL + '/positionList');
  }
}
