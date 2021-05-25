import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'miscstat',
  templateUrl: './miscellaneous-statistic.component.html',
  styleUrls: ['./miscellaneous-statistic.component.scss']
})
export class MiscellaneousStatisticComponent implements OnInit, OnChanges {
  @Input() public imgsrc! : string;
  @Input() public value! : string;
  @Input() public decimals! : string;
  @Input() public unit! : string;
  @Input() public title! : string;
  @Input() public numeric : string = "true";

  public formattedValue! : string;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.UpdateData();
  }

  ngOnInit(): void {
    this.UpdateData();
  }

  private UpdateData() : void {
    if (this.numeric == "true")
    {
      var deciNum = +this.decimals;
      var factor = Math.pow(10, deciNum);
      var valRounded = Math.round(+this.value * factor) / factor;
      
      this.formattedValue = valRounded.toFixed(deciNum);
    } else {
      this.formattedValue = this.value;
    }
  }
}
