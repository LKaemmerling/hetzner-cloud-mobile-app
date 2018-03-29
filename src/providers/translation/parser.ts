import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateDefaultParser, TranslateParser} from "@ngx-translate/core";

export class parser extends TranslateDefaultParser{
  getValue(target: any, key: string): any {
  }

  interpolate(expr: string | Function, params?: any): string {
    return "";
  }

}
