import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WXData } from '../../_models/WXStation/wxdata.model';

@Injectable({ providedIn: 'root' })
export class WXStationService {
  constructor(private http : HttpClient) {}

  getData() {
    // Note:  in order to test this, set the port to 25814.  It will return no data,
    //        forcing the application into an "unreachable wx data" state.
    return this.http.get<WXData>('http://girlinspace.com:25813/data');
  }
}
