import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SSResults } from '../../_models/SunriseSunset/index';

@Injectable({ providedIn: 'root' })
export class TimeDayService {
  constructor(private http : HttpClient) {}

  getSunriseSunset(lat : number, long : number, formatted : boolean = false) {
    var formatCode = formatted ? 1 : 0;

    var now = new Date();
    return this.http.get<SSResults>('https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + long + '&formatted=' + formatCode + '&date=' + now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate());
  }

  getPhase(time : Date, res : SSResults) : string {
    if (res == undefined)
      return "Unknown";

    var phase = "Daylight";

    if (time > res.results.astronomical_twilight_end)
        phase = "Night";
    if (time > res.results.nautical_twilight_end && time <= res.results.astronomical_twilight_end)
        phase = "Astronomical Twilight";
    if (time > res.results.civil_twilight_end && time <= res.results.nautical_twilight_end)
        phase = "Nautical Twilight";
    if (time > res.results.sunset && time <= res.results.civil_twilight_end)
        phase = "Civil Twilight";

    
    if (time < res.results.astronomical_twilight_begin)
        phase = "Night";
    if (time < res.results.nautical_twilight_begin && time >= res.results.astronomical_twilight_begin)
        phase = "Astronomical Dawn";
    if (time < res.results.civil_twilight_begin && time >= res.results.nautical_twilight_begin)
        phase = "Nautical Dawn";
    if (time < res.results.sunrise && time >= res.results.civil_twilight_begin)
        phase = "Civil Dawn";

    return phase;
  }

  getShortPhase(time : Date, res : SSResults) : string {
    if (res == undefined)
      return "Unknown";
    
    var phase = "Daylight";

    if (time > new Date(res.results.astronomical_twilight_end))
        phase = "Night";
    if (time > new Date(res.results.nautical_twilight_end) && time <= new Date(res.results.astronomical_twilight_end))
        phase = "Astr Twilight";
    if (time > new Date(res.results.civil_twilight_end) && time <= new Date(res.results.nautical_twilight_end))
        phase = "Naut Twilight";
    if (time > new Date(res.results.sunset) && time <= new Date(res.results.civil_twilight_end))
        phase = "Civil Twilight";

    
    if (time < new Date(res.results.astronomical_twilight_begin))
        phase = "Night";
    if (time < new Date(res.results.nautical_twilight_begin) && time >= new Date(res.results.astronomical_twilight_begin))
        phase = "Astr Dawn";
    if (time < new Date(res.results.civil_twilight_begin) && time >= new Date(res.results.nautical_twilight_begin))
        phase = "Naut Dawn";
    if (time < new Date(res.results.sunrise) && time >= new Date(res.results.civil_twilight_begin))
        phase = "Civil Dawn";

    return phase;
  }
}
