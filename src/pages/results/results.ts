import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PerformanceDataProvider } from '../../providers/performance-data/performance-data';

@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultPage {
  result = [];

  constructor(
    private performanceData: PerformanceDataProvider,
    public navCtrl: NavController, 
    public navParams: NavParams
    ) {}

  ionViewDidLoad() {
    this.performanceData
      .getResults()
      .subscribe(data => (this.result = data.entries));
  }

}
