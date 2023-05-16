import {Contract} from "./contract";
import {AttachService} from "./attach-service";

export class ContractDetail {
  id:number;
  contract:Contract;
  attachService: AttachService;
  quantity:number;
}
