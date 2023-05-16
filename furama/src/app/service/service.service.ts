import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer";
import {Service} from "../model/service";
import {Employee} from "../model/employee";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Service[]> {
    return this.http.get<Service[]>(API_URL + '/serviceList');
  }
  createService(service):Observable<void>{
    return this.http.post<void>(API_URL+ '/serviceList',service);
  }

  updateService(service:Service):Observable<void>{
    return this.http.patch<void>(API_URL+'/serviceList'+'/'+service.id,service);
  }

  findById(id: number) {
    return this.http.get<Service>(API_URL+'/serviceList/'+id);
  }

  deleteService(id: number) {
    return this.http.delete<void>(API_URL+'/serviceList'+'/'+id);
  }

  search(serviceSearch: Service): Observable<Service[]> {
    let API = API_URL+'/serviceList'+'?'
      +'&code_like='+serviceSearch.code
      +'&name_like='+serviceSearch.name
      +'&area_like='+serviceSearch.area
      +'&numberFloor_like='+serviceSearch.numberFloor
      +'&maxPeople_like='+serviceSearch.maxPeople
      +'&cost_like='+serviceSearch.cost
      +'&status_like='+serviceSearch.status
    if(serviceSearch.rentType.name != undefined){
      API+='&rentType.id='+serviceSearch.rentType.id;
    }
    return this.http.get<Service[]>(API);
  }
}
