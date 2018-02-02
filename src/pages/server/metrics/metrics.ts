import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {ChartistComponent} from "ng-chartist";

@Component({
  selector: 'modal-metrics',
  templateUrl: 'metrics.html'
})
export class metricsModal {
  public server: any;
  public start_date: string;
  public end_date: string;
  public type: string;
  public cpu_chart_data: any = null;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.server = navParams.get('server');
  }


  public loadMetrics() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.getMetrics(this.server.id, this.type, this.start_date, this.end_date).then((data) => {

      this.cpu_chart_data = this.parseChartResponse('CPU', data['metrics'].time_series.cpu.values);
      console.log(this.cpu_chart_data);
      loader.dismiss();
    });

  }

  private parseChartResponse(label: string, values: Array<any>) {

    let tmp = {
      labels: [],
      series: []
    };
    values.forEach((value) => {
      tmp.labels.push(this.timeConverter(value[0]));
      tmp.series.push(value[1]);
    })
    return tmp;
  }

  private timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year;
    return time;
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
