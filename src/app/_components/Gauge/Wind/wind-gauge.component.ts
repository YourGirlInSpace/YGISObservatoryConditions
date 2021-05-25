import { Component, Input, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { animation, style, animate, useAnimation, trigger, transition, keyframes, AnimationBuilder } from '@angular/animations';

const maxArc : number = 63.75;

@Component({
  selector: 'wind-gauge',
  templateUrl: './wind-gauge.component.html',
  styleUrls: ['./wind-gauge.component.scss']
})
export class WindGaugeComponent implements OnInit, OnChanges {
  @Input() value : string = '';
  @Input() unit : string = '';
  @Input() title : string = '';

  @Input() minRange : string = '';
  @Input() maxRange : string = '';

  @Input() direction : string = '';

  @Input() color : string = '#09F';
  @Input() decimals : string = '0';

  public dashArray : string = '0, ' + maxArc;
  public valueFormatted : string = '0.0';
  public directionString : string = 'E';

  private lastDir : number = 0;

  constructor(private animationBuilder : AnimationBuilder) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.updateDisplay();
  }

  ngOnInit(): void {
    this.updateDisplay();
  }

  private updateDisplay() : void {
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

    this.updateArrow();
  }

  @ViewChild("wxarrow") imageContainerElement!: ElementRef;
  
  private updateArrow() : void {
    var lastDirAdj = +this.lastDir - 90;
    var dirAdj = +this.direction - 90;

    if (dirAdj > (lastDirAdj + 180))
      lastDirAdj += 360;
    else if (dirAdj < (lastDirAdj - 180))
      lastDirAdj -= 360;

    let animationFactory = this.animationBuilder.build([
      style('*'),
      animate('1500ms ease-in-out', style({transform: 'rotate(' + dirAdj + 'deg)'}))
    ]);

    animationFactory.create(this.imageContainerElement.nativeElement).play();
    
    this.directionString = this.GetDirection(dirAdj + 90);
  }

  private directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  private GetDirection(heading: number) : string {
    var index = Math.round((heading/8)/5.625);

    if (index == 8)
      index = 0;
    return this.directions[index]
  }
}
