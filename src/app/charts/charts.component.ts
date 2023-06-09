import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SP500DATAService } from "../services/sp500-data.service";
Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  sp500data: any[] = [];
  dates: any[] = [];
  values: any[] = [];

  cleanedData: any[] = [];
  startMinYearControl = 0;
  startMaxYearControl = 0;

  endMinYearControl = 0;
  endMaxYearControl = 0;

  investorReturns: any[] = [];
  investorInterestRate = 4.26;
  investorInterestRateMax = 1000;
  investorInterestRateMin = -1000;
  investorEndingAmount = 0

  SPCap = 12;

  SP500AccountBalances: any[] = [];
  SP500AccountBalanceEnd = 0;
  SP500ActualGrowthRate = 0;
  SP500AverageRateOfReturn = 0;


  cappedSP500Return: any[] = [];
  cappedSP500ReturnEnd = 0;
  cappedSP500ActualGrowthRate = 0;
  cappedSP500AverageRateOfReturn = 0;




  startYear = 0;
  endYear = 0;

  startPeriod = 2000;
  endPeriod = 2023;
  startAmount = 100000;

  lineChart!: Chart;
  canvas!: HTMLCanvasElement;

  testArray = [102, 20, 320, 55, 44, 55, 44, 33, 55, 444, 555, 4, 5, 4, 5555, 3, 5, 4, 5543, 543, 345, 345, 2456, 2345, 2345, 2345, 2345];

  spLabel = 'S&P';
  spLabelFloorLabel = 'Index 0% Floor ' + this.SPCap + '% Cap';
  investorReturnLabel = 'Investor Return';

  constructor(private sp500dataService: SP500DATAService) {
  }

  ngOnInit() {

    this.sp500dataService.getData().subscribe(data => {
      this.sp500data = data;
      this.findMaxAndMin(this.sp500data);

      this.startMaxYearControl = this.endPeriod - 1
      this.endMinYearControl = this.startPeriod + 1

      this.getDataFromStartYearToEndYear(this.startPeriod, this.endPeriod, this.sp500data)
      // Call a method to update your chart with the fetched data
      console.log(this.sp500data);

      this.calculateInvestorReturns(this.startAmount, this.investorInterestRate, this.dates);


      console.log(this.startAmount)
      console.log(this.values);

      this.calculateSP500RateOfReturn(this.startAmount, this.values,);
      this.calculateCappedSP500Return(this.startAmount, this.values,);

      console.log(this.investorReturns)
      this.chart()


    });


  }


  findMaxAndMin(data: any) {
    //find the max and min dates in the data and set the start and end years to those values and only include the year


    let maxDate = new Date(Math.max.apply(null, data.map((item: { date: string | number | Date; }) => {
      return new Date(item.date);
    })));
    let maxDateYear = maxDate.getFullYear().toString();
    let MinDate = new Date(Math.min.apply(null, data.map((item: { date: string | number | Date; }) => {
      return new Date(item.date);
    })));
    let MinDateYear = MinDate.getFullYear().toString();

    this.startMinYearControl = parseInt(MinDateYear);
    // this.startMaxYearControl = parseInt(maxDateYear);
    this.endMaxYearControl = parseInt(maxDateYear);
    this.startYear = parseInt(MinDateYear);
    this.endYear = parseInt(maxDateYear);
    console.log(this.startMinYearControl);
    console.log(this.endMaxYearControl);

  }


  fetchChartData() {
    this.sp500dataService.getData().subscribe(data => {
      this.sp500data = data;
      // Call a method to update your chart with the fetched data
      console.log(this.sp500data);
      this.getDataFromStartYearToEndYear(this.startYear, this.endYear, this.sp500data);

    });
  }

  getDataFromStartYearToEndYear(startYear: number, endYear: number, data: any) {

    this.cleanedData = data.filter((item: { date: string | number | Date; }) => {
      const itemYear = new Date(item.date).getFullYear();
      return itemYear >= startYear && itemYear <= endYear;
    });

    this.dates = this.cleanedData.map(item => item.date);
    //remove the month and day from the date
    this.dates = this.dates.map(item => item.slice(0, 4));

    this.values = this.cleanedData.map(item => item.value);

    console.log(this.dates);
    console.log(this.values);

    // this.updateChart(this.dates, this.values);


  }

  calculateInvestorReturns(principal: number, interestRate: number, data: any[]): void {
    console.log()
    this.investorReturns = [];
    const years = data.length - 1;
    let balance = principal;
    this.investorReturns.push(balance);

    for (let i = 0; i < years; i++) {
      balance += balance * (interestRate / 100);
      this.investorReturns.push(Math.round(balance));
    }

    this.investorEndingAmount = this.investorReturns[this.investorReturns.length - 1];

    console.log(this.investorReturns);
  }


  calculateSP500RateOfReturn(principal: number, ratesOfReturn: number []): void {
    this.SP500AccountBalances = [];
    let years = ratesOfReturn.length - 1;
    this.SP500AccountBalances.push(principal);
    let payout = principal;

    for (let i = 0; i < years; i++) {
      let rate = ratesOfReturn[i];
      payout += payout * (rate/100);

      this.SP500AccountBalances.push(Math.round(payout));
    }
      //calculate the actual rate of return
    // this.SP500ActualRateOfReturn = (this.SP500AccountBalances[this.SP500AccountBalances.length - 1] - this.SP500AccountBalances[0]) / this.SP500AccountBalances[0] * 100;
    // calculate the CAGR

      this.SP500ActualGrowthRate = Math.pow((this.SP500AccountBalances[this.SP500AccountBalances.length - 1] / this.SP500AccountBalances[0]), (1 / years)) - 1;


    console.log(ratesOfReturn)
    console.log(ratesOfReturn.length)
    //calculate the Average Rate of Return
    this.SP500AverageRateOfReturn = ratesOfReturn.reduce((a, b) => a + b, 0) / ratesOfReturn.length;


    console.log(this.SP500AverageRateOfReturn)
      this.SP500AccountBalanceEnd = this.SP500AccountBalances[this.SP500AccountBalances.length - 1];


    console.log(this.SP500AccountBalances);
  }

  calculateCappedSP500Return(principal: number, ratesOfReturn: number []) {
    let indexRatesOfReturn = [];

    this.cappedSP500Return = [];
    let years = ratesOfReturn.length - 1;
    this.cappedSP500Return.push(principal);
    let payout = principal;

    for (let i = 0; i < years; i++) {
      let rate = ratesOfReturn[i];

      // Apply the floor and cap to the rate of return
      if (rate < 0) rate = 0;
      if (rate > this.SPCap) rate = this.SPCap
      indexRatesOfReturn.push(rate);

      payout += payout * (rate/100);

      this.cappedSP500Return.push(Math.round(payout));

    }

    // calculate the CAGR
    this.cappedSP500ActualGrowthRate = Math.pow((this.cappedSP500Return[this.cappedSP500Return.length - 1] / this.cappedSP500Return[0]), (1 / years)) - 1;

      //calculate the Average Rate of Return
    this.cappedSP500AverageRateOfReturn = indexRatesOfReturn.reduce((a, b) => a + b, 0) / indexRatesOfReturn.length;
      console.log(indexRatesOfReturn);


    this.cappedSP500ReturnEnd = this.cappedSP500Return[this.cappedSP500Return.length - 1];





    console.log(this.cappedSP500Return);
  }













  chart() {


    // this.getDataFromStartYearToEndYear(this.startYear, this.endYear, this.sp500data);
    // console.log(this.dates)

    this.canvas = document.getElementById('lineChart') as HTMLCanvasElement;
    this.lineChart = new Chart(this.canvas, {
      type: 'line',
      data: {
        labels: this.dates, // Replace with your own labels
        datasets: [
          {
            label: this.spLabel,
            data: this.SP500AccountBalances, // Replace with your own data
            borderColor: 'red',
            fill: false,
            cubicInterpolationMode: 'monotone',
            pointBackgroundColor: 'red',
            pointBorderColor: 'white',
            pointRadius: 5
          },
          {
            label: this.spLabelFloorLabel ,
            data: this.cappedSP500Return,
            hidden: true,
            borderColor: 'limegreen',
            fill: false,
            cubicInterpolationMode: 'monotone',
            pointBackgroundColor: 'limegreen',
            pointBorderColor: 'white',
            pointRadius: 5
          },
          {
            label: this.investorReturnLabel,
            data: this.investorReturns,
            hidden: true,
            borderColor: 'mediumpurple',
            fill: false,
            cubicInterpolationMode: 'monotone',
            pointBackgroundColor: 'mediumpurple',
            pointBorderColor: 'white',
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,


        plugins: {
          tooltip: {
            usePointStyle: true,


            bodyFont: {size: 16},
            callbacks: {
              label: (context: any) => {
                let label = context.dataset.label || '';
                let value = context.dataset.data[context.dataIndex];

                // This will convert the value to a string, add commas as thousand separators, and then add a dollar sign in front.
                value = '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                return label + ': ' + value;
              },
            }
          },
          legend: {
            labels: {
              color: 'white',
              font: {size: 14}

            },

          }
        },

        scales: {
          x: {

            ticks: {
              color: 'white',
              font: {size: 16},
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.3)',
            },
            ticks: {
              color: 'white',
              font: {size: 16},
              // Include a dollar sign in the ticks for the Y axes  (this is the default)
              callback: (value: any) => {
                // This will convert the value to a string, add commas as thousand separators, and then add a dollar sign in front.
                return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }
            }
          }
        }

      }
    });
  }

  updateChart() {

    // this.checkForOutOfRangeDates(this.startPeriod, this.endPeriod);

    this.getDataFromStartYearToEndYear(this.startPeriod, this.endPeriod, this.sp500data);
    this.calculateInvestorReturns(this.startAmount, this.investorInterestRate, this.dates);
    this.calculateSP500RateOfReturn(this.startAmount, this.values);
    this.calculateCappedSP500Return(this.startAmount, this.values);

    console.log(this.dates)
    console.log(this.investorReturns)

    // this.testArray = [202, 20, 420];

    this.lineChart.data.datasets[0].data = this.SP500AccountBalances;
    this.lineChart.data.datasets[1].data = this.cappedSP500Return;
    this.lineChart.data.datasets[2].data = this.investorReturns;
    this.lineChart.data.labels = this.dates;
    this.lineChart.update();
  }

  checkForStartPeriod() {

    if (this.startPeriod < this.startYear) {
      this.startPeriod = this.startYear;
    }
    if (this.startPeriod >= this.endPeriod) {
      this.startPeriod = this.endPeriod - 1;
    }
    this.endMinYearControl = this.startPeriod + 1;
    this.updateChart();

  }
  checkForEndPeriod() {
    console.log(
      'startPeriod: ' + this.startPeriod + ' endPeriod: ' + this.endPeriod + ' endYear: ' + this.endYear
    )


    if (this.endPeriod > this.endYear) {
      this.endPeriod = this.endYear;
    }
    if (this.endPeriod <= this.startPeriod) {
      this.endPeriod = this.startPeriod + 1;
    }
    this.startMaxYearControl = this.endPeriod - 1;
    this.updateChart();
  }

  checkForStartAmount(){
    // this.getDataFromStartYearToEndYear(this.startPeriod, this.endPeriod, this.sp500data);

    console.log(this.startAmount, this.investorInterestRate, this.dates);
    this.updateChart();
    // this.calculateInvestorReturns(this.startAmount, this.investorInterestRate, this.dates);
    // this.lineChart.data.datasets[2].data = this.investorReturns;
    // this.lineChart.update();
  }

  investorInterestRateChange(){
  if(this.investorInterestRate < this.investorInterestRateMin){
    this.investorInterestRate = this.investorInterestRateMin;
  }
  if(this.investorInterestRate > this.investorInterestRateMax){
    this.investorInterestRate = this.investorInterestRateMax;
  }

    this.updateChart();
  }

  indexCapChange(){

    this.spLabelFloorLabel = 'Index 0% Floor ' + this.SPCap + '% Cap';
    this.lineChart.data.datasets[1].label = this.spLabelFloorLabel;
    this.updateChart();

  }

  startAmountChange() {


    this.updateChart();

  }


}

// saleData = [
//   { name: "Mobiles", value: 105000 },
//   { name: "Laptop", value: 55000 },
//   { name: "AC", value: 15000 },
//   { name: "Headset", value: 150000 },
//   { name: "Fridge", value: 20000 }
// ];
