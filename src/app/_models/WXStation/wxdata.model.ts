export class WXData {
    time! : Date;
    recno! : number;
    wspd! : number;
    wdir! : number;
    wgst! : number;
    rad! : number;
    prs! : number;
    rain! : number;
    tmp! : number;
    rh! : number;

    constructor() {
        this.time = new Date();
        this.recno = 0;
        this.wspd = 0;
        this.wdir = 0;
        this.wgst = 0;
        this.rad = 0;
        this.prs = 0;
        this.rain = 0;
        this.tmp = 0;
        this.rh = 0;
    }
}