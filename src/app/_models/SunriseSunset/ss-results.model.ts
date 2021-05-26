import { SunriseSunset } from "./sunrise-sunset.model";

export class SSResults {
    results : SunriseSunset;
    status : string;
    public isOK : boolean;

    constructor() {
        this.results = new SunriseSunset();
        this.status = "";
        this.isOK = false;
    }
}