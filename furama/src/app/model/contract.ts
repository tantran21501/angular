import {Customer} from "./customer";
import {Employee} from "./employee";
import {Service} from "./service";

export class Contract {
  id:number;
  customer:Customer;
  employee:Employee;
  service:Service;
  startDate:string;
  endDate:string;
  deposit:number;
  total:number;
}
