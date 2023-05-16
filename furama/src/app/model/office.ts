import {RentType} from "./rent-type";

export class Office {
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
