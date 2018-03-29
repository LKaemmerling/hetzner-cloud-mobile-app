import {Injectable} from "@angular/core";

@Injectable()
export class project {
  public name: string;
  public api_key: string;

  constructor(name: string = '', api_key: string = '') {
    this.name = name;
    this.api_key = api_key;
  }
}
