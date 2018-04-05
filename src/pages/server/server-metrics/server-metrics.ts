import {Component, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {BaseChartDirective} from "ng2-charts";
import {Server} from "../../../modules/hetzner-cloud-data/servers/server";

/**
 * This page displays all available metrics from the server
 */
@Component({
  selector: 'page-server-metrics',
  templateUrl: 'server-metrics.html',
})
export class ServerMetricsPage {
  /**
   * Max Start date
   * @type {string}
   */
  public min: string = '';
  /**
   * Max End Date
   * @type {string}
   */
  public max: string = '';
  /**
   * Startpoint
   * @type {null}
   */
  public time_start: string = null;
  /**
   * Endpoint
   * @type {null}
   */
  public time_end = null;
  /**
   * The server that contains the metrics
   */
  public server: Server;
  /**
   * The metrics for the cpu
   * @type {any[]}
   */
  public cpu_metrics: Array<any> = [];
  /**
   * The labels
   * @type {any[]}
   */
  public cpu_metrics_label: Array<any> = [];
  /**
   * Global Options for all metrics
   * @type {{responsive: boolean; spanGaps: boolean}}
   */
  public options: object = {
    responsive: true,
    spanGaps: true,
  };

  /**
   * Objtions for all metrics
   * @type {{responsive: boolean; spanGaps: boolean; scales: {yAxes: {ticks: {callback: (value, index, values) => string}}[]}}}
   */
  public mb_options: object = {
    responsive: true,
    spanGaps: true,
    scales: {
      yAxes: [{
        ticks: {
          // Include a dollar sign in the ticks
          callback: (value, index, values) => {
            return this.transform(value);
          }
        }
      }]
    }
  };
  /**
   * Base Chart
   */
  @ViewChildren(BaseChartDirective) chart: QueryList<BaseChartDirective>;
  /**
   * Metrics Disk
   * @type {any[]}
   */
  public disk_metrics: Array<any> = [];
  /**
   * Labels Metrics Disk
   * @type {any[]}
   */
  public disk_labels: Array<any> = [];
  /**
   * Metrics Bandwidth Disk
   * @type {any[]}
   */
  public disk_bandwidth_metrics: Array<any> = [];
  /**
   * Labels Metrics Bandwidth Disk
   * @type {any[]}
   */
  public disk_bandwidth_labels: Array<any> = [];
  /**
   * Metrics Network pps
   * @type {any[]}
   */
  public network_pps_metrics: Array<any> = [];

  /**
   * Labels Metrics Network pps
   * @type {any[]}
   */
  public network_pps_labels: Array<any> = [];
  /**
   * Metrics Network Bandwidth
   * @type {any[]}
   */
  public network_bandwidth_metrics: Array<any> = [];
  /**
   * Metrics Network Bandwidth Labels
   * @type {any[]}
   */
  public network_bandwidth_labels: Array<any> = [];

  /**
   * Constructor
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {ServerApiProvider} serverApiProvider
   * @param {LoadingController} loadingCtrl
   */
  constructor(protected navCtrl: NavController, protected navParams: NavParams, protected serverApiProvider: ServerApiProvider, protected loadingCtrl: LoadingController) {
    this.min = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();
    this.max = new Date().toISOString();
    this.time_start = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();
    this.time_end = new Date().toISOString();
    this.server = navParams.get('server');
    this.load(false);
  }

  /**
   * Load all charts
   * @param {boolean} reload
   */
  public load(reload = true) {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.getCpuMetrics().then(() => {
      this.getDiskMetrics().then(() => {
        this.getNetworkMetrics().then(() => {
          console.log(this.chart);
          if (this.chart != undefined && reload == true) {
            setTimeout(() => {
              this.chart.forEach((_chart) => {
                _chart.ngOnChanges({} as SimpleChanges)
              });
              loader.dismiss();
            }, 1000);
          } else {
            loader.dismiss();
          }

        });
      });
    });
  }

  /**
   * Get the CPU Metrics
   * @returns {Promise<any>}
   */
  public getCpuMetrics() {
    return new Promise((resolve, reject = null) => {
      this.cpu_metrics = [];
      this.cpu_metrics_label = [];
      this.serverApiProvider.getMetrics(this.server.id, 'cpu', this.time_start, this.time_end).then((data) => {
        data['metrics'].time_series.cpu.values.forEach((value) => {
          this.cpu_metrics.push(value[1]);
          this.cpu_metrics_label.push(this.timeConverter(value[0]));
        });
        resolve();

      });
    });
  }

  /**
   * Get the Disk metrics
   * @returns {Promise<any>}
   */
  public getDiskMetrics() {
    return new Promise((resolve, reject = null) => {
      this.serverApiProvider.getMetrics(this.server.id, 'disk', this.time_start, this.time_end).then((data) => {
        this.disk_metrics = [
          {data: [], label: 'read'},
          {data: [], label: 'write'}
        ];
        this.disk_bandwidth_metrics = [
          {data: [], label: 'read'},
          {data: [], label: 'write'}
        ];
        this.disk_labels = [];
        this.disk_bandwidth_labels = [];

        data['metrics'].time_series['disk.0.iops.read'].values.forEach((value) => {
          this.disk_metrics[0].data.push(value[1]);
        });
        data['metrics'].time_series['disk.0.iops.write'].values.forEach((value) => {
          this.disk_metrics[1].data.push(value[1]);
          this.disk_labels.push(this.timeConverter(value[0]));
        });
        data['metrics'].time_series['disk.0.bandwidth.read'].values.forEach((value) => {
          this.disk_bandwidth_metrics[0].data.push(this.transformWOUnit(value[1]));
        });
        data['metrics'].time_series['disk.0.bandwidth.write'].values.forEach((value) => {
          this.disk_bandwidth_metrics[1].data.push(this.transformWOUnit(value[1]));
          this.disk_bandwidth_labels.push(this.timeConverter(value[0]));
        });
        resolve();
      });
    });
  }

  /**
   * Get the Network Metrics
   * @returns {Promise<any>}
   */
  public getNetworkMetrics() {
    return new Promise((resolve, reject = null) => {
      this.serverApiProvider.getMetrics(this.server.id, 'network', this.time_start, this.time_end).then((data) => {
        this.network_pps_metrics = [
          {data: [], label: 'in'},
          {data: [], label: 'out'}
        ];
        this.network_bandwidth_metrics = [
          {data: [], label: 'in'},
          {data: [], label: 'out'}
        ];
        this.network_pps_labels = [];
        this.network_bandwidth_labels = [];
        data['metrics'].time_series['network.0.pps.in'].values.forEach((value) => {
          this.network_pps_metrics[0].data.push(value[1]);
        });
        data['metrics'].time_series['network.0.pps.out'].values.forEach((value) => {
          this.network_pps_metrics[1].data.push(value[1]);
          this.network_pps_labels.push(this.timeConverter(value[0]));
        });
        data['metrics'].time_series['network.0.bandwidth.in'].values.forEach((value) => {
          this.network_bandwidth_metrics[0].data.push(this.transformWOUnit(value[1]));
        });
        data['metrics'].time_series['network.0.bandwidth.out'].values.forEach((value) => {
          this.network_bandwidth_metrics[1].data.push(this.transformWOUnit(value[1]));
          this.network_bandwidth_labels.push(this.timeConverter(value[0]));
        });
        resolve();
      });
    });
  }

  /**
   * Converte the unix timestamp into a readable date
   * @param UNIX_timestamp
   * @returns {string}
   */
  public timeConverter(UNIX_timestamp) {
    //var f = UNIX_timestamp.split('.');
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


  /**
   * Convert bytes into largest possible unit.
   * Takes an precision argument that defaults to 2.
   * Usage:
   *   bytes | fileSize:precision
   * Example:
   *   {{ 1024 |  fileSize}}
   *   formats to: 1 KB
   **/
  transform(bytes: number = 0, precision: number = 2): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return '?';
    let units = [
      'bytes',
      'KB',
      'MB',
      'GB',
      'TB',
      'PB'
    ];

    let unit = 0;
    bytes = parseFloat(String(bytes));
    if (bytes < 0) {
      bytes = bytes * -1;
    }
    while (bytes >= 1024) {
      bytes /= 1024;
      unit++;
    }
    return bytes.toFixed(+precision) + ' ' + units[unit];
  }

  /**
   * Convert bytes into largest possible unit, but doesn't set the unit
   * Takes an precision argument that defaults to 2.
   * Usage:
   *   bytes | fileSize:precision
   * Example:
   *   {{ 1024 |  fileSize}}
   *   formats to: 1 KB
   **/
  transformWOUnit(bytes: number = 0, precision: number = 2): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return '?';
    let unit = 0;
    bytes = parseFloat(String(bytes));
    if (bytes < 0) {
      bytes = bytes * -1;
    }
    while (bytes >= 1024) {
      bytes /= 1024;
      unit++;
    }
    return bytes.toFixed(+precision);
  }
}
