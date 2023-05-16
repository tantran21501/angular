import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contract} from "../model/contract";
import {ContractDetail} from "../model/contract-detail";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ContractDetailService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<ContractDetail[]> {
    return this.http.get<ContractDetail[]>(API_URL + '/contractDetailList');
  }
  createContractDetail(contractDetail):Observable<void>{
    return this.http.post<void>(API_URL+ '/contractDetailList',contractDetail);
  }
}
