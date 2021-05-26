import { NWSObservationProperties } from "./obsproperties.model";

export class NWSLatestObs
{
    properties : NWSObservationProperties;

    constructor() {
        this.properties = new NWSObservationProperties();
    }
}