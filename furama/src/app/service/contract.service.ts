import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer";
import {Contract} from "../model/contract";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Contract[]> {
    return this.http.get<Contract[]>(API_URL + '/contractList');
  }
  createContract(contract):Observable<void>{
    return this.http.post<void>(API_URL+ '/contractList',contract);
  }
  findById(id:number):Observable<Contract> {
    return this.http.get<Contract>(API_URL+'/contractList/'+id);
  }
  updateContract(contract:Contract):Observable<void>{
    return this.http.patch<void>(API_URL+'/contractList/'+contract.id,contract);
  }
}
