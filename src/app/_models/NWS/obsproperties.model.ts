import { CloudLayer } from "./cloudlayer.model";
import { PresentWeather } from "./presentweather.model";
import { ValueUnit } from "./valueunit.model";

export class NWSObservationProperties {
    timestamp : Date;
    rawMessage : string;
    textDescription : string;

    presentWeather : PresentWeather[];
    temperature : ValueUnit;
    dewpoint : ValueUnit;
    windDirection : ValueUnit;
    windSpeed : ValueUnit;
    windGust : ValueUnit;
    barometricPressure : ValueUnit;
    seaLevelPressure : ValueUnit;
    visibility : ValueUnit;
    maxTemperatureLast24Hours : ValueUnit;
    minTemperatureLast24Hours : ValueUnit;
    precipitationLastHour : ValueUnit;
    precipitationLast3Hours : ValueUnit;
    precipitationLast6Hours : ValueUnit;
    relativeHumidity : ValueUnit;
    windChill : ValueUnit;
    heatIndex : ValueUnit;
    cloudLayers : CloudLayer[];

    constructor() {
        this.timestamp = new Date();
        this.rawMessage = "";
        this.textDescription = "";

        this.presentWeather = [];
        this.temperature = new ValueUnit();
        this.dewpoint = new ValueUnit();
        this.windDirection = new ValueUnit();
        this.windSpeed = new ValueUnit();
        this.windGust = new ValueUnit();
        this.barometricPressure = new ValueUnit();
        this.seaLevelPressure = new ValueUnit();
        this.visibility = new ValueUnit();
        this.maxTemperatureLast24Hours = new ValueUnit();
        this.minTemperatureLast24Hours = new ValueUnit();
        this.precipitationLastHour = new ValueUnit();
        this.precipitationLast3Hours = new ValueUnit();
        this.precipitationLast6Hours = new ValueUnit();
        this.relativeHumidity = new ValueUnit();
        this.windChill = new ValueUnit();
        this.heatIndex = new ValueUnit();
        this.cloudLayers = [];
    }
}