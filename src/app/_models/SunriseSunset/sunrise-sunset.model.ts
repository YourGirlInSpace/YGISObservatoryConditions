export class SunriseSunset {
    sunrise: Date;
    sunset: Date;
    solar_noon: Date;
    day_length: number;
    civil_twilight_begin: Date;
    civil_twilight_end: Date;
    nautical_twilight_begin: Date;
    nautical_twilight_end: Date;
    astronomical_twilight_begin: Date;
    astronomical_twilight_end: Date;

    constructor() {
        this.sunrise = new Date;
        this.sunset = new Date;
        this.solar_noon = new Date;
        this.day_length = 0;
        this.civil_twilight_begin = new Date;
        this.civil_twilight_end = new Date;
        this.nautical_twilight_begin = new Date;
        this.nautical_twilight_end = new Date;
        this.astronomical_twilight_begin = new Date;
        this.astronomical_twilight_end = new Date;
    }
}