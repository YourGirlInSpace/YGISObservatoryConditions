import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CloudLayer, NWSLatestObs } from '../../_models/NWS/models';
import { PresentWeather } from 'src/app/_models/NWS/presentweather.model';

@Injectable({ providedIn: 'root' })
export class NWSService {
  constructor(private http : HttpClient) {}

  getLatestObservation(icao : string) {
    return this.http.get<NWSLatestObs>('https://api.weather.gov/stations/' + icao + '/observations/latest');
  }

  getWeatherIcon(latestObs : NWSLatestObs) : string {
    const assetPrefix = "../assets/images/wx/";

    var hasClouds = latestObs.properties.cloudLayers.length > 0;
    var hasPrecip = latestObs.properties.presentWeather.length > 0;
    var maxClouds = "";
    var maxPrecip = "";
    
    if (hasClouds)
      maxClouds = this.getMaxClouds(latestObs.properties.cloudLayers);
    if (hasPrecip)
      maxPrecip = this.getMaxPrecip(latestObs.properties.presentWeather);

    var time = new Date();
    var daytime = time.getHours() > 6 && time.getHours() < 20;
    var windy = latestObs.properties.windSpeed.value != undefined && latestObs.properties.windSpeed.value > 10;

    var timeDir = daytime ? "day" : "night";

    var overcast = hasClouds && maxClouds == "OVC";

    if (!hasPrecip)
    {
      // No clouds, no wind
      if (!hasClouds && !windy)
        return assetPrefix + timeDir + "/Clear.png";

      // No clouds, windy
      if (!hasClouds && windy)
        return assetPrefix + "ambi/Windy.png";

      if (hasClouds) {
        if (!overcast) {
          // Cloudy with sun
          if (windy)
            return assetPrefix + timeDir + "/Windy.png";
          else
            return assetPrefix + timeDir + "/Cloudy.png";
        } else {
          // Clouded out
          if (windy)
            return assetPrefix + "ambi/Cloudy Windy.png";
          else
            return assetPrefix + "ambi/Cloudy.png";
        }
      }
    } else {
      switch (maxPrecip.slice(-2))
      {
        case "TS":
          return overcast ? assetPrefix + "ambi/TS.png" : assetPrefix + timeDir + "/TS.png";
        case "GR":
          return assetPrefix + "ambi/GR.png";
        case "RA":
          return overcast ? assetPrefix + "ambi/" + maxPrecip + ".png" : assetPrefix + timeDir + "/" + maxPrecip + ".png";
        case "SN":
          return overcast ? assetPrefix + "ambi/" + maxPrecip + ".png" : assetPrefix + timeDir + "/" + maxPrecip + ".png";
        case "DZ":
          return overcast ? assetPrefix + "ambi/DZ.png" : assetPrefix + timeDir + "/DZ.png";
        case "FG":
          return overcast ? assetPrefix + "ambi/FG.png" : assetPrefix + timeDir + "/FG.png";
        case "BR":
          return overcast ? assetPrefix + "ambi/BR.png" : assetPrefix + timeDir + "/BR.png";
        case "HZ":
          return assetPrefix + "ambi/HZ.png";
        case "UP":
          return overcast ? assetPrefix + "ambi/RA.png" : assetPrefix + timeDir + "/RA.png";
      }
    }

    return "";
  }

  private getMaxPrecip(phenomena : PresentWeather[]) : string
  {
    var classes = ["TS", "GR", "RA", "SN", "DZ", "FG", "BR", "HZ", "UP"];

    var phenomenas = phenomena.map(e => e.rawString);

    var maxPhenom = 99;
    var intensity = "";
    phenomenas.forEach(element => {
      if (["TS", "SQ", "FC"].includes(element.replace('-', '').replace('+', '')) && maxPhenom > 1) {
        maxPhenom = 1;
        
        if (element.startsWith('+') || element.startsWith('-'))
          intensity = element[0];
      }
      else if (["GR", "GS"].includes(element.replace('-', '').replace('+', '')) && maxPhenom > 2) {
        maxPhenom = 2;
        
        if (element.startsWith('+') || element.startsWith('-'))
          intensity = element[0];
      }
      else if (["RA", "SH"].includes(element.replace('-', '').replace('+', '')) && maxPhenom > 3) {
        maxPhenom = 3;
        
        if (element.startsWith('+') || element.startsWith('-'))
          intensity = element[0];
      }
      else if (["SN", "IC", "PL"].includes(element.replace('-', '').replace('+', '')) && maxPhenom > 4) {
        maxPhenom = 4;
        
        if (element.startsWith('+') || element.startsWith('-'))
          intensity = element[0];
      }
      else if (["DZ"].includes(element.replace('-', '').replace('+', '')) && maxPhenom > 5) {
        maxPhenom = 5;
        
        if (element.startsWith('+') || element.startsWith('-'))
          intensity = element[0];
      }
      else if (["FG"].includes(element.replace('-', '').replace('+', '')) && maxPhenom > 6) {
        maxPhenom = 6;
        
        if (element.startsWith('+') || element.startsWith('-'))
          intensity = element[0];
      }
      else if (["BR", "PY"].includes(element.replace('-', '').replace('+', '')) && maxPhenom > 7) {
        maxPhenom = 7;
        
        if (element.startsWith('+') || element.startsWith('-'))
          intensity = element[0];
      }
      else if (["HZ", "VA", "DU", "FU", "PO", "DS", "SS", "SA"].includes(element.replace('-', '').replace('+', '')) && maxPhenom > 8) {
        maxPhenom = 8;
        
        if (element.startsWith('+') || element.startsWith('-'))
          intensity = element[0];
      }
      else if (maxPhenom > 9) {
        maxPhenom = 9;
      }
    });

    return intensity + classes[maxPhenom-1];
  }

  private getMaxClouds(layers : CloudLayer[]) : string {
    var maxClouds = "";

    layers.forEach(element => {
      switch (element.amount)
      {
        case "FEW":
          if (maxClouds == "")
            maxClouds = "FEW";
          break;
        case "SCT":
          if (maxClouds == "FEW" || maxClouds == "")
            maxClouds = "SCT";
          break;
        case "BKN":
          if (maxClouds == "SCT" || maxClouds == "FEW" || maxClouds == "")
            maxClouds = "BKN";
          break;
        case "OVC":
          maxClouds = "OVC";
          break;
      }
    });

    return maxClouds;
  }
}
