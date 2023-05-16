import {Component, OnInit} from '@angular/core';
import {Employee} from "../model/employee";
import {EmployeeService} from "../service/employee.service";
import {DivisionService} from "../service/division.service";
import {PositionService} from "../service/position.service";
import {EducationService} from "../service/education.service";
import {Position} from "../model/position";
import {Education} from "../model/education";
import {Division} from "../model/division";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {addMonths, addYears, differenceInDays, differenceInMonths, differenceInYears} from "date-fns";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeList: Employee[] = [];
  positionList: Position[] = [];
  educationList: Education[] = [];
  divisionList: Division[] = [];
  idEmp: number;
  employee:Employee;
  p: number=1;
  constructor(
    private employeeService: EmployeeService,
    private divisionService: DivisionService,
    private positionService: PositionService,
    private educationService: EducationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe(empList => {
      this.employeeList = empList;
    });

    this.divisionService.getAll().subscribe(divList => {
      this.divisionList = divList;
    });
    this.positionService.getAll().subscribe(posList => {
      this.positionList = posList;
    });
    this.educationService.getAll().subscribe(eduList => {
      this.educationList = eduList;
    });
  }

  employeeForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    code: new FormControl('',[Validators.required, Validators.pattern('NV-\\d{4}')]),
    name: new FormControl('',[Validators.required, this.validateName]),
    birthday: new FormControl('',[this.validateAge,Validators.required,Validators.pattern(/^(\d){4}-((0[1-9])|(1[0-2]))-((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))$/)]),
    salary: new FormControl('',[Validators.required,Validators.pattern(/[0-9]+$/),validateNumber]),
    phone: new FormControl('',[Validators.required,Validators.pattern(/((090)|(091))(\d){7}$/)]),
    idCard: new FormControl('',[Validators.required,Validators.pattern(/(\d){9,12}/)]),
    email: new FormControl('',[Validators.required,Validators.pattern(/^[a-z]+[a-zA-Z0-9]+@[a-zA-Z0-9]+(\\.[a-zA-Z0-9]+\\.*[a-zA-Z0-9])*/)]),
    address: new FormControl('',[Validators.required,this.validateName]),
    position: new FormControl('',[Validators.required]),
    division: new FormControl('',[Validators.required]),
    education: new FormControl('',[Validators.required])
  });
  empEditForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    code: new FormControl('',[Validators.required, Validators.pattern('NV-\\d{4}')]),
    name: new FormControl('',[Validators.required, this.validateName]),
    birthday: new FormControl('',[this.validateAge,Validators.required,Validators.pattern(/^(\d){4}-((0[1-9])|(1[0-2]))-((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))$/)]),
    salary: new FormControl('',[Validators.required,Validators.pattern(/[0-9]+$/),validateNumber]),
    phone: new FormControl('',[Validators.required,Validators.pattern(/((090)|(091))(\d){7}$/)]),
    idCard: new FormControl('',[Validators.required,Validators.pattern(/(\d){9,12}/)]),
    email: new FormControl('',[Validators.required,Validators.pattern(/^[a-z]+[a-zA-Z0-9]+@[a-zA-Z0-9]+(\\.[a-zA-Z0-9]+\\.*[a-zA-Z0-9])*/)]),
    address: new FormControl('',[Validators.required,this.validateName]),
    position: new FormControl('',[Validators.required]),
    division: new FormControl('',[Validators.required]),
    education: new FormControl('',[Validators.required])
  });
  empSearchForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    name: new FormControl(''),
    birthday: new FormControl(''),
    salary: new FormControl(''),
    phone: new FormControl(''),
    idCard: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    position: new FormControl(''),
    division: new FormControl(''),
    education: new FormControl('')
  });

  comparePosition(c1: Position, c2: Position): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  compareDivision(c1: Division, c2: Division): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  compareEducation(c1: Education, c2: Education): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  createEmployee() {
    let employee = this.employeeForm.value;
    this.employeeService.createEmployee(employee).subscribe(
      next => {
        this.router.navigateByUrl('customer').then(r => {
            if (r) {
              this.router.navigateByUrl("/employee")
            }
          }
        );
      }
    );
    this.employeeForm.reset();
  }

  trackId(id: any) {
    this.idEmp = Number(id);
    this.bindingEdit();
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.idEmp).subscribe(
      next => {
        this.router.navigateByUrl('customer').then(r => {
            if (r) {
              this.router.navigateByUrl("/employee")
            }
          }
        );
      }
    );
    this.idEmp = 0;
  }

  bindingEdit() {
    for(let i=0;i<this.employeeList.length;i++){
      if(this.employeeList[i].id===this.idEmp){
        this.employee= this.employeeList[i];
      }
    }
    this.empEditForm.setValue(this.employee);
  }


  updateEmployee() {
    let empEdit = this.empEditForm.value;
    empEdit.id = this.idEmp;
    this.employeeService.updateEmployee(empEdit).subscribe(
      next => {
        this.router.navigateByUrl('customer').then(r => {
            if (r) {
              this.router.navigateByUrl("/employee")
            }
          }
        );
      });
    this.idEmp = 0;
    this.empEditForm.reset();
  }
  empSearch: Employee;
  search() {
    this.empSearch = this.empSearchForm.value;
    this.employeeService.search(this.empSearch).subscribe( employees=>{
        this.employeeList= employees ;
      }
    );
    // this.empSearchForm.reset();
  }

  get id() {
    return this.employeeForm.get('id');
  }
  get idEdit() {
    return this.empEditForm.get('id');
  }
  get code() {
    return this.employeeForm.get('code');
  }

  get codeEdit() {
    return this.empEditForm.get('code');
  }
  get name(){
    return this.employeeForm.get('name');
  }
  get nameEdit(){
    return this.empEditForm.get('name');
  }
  get birthday(){
    return this.employeeForm.get('birthday');
  }
  get birthdayEdit(){
    return this.empEditForm.get('birthday');
  }
  get salary(){
    return this.employeeForm.get('salary');
  }
  get salaryEdit(){
    return this.empEditForm.get('salary');
  }
  get phone(){
    return this.employeeForm.get('phone');
  }
  get phoneEdit(){
    return this.empEditForm.get('phone');
  }
  get idCard(){
    return this.employeeForm.get('idCard');
  }
  get idCardEdit(){
    return this.empEditForm.get('idCard');
  }
  get email(){
    return this.employeeForm.get('email');
  }
  get emailEdit(){
    return this.empEditForm.get('email');
  }
  get address(){
    return this.employeeForm.get('address');
  }
  get addressEdit(){
    return this.empEditForm.get('address');
  }
  get position(){
    return this.employeeForm.get('position');
  }
  get positionEdit(){
    return this.empEditForm.get('position');
  }
  get education(){
    return this.employeeForm.get('education');
  }
  get educationEdit(){
    return this.empEditForm.get('education');
  }
  get division(){
    return this.employeeForm.get('division');
  }
  get divisionEdit(){
    return this.empEditForm.get('division');
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

  delAllEmployee() {
    for(let i=0;i<this.arrayDelAll.length;i++){
      this.employeeService.deleteEmployee(this.arrayDelAll[i]).subscribe();
    }
    this.router.navigateByUrl("/customer").then(e => {
      if (e) {
        this.router.navigateByUrl("/employee")
      }
    });
  }
}

function  validateNumber(number:AbstractControl){
  return (number.value>0)?null : {errorNumber:true};
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
