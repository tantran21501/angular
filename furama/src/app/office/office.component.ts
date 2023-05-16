import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RentType} from "../model/rent-type";
import {ServiceService} from "../service/service.service";
import {RentTypeService} from "../service/rent-type.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Service} from "../model/service";
import {Education} from "../model/education";

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {
  serviceList: Service[] = [];
  rentTypeList: RentType[] = [];
  p: number=1;
  idService: number;
  ser:Service;
  constructor(
    private service: ServiceService,
    private rentTypeService: RentTypeService,
    private router: Router
  ) {
  }


  ngOnInit(): void {
    this.service.getAll().subscribe(servList => {
      this.serviceList = servList;
    });
    this.rentTypeService.getAll().subscribe(rentList => {
      this.rentTypeList = rentList;
    });
  }
  serviceForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    name: new FormControl(''),
    area: new FormControl(''),
    numberFloor: new FormControl(''),
    maxPeople: new FormControl(''),
    cost: new FormControl(''),
    rentType: new FormControl(''),
    status: new FormControl('')
  });



  serviceEditForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    name: new FormControl(''),
    area: new FormControl(''),
    numberFloor: new FormControl(''),
    maxPeople: new FormControl(''),
    cost: new FormControl(''),
    rentType: new FormControl(''),
    status: new FormControl('')
  });

  serviceSearchForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    name: new FormControl(''),
    area: new FormControl(''),
    numberFloor: new FormControl(''),
    maxPeople: new FormControl(''),
    cost: new FormControl(''),
    rentType: new FormControl(''),
    status: new FormControl('')
  });
  compareRentType(c1: RentType, c2: RentType): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }



  createService() {
    let service = this.serviceForm.value;
    this.service.createService(service).subscribe(
      next => {
        this.router.navigateByUrl('customer').then(r => {
            if (r) {
              this.router.navigateByUrl("/service")
            }
          }
        );
      }
    );
    this.serviceForm.reset();
  }

  trackId(id: any) {
    this.idService = Number(id);
    this.bindingEdit();
  }

  deleteService() {
    this.service.deleteService(this.idService).subscribe(
      next => {
        this.router.navigateByUrl('customer').then(r => {
            if (r) {
              this.router.navigateByUrl("/service")
            }
          }
        );
      }
    );
    this.idService = 0;
  }

  bindingEdit() {
    for(let i=0;i<this.serviceList.length;i++){
      if(this.serviceList[i].id===this.idService){
        this.ser= this.serviceList[i];
      }
    }
    this.serviceEditForm.setValue(this.ser);
  }


  updateService() {
    let serEdit = this.serviceEditForm.value;
    serEdit.id = this.idService;
    this.service.updateService(serEdit).subscribe(
      next => {
        this.router.navigateByUrl('customer').then(r => {
            if (r) {
              this.router.navigateByUrl("/service")
            }
          }
        );
      });
    this.idService = 0;
    this.serviceEditForm.reset();
  }
  serviceSearch:Service;
  search() {
    this.serviceSearch = this.serviceSearchForm.value;
    this.service.search(this.serviceSearch).subscribe( services=>{
        this.serviceList= services ;
      }
    );
  }
}
