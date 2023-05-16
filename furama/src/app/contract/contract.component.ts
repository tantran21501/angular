import {Component, OnInit} from '@angular/core';
import {Customer} from "../model/customer";
import {CustomerType} from "../model/customer-type";
import {Contract} from "../model/contract";
import {Employee} from "../model/employee";
import {Service} from "../model/service";
import {CustomerServiceService} from "../service/customer-service.service";
import {EmployeeService} from "../service/employee.service";
import {ServiceService} from "../service/service.service";
import {ContractService} from "../service/contract.service";
import {AbstractControl, FormControl, FormGroup, RequiredValidator, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {addMonths, addYears, differenceInDays, differenceInMonths, differenceInYears} from "date-fns";


@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  contractList: Contract[] = [];
  customerList: Customer[];
  employeeList: Employee[];
  serviceList: Service[];
  p: number = 1;

  constructor(
    private customerService: CustomerServiceService,
    private employeeService: EmployeeService,
    private service: ServiceService,
    private contractService: ContractService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.customerService.getAll().subscribe(customers => {
      this.customerList = customers;
    });
    this.employeeService.getAll().subscribe(employees => {
      this.employeeList = employees;
    });
    this.service.getAll().subscribe(services => {
      this.serviceList = services;
    });
    this.contractService.getAll().subscribe(contracts => {
      this.contractList = contracts;
    });

  }

  contractForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    customer: new FormControl('',[Validators.required]),
    employee: new FormControl('',[Validators.required]),
    service: new FormControl('',[Validators.required]),
    startDate: new FormControl('',[this.validateFutureDate,Validators.required,
      Validators.pattern(/^(\d){4}-((0[1-9])|(1[0-2]))-((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))$/)]),
    endDate: new FormControl('',[Validators.required,Validators.pattern(/^(\d){4}-((0[1-9])|(1[0-2]))-((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))$/)]),
    deposit: new FormControl('',[Validators.required,Validators.pattern(/[0-9]+$/),this.validateNumber]),
    total: new FormControl('',[Validators.required,Validators.pattern(/[0-9]+$/),this.validateNumber]),
  },this.validStartEnd);
  contract:Contract;
  createContract() {
    this.contract = this.contractForm.value;
    this.contract.total = this.getTotal(this.contract.service.id);
    this.contractService.createContract(this.contract).subscribe(next => {
        this.router.navigateByUrl("/employee").then(e => {
          if (e) {
            this.router.navigateByUrl("/contract")
          }
          // else {
          //   alert("Navigation has failed!");
          // }
        })
      }
    );
  }
  getTotal(idService) {
    let number =0;
    for(let i=0;i<this.serviceList.length;i++){
      if(this.serviceList[i].id===idService){
        number = this.serviceList[i].cost;
        break;
      }
    }
  return number;
  }
    validateNumber(number:AbstractControl){
    return (number.value>0)?null : {errorNumber:true};
  }


  validateFutureDate(contract:AbstractControl){
    return isValidFuture(contract.value)? null: {errFuture:true};
  }

  validStartEnd(contract:AbstractControl){
    console.log(isValidStartEnd(contract.value.startDate,contract.value.endDate))
    return isValidStartEnd(contract.value.startDate,contract.value.endDate)?null :{errStartEnd:true};
  }


  get customer(){
    return this.contractForm.get('customer');
  }
  get employee(){
    return this.contractForm.get('employee');
  }
  get services(){
    return this.contractForm.get('service');
  }
  get startDate(){
    return this.contractForm.get('startDate');
  }
  get endDate(){
    return this.contractForm.get('endDate');
  }
  get deposit(){
    return this.contractForm.get('deposit');
  }
  get total(){
    return this.contractForm.get('total');
  }

}
function isValidFuture(date){
  let newDate = new Date(date);
  let now = new Date();
  if(newDate<now){
    return false;
  }
  return true;
}
function isValidStartEnd(startDate, endDate) {
  let start = new Date(startDate);
  let end = new Date(endDate);
  console.log(start);
  console.log(end);
  if(end<start){
    return false;
  }
  return true;
}

