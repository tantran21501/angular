import {Position} from "./position";
import {Education} from "./education";
import {Division} from "./division";

export class Employee {
  id:number;
  code:string;
  name:string;
  position:Position;
  education: Education;
  division: Division;
  birthday:string;
  idCard:string;
  salary:number;
  phone:string;
  email:string;
  address:string;
}
