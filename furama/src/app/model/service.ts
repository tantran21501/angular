import {RentType} from "./rent-type";

export class Service {
  id:number;
  code:string;
  name: string;
  area:number;
  numberFloor:number;
  maxPeople:number;
  cost:number;
  rentType: RentType;
  status: number;
}
