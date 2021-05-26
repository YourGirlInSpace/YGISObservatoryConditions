import { Component, NgZone, OnInit } from '@angular/core';
import { WXData } from './_models/WXStation/wxdata.model';
import { NWSLatestObs } from './_models/NWS/models';
import { TimeDayService, WXStationService, NWSService } from './_services/services';
import { interval, Subscription } from 'rxjs';
import { SSResults } from './_models/SunriseSunset';

const e0 = 0.6113;
const Lv = 2.501e6;
const Rv = 461.495;
const T0 = 273.15;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angulartest';
  public time!: Date;
  public sunset!: Date;
  public sunrise!: Date;
  public astrNight!: Date;
  public dayPhase! : string;
  public wxIcon! : string;
  public webcamUrl! : string;
  public radarUrl! : string;

  public WXData! : WXData;
  public ObsData! : NWSLatestObs;
  public TDData! : SSResults;

  public dewpoint! : number;
  public heatIndex! : number;
  public dewPotential! : string;

  public lastUpdate! : Date;

  private nwsDataSubscription!: Subscription;
  private wxDataSubscription!: Subscription;
  private timeDataSubscription!: Subscription;
  private webcamSubscription!: Subscription;
  private astroTimeDataSubscription!: Subscription;

  constructor(private tdService : TimeDayService,
              private wxStation : WXStationService,
              private nwsService : NWSService) {

    this.WXData = new WXData();
    this.ObsData = new NWSLatestObs();
    this.TDData = new SSResults();
    this.dewpoint = 0;
    this.heatIndex = 0;
    this.dewPotential = "Unknown";

    this.time = new Date();
    this.sunset = new Date();
    this.sunrise = new Date();
    this.astrNight = new Date();
    this.dayPhase = "Unknown";
    this.webcamUrl = "";
    this.radarUrl = "";
    this.lastUpdate = new Date();

    
    this.wxIcon = "../assets/images/wx/alert.png";
    this.ObsData.properties.textDescription = "NWS Data N/A";
  }

  ngOnInit(): void {
    this.UpdateAstronomicalTimes();
    this.UpdateWXData();
    this.UpdateNWSData();
    this.UpdateTime();
    this.UpdateWebcam();

    const source = interval(1000*60*5);
    this.nwsDataSubscription = source.subscribe(val => this.UpdateNWSData());

    const source2 = interval(2000);
    this.wxDataSubscription = source2.subscribe(val => this.UpdateWXData());

    const source3 = interval(1000);
    this.timeDataSubscription = source3.subscribe(val => this.UpdateTime());

    const source4 = interval(1000*30);
    this.webcamSubscription = source4.subscribe(val => this.UpdateWebcam());
    
    const source5 = interval(1000*60*60);
    this.astroTimeDataSubscription = source5.subscribe(val => this.UpdateAstronomicalTimes());
  }

  ngOnDestroy() {
    this.nwsDataSubscription?.unsubscribe();
    this.wxDataSubscription?.unsubscribe();
    this.timeDataSubscription?.unsubscribe();
    this.webcamSubscription?.unsubscribe();
    this.astroTimeDataSubscription?.unsubscribe();
  }
  
  private UpdateWebcam() : void {
    this.webcamUrl = "https://instacam.earthnetworks.com/instacamimg/LHGWD/LHGWD_l.jpg?t=" + Date.now();
    this.radarUrl = "../assets/images/radar/ktbw_br1.png?t=" + Date.now();
  }

  private UpdateNWSData() : void {
    this.nwsService.getLatestObservation('KRSW').subscribe(evt => {
      this.ObsData = evt;

      this.wxIcon = this.nwsService.getWeatherIcon(evt);
    });
  }

  private UpdateAstronomicalTimes() : void {
    this.tdService.getSunriseSunset(26.61, -81.71).subscribe(evt => {
      evt.isOK = true;
      this.TDData = evt;

      this.sunset = evt.results.sunset;
      this.sunrise = evt.results.sunrise;
      this.astrNight = evt.results.astronomical_twilight_end;
    });
  }

  private UpdateTime() : void {
    this.time = new Date();

    this.dayPhase = this.tdService.getShortPhase(this.time, this.TDData);
  }

  private UpdateWXData() : void {
    this.wxStation.getData().subscribe(evt => {
      this.WXData = evt;

      this.dewpoint = 237.3 * this.Gamma(evt.tmp, evt.rh*0.01) / (17.5 - this.Gamma(evt.tmp, evt.rh*0.01));

      var satVapPress = e0 * Math.exp(Lv / Rv * (1 / T0 - 1 / (evt.tmp + T0))) * 10;

      this.heatIndex = 0.8841 * evt.tmp + 0.19 + (evt.tmp - (0.8841 * evt.tmp + 0.19)) * Math.pow((evt.rh*0.01)*satVapPress / 16, 0.0196 * evt.tmp + 0.9031);

      if (evt.rh < 70)
        this.dewPotential = "Low";
      else if (evt.rh < 80)
        this.dewPotential = "Slight";
      else if (evt.rh < 90)
        this.dewPotential = "Moderate";
      else
        this.dewPotential = "High";
      
      this.lastUpdate = new Date();
    });
  }

  private Gamma(tmp : number, rh : number) : number
  {
    return Math.log(rh) + 17.5 * tmp / (237.3 + tmp);
  }
}
