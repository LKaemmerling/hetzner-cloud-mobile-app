import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RestProvider} from "../../providers/rest/rest";

@Injectable()
export class project {
  public name: string;
  public api_key: string;
  public servers: Array<any>;

  constructor(name: string, api_key: string) {
    this.name = name;
    this.api_key = api_key;
  }
}
