import { Component, Input, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { animation, style, animate, useAnimation, trigger, transition, keyframes, AnimationBuilder } from '@angular/animations';

const maxArc : number = 63.75;

@Component({
  selector: 'basic-gauge',
  templateUrl: './basicgauge.component.html',
  styleUrls: ['./basicgauge.component.scss']
})
export class GaugeComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() value : string = '';
  @Input() unit : string = '';
  @Input() title : string = '';

  @Input() minRange : string = '';
  @Input() maxRange : string = '';

  @Input() color : string = '#09F';
  @Input() decimals : string = '0';

  public dashArray : string = '0, ' + maxArc;
  public valueFormatted : string = '';

  constructor(private animationBuilder : AnimationBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.UpdateDisplay();
  }

  ngOnInit(): void {
  }
  ngAfterViewChecked(): void {
    this.UpdateDisplay();
  }

  @ViewChild("wxcircle") imageContainerElement!: ElementRef;

  private UpdateDisplay() : void {
    var valNum = +this.value;
    var minNum = +this.minRange;
    var maxNum = +this.maxRange;

    var perc = (valNum - minNum) / (maxNum - minNum);

    var arc = maxArc * perc;

    this.dashArray = arc + ", " + maxArc;

    // Format the number
    
    var deciNum = +this.decimals;
    var factor = Math.pow(10, deciNum);
    var valRounded = Math.round(valNum * factor) / factor;

    this.valueFormatted = valRounded.toFixed(deciNum);

    let animationFactory = this.animationBuilder.build([
      style('*'),
      animate('500ms', style({'stroke-dasharray': arc + ", " + maxArc}))
    ]);

    //animationFactory.create(this.imageContainerElement.nativeElement).play();
  }
}
