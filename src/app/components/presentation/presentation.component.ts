import { Component, OnInit } from '@angular/core';
import {gsap, TimelineMax} from 'gsap';

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';





gsap.registerPlugin(TimelineMax, ScrollTrigger);

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

    TL = new TimelineMax({paused: true });

  constructor() { }

  ngOnInit(): void {
    this.createAnim();

    gsap.utils.toArray('h1').forEach( (elem) => {

      ScrollTrigger.create({
        trigger: 'h1',
        start: 'top 20%',
        onEnter: () => {
          gsap.to('body', {backgroundColor: 'white'});
          gsap.to('h1', {color: '#121112'});
          gsap.to('h2', {color: '#121112'});
        },
        onLeaveBack: () => {
          gsap.to('body', {backgroundColor: '#121112'});
          gsap.to('h1', {color: '#ffeecf'}); // #ffeecf
          gsap.to('h2', {color: '#ffeecf'});
        },
        markers: true
      });

    });
  }


  // tslint:disable-next-line:typedef
  createAnim() {
    const titre = document.querySelectorAll('.anime');
    this.TL.from(titre[0], 5, {y: -100, opacity: 0});
    this.TL.play();
  }

}
