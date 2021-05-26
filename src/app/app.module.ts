import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TimeDayService, WXStationService, NWSService } from './_services/services';
import { GaugeComponent, WindGaugeComponent } from './_components/Gauge/gauges';
import { MiscellaneousStatisticComponent } from './_components/miscellaneous-statistic/miscellaneous-statistic.component';
import { TimeAgoPipe } from './_pipes/timeagopipe';

@NgModule({
  declarations: [
    // Components
    AppComponent,
    GaugeComponent,
    WindGaugeComponent,
    MiscellaneousStatisticComponent,
    
    // Pipes
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    TimeDayService,
    WXStationService,
    NWSService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
