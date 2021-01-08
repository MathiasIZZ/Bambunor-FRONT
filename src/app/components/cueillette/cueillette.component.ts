import { Component, OnInit } from '@angular/core';
import {TimelineMax} from 'gsap';

@Component({
  selector: 'app-cueillette',
  templateUrl: './cueillette.component.html',
  styleUrls: ['./cueillette.component.scss']
})
export class CueilletteComponent implements OnInit {

  TL = new TimelineMax({paused: true});
  constructor() { }

  ngOnInit(): void {
    this.createAnim();
  }

  createAnim() {

    const left = document.getElementById('left');
    const right = document.getElementById('right');
    this.TL.from(left, 2, {y: -100, opacity: 0}).from(right, 2, {y: 100, opacity: 0});
    this.TL.play();
  }

}
