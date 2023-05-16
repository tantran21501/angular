import { Component, OnInit } from '@angular/core';
import {Contract} from "../model/contract";
import {ContractService} from "../service/contract.service";
import {Router} from "@angular/router";
import {ContractDetail} from "../model/contract-detail";
import {AttachServiceService} from "../service/attach-service.service";
import {ContractDetailService} from "../service/contract-detail.service";
import {AttachService} from "../model/attach-service";
import {Customer} from "../model/customer";
import {CustomerServiceService} from "../service/customer-service.service";

@Component({
  selector: 'app-customer-using',
  templateUrl: './customer-using.component.html',
  styleUrls: ['./customer-using.component.css']
})
export class CustomerUsingComponent implements OnInit {
 contractList:Contract[] =[];
 contractDetailList:ContractDetail[]=[];
 customerList:Customer[] =[];
 attachDetailList : ContractDetail[]=[];
 p:number=1;
 idContract:number=0;
  constructor(
    private contractService: ContractService,
    private router: Router,
    private contractDetailService: ContractDetailService,
    private customerService:CustomerServiceService

  ) { }

  ngOnInit(): void {
    this.contractService.getAll().subscribe(contracts => {
      this.contractList = contracts;
    });
    this.contractDetailService.getAll().subscribe(contractDetails => {
      this.contractDetailList = contractDetails;
    });
    this.customerService.getAll().subscribe( customers =>{
      this.customerList=customers;
      });
  }

  trackId(id: string) {
    this.idContract = Number(id);
    this.detail();
  }

  private detail() {
    this.attachDetailList=[];
    for(let i=0;i<this.contractDetailList.length;i++){
      if(this.contractDetailList[i].contract.id===this.idContract){
       this.attachDetailList.push(this.contractDetailList[i]);
      }
    }
}

  clear() {
      this.attachDetailList=[];
  }
}
