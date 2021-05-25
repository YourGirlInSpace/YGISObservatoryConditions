import { CloudLayer } from "./cloudlayer.model";
import { PresentWeather } from "./presentweather.model";
import { ValueUnit } from "./valueunit.model";

export class NWSObservationProperties {
    timestamp! : Date;
    rawMessage! : string;
    textDescription! : string;

    presentWeather! : PresentWeather[];
    temperature! : ValueUnit;
    dewpoint! : ValueUnit;
    windDirection! : ValueUnit;
    windSpeed! : ValueUnit;
    windGust! : ValueUnit;
    barometricPressure! : ValueUnit;
    seaLevelPressure! : ValueUnit;
    visibility! : ValueUnit;
    maxTemperatureLast24Hours! : ValueUnit;
    minTemperatureLast24Hours! : ValueUnit;
    precipitationLastHour! : ValueUnit;
    precipitationLast3Hours! : ValueUnit;
    precipitationLast6Hours! : ValueUnit;
    relativeHumidity! : ValueUnit;
    windChill! : ValueUnit;
    heatIndex! : ValueUnit;
    cloudLayers! : CloudLayer[];
}