import { Component, OnInit } from '@angular/core';
import {TimelineMax, gsap} from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

    gsap.utils.toArray('.backbambou').forEach( (elem) => {

      ScrollTrigger.create({
        trigger: 'h1',
        start: 'top 30%',
        onEnter: () => gsap.to('body', {backgroundColor: '#fff'}),
        onLeaveBack: () => gsap.to('body', {backgroundColor: '#121112'}),
        markers: true
      });

    });
  }



  createAnim() {
    const left = document.getElementById('left');
    const right = document.getElementById('right');
    this.TL.from(left, 2, {y: -100, opacity: 0}).from(right, 2, {y: 100, opacity: 0});
    this.TL.play();
  }

}
