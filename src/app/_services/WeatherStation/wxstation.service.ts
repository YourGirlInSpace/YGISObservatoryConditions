import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WXData } from '../../_models/WXStation/wxdata.model';

@Injectable({ providedIn: 'root' })
export class WXStationService {
  constructor(private http : HttpClient) {}

  getData() {
    return this.http.get<WXData>('http://girlinspace.com:25813/data');
  }
}
