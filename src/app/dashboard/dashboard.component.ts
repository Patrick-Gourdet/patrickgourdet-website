import {
  Component, OnInit,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';
import {Http} from '@angular/http';
import { trigger, state, transition, style, animate } from '@angular/animations'
declare let d3: any;
declare let nv: any;

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html',
  styleUrls: [
    './dashboard.style.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('600ms')),
      transition('hidden => shown', animate('300ms')),
    ])
  ]
})
export class Dashboard implements OnInit {
  nvd31Chart: any;
  nvd31Data: any;
  public crptoCUrr: {
    cryptoName: String,
    amount: Number,
    cryptoName2: String,
    amount2: Number,
    cryptoName3: String,
    amount3: Number,
    cryptoName4: String,
    amount4: Number
  };
  public cryptoCurrHist:{
    cryptoName: String,
    values:
      [{

      }]
  };
  private  crypto: any;
  private history: any;
  private data1: any;
  private ETH: any;
  private BTC: any;
  private LTC: any;
  private XRP: any;
  chartData: boolean;
  visiblityState = 'hidden';
  cryptoName = "CryptoCurrency";
  @ViewChild('CHART') chart;

  constructor(private https: Http) {}

  private saveData() {

    this.crptoCUrr = {cryptoName: 'ETH', amount: this.ETH , cryptoName2: 'BTC', amount2: this.BTC,
      cryptoName3: 'LTC', amount3: this.LTC , cryptoName4: 'XRP', amount4: this.XRP};
    console.log(this.crptoCUrr);
    this.https.post('/api/save', this.crptoCUrr).subscribe((data) => {
      console.log(data.toString());
    });
  }
  private async saveHistory(requesting: string) {
    this.cryptoCurrHist = {
      cryptoName: requesting,
        values:this.history.Data};
    let request = {requesting: requesting};
   console.log(this.cryptoCurrHist);
    await this.https.post('/api/save-history', request).toPromise().then((data) => {
      console.log(data.toString());
      this.history = JSON.parse(data.text());
    });
    // this.applyNvd3Data();
  }
  // Here is the etery point after ngoninit this goes to the data base and pulls the last entery in the DB

  private getCurr() {
    this.https.get('/api/get-curr').subscribe((data) => {
      this.crypto = JSON.parse(data.text());
      let milli = Date.parse(this.crypto.cryptocurr.updated_at);
      let newmilli = Date.now();
      let hour =  (Math.abs(milli - newmilli));
      // If the time stamp is over 5 hours old request new values from API
      if (hour >=  (5 * 3600000) || this.crypto.cryptocurr.amount === undefined || this.crypto.cryptocurr.amount === 0 ) {
        this.update();
      }else {
        this.ETH = this.crypto.cryptocurr.amount;
        this.BTC = this.crypto.cryptocurr.amount2;
        this.LTC = this.crypto.cryptocurr.amount3;
        this.XRP = this.crypto.cryptocurr.amount4;
      }
      this.visiblityState = 'shown';
      console.log(this.crypto);
    });
  }

  its(requesting: string){
    console.log("YOU CLICKED ME " + requesting);
    this.https.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${requesting}&tsym=USD&limit=300`)
      .subscribe((data) => {
        this.history = JSON.parse(data.text());
        this.data1 = this.history.Data;
        console.log(this.data1);
        console.log("DONE");
        // this.chart.chart.update();
        // this.applyNvd3Data();
      });

  }
  itsClicked(requesting: string){
    this.chartData = false;
    console.log("YOU CLICKED ME " + requesting);
    this.https.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${requesting}&tsym=USD&limit=300`)
      .subscribe((data) => {
        this.history = JSON.parse(data.text());
        this.data1 = this.history.Data;
        console.log(this.data1);
        console.log("DONE");
        // this.updateLine();
        if(requesting === "BTC"){ this.cryptoName = requesting + " Bitcoin";}
        if(requesting === "ETH"){ this.cryptoName = requesting + " Ethrerium";}
        if(requesting === "LTC"){ this.cryptoName = requesting + " Litecoin";}
        if(requesting === "XRP"){ this.cryptoName = requesting + " Ripple";}
        // this.saveHistory(requesting)
        this.applyNvd3Data();
      });

  }
  updateLine(){
    function get(hist) : Array<Object>{
      let data = [];
      let x: Object;
      for(let i = 0;i < hist.length -1;i++){
        let time = {v: hist[i].time};
        let node = {x:hist[i].time,y: hist[i].open };
        data.push(node);
      }
      return [
        {
          key: 'Currency',
          values: data,
          color: "#FFFFFF"
        }
      ]
    }
    let j = get(this.history.Data);
    this.nvd31Chart.update();

  }
  //This is the update calls API and then saves the values
  update() {
    this.https.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BTC,LTC,XRP&tsyms=USD')
      .subscribe((data) => {
        this.crypto = JSON.parse(data.text());
        console.log(this.crypto.ETH.USD);
        console.log(this.crypto.BTC.USD);
        console.log(this.crypto.LTC.USD);
        console.log(this.crypto.XRP.USD);
        this.ETH = this.crypto.ETH.USD;
        this.BTC = this.crypto.BTC.USD;
        this.LTC = this.crypto.LTC.USD;
        this.XRP = this.crypto.XRP.USD;
        this.saveData();
      });

  }

  ngOnInit(): void {

    this.getCurr();


  }

  applyNvd3Data(): void {


    this.nvd31Chart = nv.models.lineChart();
    //All the options  BELOW ARE VALID THUS I WILL LEAVE THEM FOR FUTURE REFRENCE
    //   .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
    //   .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
    //   .transitionDuration(350)  //how fast do you want the lines to transition?
    //   .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
    //   .showYAxis(true)        //Show the y-axis
    //   .showXAxis(true)        //Show the x-axis
    // ;
    // .useInteractiveGuideline(true)
    // .margin({left: 28, bottom: 30, right: 0})
    // .color(['#4380bf', '#38b05e']);
    let minMILLI = this.history.Data[0].time;
    let maxMILLI = this.history.Data[299].time;
    this.nvd31Chart.xAxis
    // .axisLabel('Time (ms)')
    // .tickFormat(d3.format(',r'));
    // .tickValues([minMILLI * 1000,maxMILLI * 1000])
      .showMaxMin(true)
      .tickFormat(function(d) {
        return d3.time.format('%m/%Y')(new Date(d*1000))
      });

    this.nvd31Chart.yAxis.scale().domain([-1, maxMILLI * 1000]);
      // .showMaxMin(false)
      // .tickFormat(d3.format('$ '  +',f'));

    // ({key: ['CRYPT'],values: data}) {key: ['CRYPT'],values: data} testData(['Unique', 'Visits'], 30)
    function get(hist) : Array<Object>{
      let data = [];
      let x: Object;
      for(let i = 0;i < hist.length -1;i++){
        // Hist Time shows is the date and open is the opening value of the bitcoin

        let node = {x:hist[i].time,y: hist[i].open };
        data.push(node);
      }
      return [
        {
          key: 'Currency',
          values: data,
          color: "#FFFFFF"
        }
      ]
    }

    let j = get(this.history.Data);
    console.log(j);
    this.nvd31Data = j;
    this.nvd31Data[0].area = false;
    this.chartData = true;
  };
}
