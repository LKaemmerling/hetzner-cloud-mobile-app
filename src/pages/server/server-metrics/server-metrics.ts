import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ServerApiProvider} from "../../../providers/server-api/server-api";

/**
 * Generated class for the ServerMetricsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-server-metrics',
  templateUrl: 'server-metrics.html',
})
export class ServerMetricsPage {

  public min = '';
  public max = '';
  public time_start = null;

  public time_end = null;
  public server;
  public cpu_metrics = [];
  public cpu_metrics_label = [];
  public options = {
    responsive: true
  };

  public disk_metrics = [];
  public disk_labels = [];
  public disk_bandwidth_metrics = [];
  public disk_bandwidth_labels = [];
  public network_pps_metrics = [];
  public network_pps_labels = [];

  public network_bandwidth_metrics = [];
  public network_bandwidth_labels = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public serverApiProvider: ServerApiProvider) {
    this.min = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();
    this.max = new Date().toISOString();
    this.time_start = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();
    this.time_end = new Date().toISOString();
    this.server = navParams.get('server');
    this.load();
  }

  public load() {
    this.getCpuMetrics();
    this.getDiskMetrics();
    this.getNetworkMetrics();
  }

  public getCpuMetrics() {
    this.serverApiProvider.getMetrics(this.server.id, 'cpu', this.time_start, this.time_end).then((data) => {
      data['metrics'].time_series.cpu.values.forEach((value) => {
        console.log(value[1], value[0]);
        this.cpu_metrics.push(value[1]);
        this.cpu_metrics_label.push(this.timeConverter(value[0]));
      });
      console.log(data['metrics'].time_series.cpu.values);

    })
  }

  public getDiskMetrics() {
    this.serverApiProvider.getMetrics(this.server.id, 'disk', this.time_start, this.time_end).then((data) => {
      this.disk_metrics = [
        {data: [], label: ''},
        {data: [], label: ''}
      ];
      this.disk_bandwidth_metrics = [
        {data: [], label: ''},
        {data: [], label: ''}
      ];
      data['metrics'].time_series['disk.0.iops.read'].values.forEach((value) => {
        this.disk_metrics[0].data.push(value[1]);
        this.disk_metrics[0].label = 'read';
      });
      data['metrics'].time_series['disk.0.iops.write'].values.forEach((value) => {
        this.disk_metrics[1].data.push(value[1]);
        this.disk_metrics[1].label = 'write';
        this.disk_labels.push(this.timeConverter(value[0]));
      });
      data['metrics'].time_series['disk.0.bandwidth.read'].values.forEach((value) => {
        this.disk_bandwidth_metrics[0].data.push(value[1]);
        this.disk_bandwidth_metrics[0].label = 'read';
      });
      data['metrics'].time_series['disk.0.bandwidth.write'].values.forEach((value) => {
        this.disk_bandwidth_metrics[1].data.push(value[1]);
        this.disk_bandwidth_metrics[1].label = 'write';
        this.disk_bandwidth_labels.push(this.timeConverter(value[0]));
      });
    })
  }

  public getNetworkMetrics() {
    this.serverApiProvider.getMetrics(this.server.id, 'network', this.time_start, this.time_end).then((data) => {
      this.network_pps_metrics = [
        {data: [], label: ''},
        {data: [], label: ''}
      ];
      this.network_bandwidth_metrics = [
        {data: [], label: ''},
        {data: [], label: ''}
      ];
      data['metrics'].time_series['network.0.pps.in'].values.forEach((value) => {
        this.network_pps_metrics[0].data.push(value[1]);
        this.network_pps_metrics[0].label = 'in';
      });
      data['metrics'].time_series['network.0.pps.out'].values.forEach((value) => {
        this.network_pps_metrics[1].data.push(value[1]);
        this.network_pps_metrics[1].label = 'out';
        this.network_pps_labels.push(this.timeConverter(value[0]));
      });
      data['metrics'].time_series['network.0.bandwidth.in'].values.forEach((value) => {
        this.network_bandwidth_metrics[0].data.push(value[1]);
        this.network_bandwidth_metrics[0].label = 'in';
      });
      data['metrics'].time_series['network.0.bandwidth.out'].values.forEach((value) => {
        this.network_bandwidth_metrics[1].data.push(value[1]);
        this.network_bandwidth_metrics[1].label = 'out';
        this.network_bandwidth_labels.push(this.timeConverter(value[0]));
      });
    })
  }


  public timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }
}
