import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApexTitleSubtitle,
  ApexMarkers,
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexResponsive,
} from 'ng-apexcharts';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
export type chartOptions = {
  series: ApexAxisChartSeries;
  series2: ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
  plotOptions: ApexPlotOptions;
  labels: string[];
  responsive: ApexResponsive | ApexResponsive[];
};
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  anno: any = (localStorage.getItem('anno')) ? localStorage.getItem('anno') : new Date().getFullYear()
  donatori: any = [
    {donatori_sangue:''},
    {donatori_piastrine:''},
    {donatori_plasma:''},
    {donatori_multicomponenti:''},
    {donatori_admo:''},
  ]
  donazioni_mensili:any = []
  donazioni_annuali:any = []
  tot: number
  istogramma:any = []
  @ViewChild('chart') chart: ChartComponent;
  public areaChartOptions: Partial<chartOptions>;
  public barChartOptions: Partial<chartOptions>;
  public circleChartOptions: Partial<chartOptions>;
  public pieChartOptions: Partial<chartOptions>;
  public radarChartOptions: any;

  gaugeType = 'arch';
  gaugeValue = 48;
  gaugeSize = 170;
  guageThick = 16;
  thresholdConfig = {
    0: { color: 'green' },
    40: { color: 'orange' },
    75.5: { color: 'red' },
  };

  gaugeType2 = 'arch';
  gaugeValue2 = 34;
  gaugeSize2 = 170;
  guageThick2 = 16;
  thresholdConfig2 = {
    0: { color: 'green' },
    40: { color: 'orange' },
    75.5: { color: 'red' },
  };

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
   
  }
  private chart1() {
    this.areaChartOptions = {
      series: [
        {
          name: 'Booking Per Day',
          data: [],
        },
      ],
      chart: {
        type: 'area',
        stacked: false,
        height: 250,
        toolbar: {
          show: true,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#9F8DF1', '#E79A3B'],
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      stroke: {
        curve: 'smooth',
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
        title: {
          text: 'Booking',
        },
      },
      xaxis: {
        type: 'datetime',
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: 0,
      },

      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
        y: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
      },
    };
    let array:any = []
    const anno = {anno:this.anno}
    this.http.post(environment.apiUrl+'/riepilogo.php',JSON.stringify(anno))
    .subscribe(response => {
     //console.log(response)
      array = response
    },null,() => {
array.sort(function(a, b) {
  var c:any = new Date(a.date);
  var d:any = new Date(b.date);
  return c-d;
});

var result = [];
array.reduce(function(res, value) {
  if (!res[value.date]) {
    res[value.date] = { date: value.date, value: 0 };
    result.push(res[value.date])
  }
  res[value.date].value += value.value*1;
  return res;
}, {});

    // let ts2 = 1484418600000;
    let dates = [];
    for (let i = 0; i < result.length; i++) {
   //   ts2 = ts2 + 86400000;
      dates.push([result[i].date, result[i].value]);
    }
   this.areaChartOptions = {
     series: [
       {
         name: 'Donazioni Giornaliere',
         data: dates,
       },
     ],
     chart: {
       type: 'area',
       stacked: false,
       height: 250,
       toolbar: {
         show: true,
       },
       foreColor: '#9aa0ac',
     },
     colors: ['#9F8DF1', '#E79A3B'],
     dataLabels: {
       enabled: false,
     },
     markers: {
       size: 0,
     },
     fill: {
       type: 'gradient',
       gradient: {
         shadeIntensity: 1,
         inverseColors: false,
         opacityFrom: 0.5,
         opacityTo: 0,
         stops: [0, 90, 100],
       },
     },
     stroke: {
       curve: 'smooth',
     },
     yaxis: {
       labels: {
         formatter: function (val) {
           return (val).toFixed(0);
         },
       },
       title: {
         text: 'Booking',
       },
     },
     xaxis: {
       type: 'datetime',
     },
     legend: {
       show: true,
       position: 'top',
       horizontalAlign: 'center',
       offsetX: 0,
       offsetY: 0,
     },

     tooltip: {
       theme: 'dark',
       marker: {
         show: true,
       },
       x: {
         show: true,
       },
       y: {
         formatter: function (val) {
           return (val).toFixed(0);
         },
       },
     },
   };
    })

  }

  ngOnInit() {
    const anno = {anno:this.anno}
    this.http.post(environment.apiUrl+'/donazioni_mensili.php',JSON.stringify(anno))
    .subscribe({
      next: response => {
      this.donazioni_mensili = response['mensile']
      this.donazioni_annuali = response['totale']
    },
  error: null,
complete:() =>{
  let tot = 0
  this.donazioni_mensili.forEach(element => {
    tot += element.somma*1
  });
  this.donazioni_mensili.cumulata = tot
}}
    )
    const gg = JSON.parse(localStorage.getItem('attivazione')).gg
    if(gg<16 && gg>5) {
      this.showNotification('snackbar-success','ATTENZIONE! Il servizio sta per scadere.','top','right')
    }

    if(gg<=5 && gg>0) {
      this.showNotification('snackbar-danger','ATTENZIONE! Il servizio scade tra '+gg+' giorni.','top','right')
    }

    if(gg<=0 && gg>-6) {
      const rimanenza = 6+gg*1
      this.showNotification('snackbar-danger','ATTENZIONE! Il servizio è scaduto e verrà sospeso tra '+rimanenza+' giorni.','top','right')
    }
    if(gg<-7) {
      
      this.router.navigate(['/authentication/page500']);
    }
    
    this.http.post(environment.apiUrl+'/donatori.php',JSON.stringify(anno))
    .subscribe(response => {
      this.donatori = response
      console.log(response)
    },null,() => {
      this.tot = this.donatori[0].donatori_sangue*1 + this.donatori[1].donatori_piastrine*1 + this.donatori[2].donatori_plasma*1 + this.donatori[4].donatori_admo*1

    })
    this.chart1();

    this.chart8()
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }

  private chart8() {
    this.radarChartOptions = {
      chart: {
        height: 425,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        },
        foreColor: '#9aa0ac'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -5,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          // endingShape: 'rounded',
          columnWidth: '180%'
        }
      },
      series: [
        {
          name: 'SANGUE INTERO',
          data: []
        },
        {
          name: 'PLASMA',
          data: []
        },
        {
          name: 'PIASTRINE',
          data: []
        },
        {
          name: 'ADMO',
          data: []
        }
      ],

      fill: {
        opacity: 1
      }
    };
    const anno = {anno:this.anno}
this.http.post(environment.apiUrl+'/grafico_mensile.php',JSON.stringify(anno))
.subscribe(response => {
  console.log(response)
  this.istogramma = response
  this.radarChartOptions = {
    chart: {
      height: 550,
      type: 'bar',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      },
      foreColor: '#9aa0ac'
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -5,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        // endingShape: 'rounded',
        columnWidth: '180%'
      }
    },
    series: [
      {
        name: 'SANGUE INTERO',
        data: [this.istogramma[0].sangue_intero,this.istogramma[1].sangue_intero,this.istogramma[2].sangue_intero,this.istogramma[3].sangue_intero,this.istogramma[4].sangue_intero,this.istogramma[5].sangue_intero,this.istogramma[6].sangue_intero,this.istogramma[7].sangue_intero,this.istogramma[8].sangue_intero,this.istogramma[9].sangue_intero,this.istogramma[10].sangue_intero,this.istogramma[11].sangue_intero]
      },
      {
        name: 'PIASTRINE',
        data: [this.istogramma[0].ptn,this.istogramma[1].ptn,this.istogramma[2].ptn,this.istogramma[3].ptn,this.istogramma[4].ptn,this.istogramma[5].ptn,this.istogramma[6].ptn,this.istogramma[7].ptn,this.istogramma[8].ptn,this.istogramma[9].ptn,this.istogramma[10].ptn,this.istogramma[11].ptn]
      },
      {
        name: 'PLASMA',
        data: [this.istogramma[0].plasma,this.istogramma[1].plasma,this.istogramma[2].plasma,this.istogramma[3].plasma,this.istogramma[4].plasma,this.istogramma[5].plasma,this.istogramma[6].plasma,this.istogramma[7].plasma,this.istogramma[8].plasma,this.istogramma[9].plasma,this.istogramma[10].plasma,this.istogramma[11].plasma]
      },
      {
        name: 'ADMO',
        data: [this.istogramma[0].admo,this.istogramma[1].admo,this.istogramma[2].admo,this.istogramma[3].admo,this.istogramma[4].admo,this.istogramma[5].admo,this.istogramma[6].admo,this.istogramma[7].admo,this.istogramma[8].admo,this.istogramma[9].admo,this.istogramma[10].admo,this.istogramma[11].admo]
      }
    ],

    fill: {
      opacity: 1
    }
  };
})    
  }

  color(valore) {
    console.log(valore)
    if(valore<100) {
      return 'warn';
    }
    
   
  }

}
