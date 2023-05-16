import {Component, DoCheck, OnInit} from '@angular/core';
import {CustomerServiceService} from "../service/customer-service.service";
import {Customer} from "../model/customer";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerType} from "../model/customer-type";
import {CustomerTypeService} from "../service/customer-type.service";
import {Router} from "@angular/router";
import {addMonths, addYears, differenceInDays, differenceInMonths, differenceInYears} from 'date-fns';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerList: Customer[] = [];
  idCus: number;
  typeList: CustomerType[];
  p: number = 1;

  customerForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    code: new FormControl('', [Validators.required, Validators.pattern('KH-\\d{4}')]),
    type: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, this.validateName]),
    birthday: new FormControl('', [this.validateAge,Validators.required,Validators.pattern(/^(\d){4}-((0[1-9])|(1[0-2]))-((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))$/)]),
    idCard: new FormControl('',[Validators.required,Validators.pattern(/(\d){9,12}/)]),
    phone: new FormControl('',[Validators.required,Validators.pattern(/((090)|(091))(\d){7}$/)]),
    email: new FormControl('',[Validators.required,Validators.pattern(/^[a-z]+[a-zA-Z0-9]+@[a-zA-Z0-9]+(\\.[a-zA-Z0-9]+\\.*[a-zA-Z0-9])*/)]),
    address: new FormControl('',[Validators.required,this.validateName])
  });
  cusEditForm: FormGroup = new FormGroup(
    {
      id: new FormControl(''),
      code: new FormControl('', [Validators.required, Validators.pattern('KH-\\d{4}')]),
      type: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, this.validateName]),
      birthday: new FormControl('', [this.validateAge,Validators.required,Validators.pattern(/^(\d){4}-((0[1-9])|(1[0-2]))-((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))$/)]),
      idCard: new FormControl('',[Validators.required,Validators.pattern(/(\d){9,12}/)]),
      phone: new FormControl('',[Validators.required,Validators.pattern(/((090)|(091))(\d){7}$/)]),
      email: new FormControl('',[Validators.required,Validators.pattern(/^[a-z]+[a-zA-Z0-9]+@[a-zA-Z0-9]+(\\.[a-zA-Z0-9]+\\.*[a-zA-Z0-9])*/)]),
      address: new FormControl('',[Validators.required,this.validateName])
    }
  );

  cusSearchForm: FormGroup = new FormGroup(
    {
      code: new FormControl(''),
      type: new FormControl(),
      name: new FormControl(''),
      birthday: new FormControl(''),
      idCard: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl('')
    }
  );
  customerSearch: Customer;

  constructor(
    private customerService: CustomerServiceService,
    private typeService: CustomerTypeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    // this.getAll();
    this.typeService.getAll().subscribe(typies => {
      this.typeList = typies;
    });
    this.customerService.getAll().subscribe(customers => {
      this.customerList = customers;
    });

  }

  createCustomer() {
    let customer = this.customerForm.value;
    this.customerService.createCustomer(customer).subscribe(next => {
        this.router.navigateByUrl("/employee").then(e => {
          if (e) {
            this.router.navigateByUrl("/customer")
          }
          // else {
          //   alert("Navigation has failed!");
          // }
        })
      }
    );

  }

  trackId(id: any) {
    this.idCus = Number(id);
    this.bindingEdit();
  }

  deleteCustomer() {
    this.customerService.deleteCustomer(this.idCus).subscribe(
      next => {
        this.router.navigateByUrl("/employee").then(e => {
          if (e) {
            this.router.navigateByUrl("/customer")
          }
        });
      });
    this.idCus = 0;

  }

  customer: Customer;

  bindingEdit() {
    for (let i = 0; i < this.customerList.length; i++) {
      if (this.idCus === this.customerList[i].id) {
        this.customer = this.customerList[i];
      }
    }
    this.cusEditForm.setValue(this.customer);

  }


  updateCustomer() {
    let cusEdit = this.cusEditForm.value;
    cusEdit.id = this.idCus;
    this.customerService.updateCustomer(cusEdit).subscribe(
      next => {
        this.router.navigateByUrl("/employee").then(e => {
          if (e) {
            this.router.navigateByUrl("/customer")
          }
        });
      });
  }

  search() {
    this.customerSearch = this.cusSearchForm.value;
    this.customerService.search(this.customerSearch).subscribe(customers => {
        this.customerList = customers;
      }
    );
    this.cusSearchForm.reset();
  }

  compareCustomerType(c1: CustomerType, c2: CustomerType): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }


  get id() {
    return this.customerForm.get('id');
  }

  get idEdit() {
    return this.cusEditForm.get('id');
  }

  get code() {
    return this.customerForm.get('code');
  }

  get codeEdit() {
    return this.cusEditForm.get('code');
  }

  get type() {
    return this.customerForm.get('type');
  }

  get typeEdit() {
    return this.cusEditForm.get('type');
  }

  get name() {
    return this.customerForm.get('name');
  }

  get nameEdit() {
    return this.cusEditForm.get('name');
  }

  get birthday() {
    return this.customerForm.get('birthday');
  }

  get birthdayEdit() {
    return this.cusEditForm.get('birthday');
  }

  get idCard() {
    return this.customerForm.get('idCard');
  }

  get idCardEdit() {
    return this.cusEditForm.get('idCard');
  }

  get phone() {
    return this.customerForm.get('phone');
  }

  get phoneEdit() {
    return this.cusEditForm.get('phone');
  }

  get email() {
    return this.customerForm.get('email');
  }

  get emailEdit() {
    return this.cusEditForm.get('email');
  }

  get address() {
    return this.customerForm.get('address');
  }

  get addressEdit() {
    return this.cusEditForm.get('address');
  }


  validateName(name: AbstractControl) {
    return isValidUnicodeFullName(name.value) ? null : {errorName: true};
  }

  validateAge(age: AbstractControl) {
    return isValidAge(age.value) ? null : {errorAge: true};
  }
  numberCheck:boolean=false;
  check() {
    this.numberCheck =!this.numberCheck;

  }
  arrayDelAll : number[] = [];
  getAllId() {
    this.arrayDelAll=[];
    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

    for (let i = 0; i < checkboxes.length; i++) {
      // this.arrayDelAll.push(checkboxes[i].value);
    }
  }

  clearArrayDel() {
    this.arrayDelAll = [];
  }

  delAllCustomer() {
    for(let i=0;i<this.arrayDelAll.length;i++){
      this.customerService.deleteCustomer(this.arrayDelAll[i]).subscribe();
    }
    this.router.navigateByUrl("/employee").then(e => {
      if (e) {
        this.router.navigateByUrl("/customer")
      }
    });
  }
}

function removeAscent(str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}

function isValidWord(word) {
  // const re = /[_\W]0-9/;
  return /^[a-zA-Z]+$/.test(removeAscent(word));
}

function isValidUnicodeFullName(fullName) {
  let arrName = fullName.split(' ');
  for (let i = 0; i < arrName.length; i++) {
    if (!isValidWord(arrName[i])) {
      return false;
    }
  }
  return true;
}

// function validateUpperCase(name) {
//   let arrName = name.split('');
//   for(let i=1; i<arrName.length;i++){
//     if(arrName[i].match(/[A-Z]/)){
//       return false;
//     }
//   }
//   return true;
// }

function isValidAge(dateOfBirth) {
  let diff = getDiffToNow(dateOfBirth);
  let array = diff.split(' ');
  let age = Number(array[0]);
  if(age<18||age>100){
    return false;
  }
  return true;
}
function getDiffToNow(diff: string | number | Date): string {
  const result: string[] = [];
  const now = new Date();
  diff = new Date(diff);
  const years = differenceInYears(now, diff);
  if (years > 0) {
    result.push(`${years} years`);
    diff = addYears(diff, years);
  }

  const months = differenceInMonths(now, diff);
  result.push(`${months} months`);
  if (months > 0) {
    diff = addMonths(diff, months);

  }

  const days = differenceInDays(now, diff);
  if (days > 0) {
    result.push(`${days} days`);
  }

  return result.join(' ');
}

