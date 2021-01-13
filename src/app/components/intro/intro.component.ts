import { Component, OnInit } from '@angular/core';
import { gsap, TimelineMax } from 'gsap';


gsap.registerPlugin(TimelineMax);



@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  TL = new TimelineMax({paused: true});

  constructor() { }

  ngOnInit(): void {

    this.createAnim();
  }



  createAnim() {

    const titre = document.querySelectorAll('h2');

    this.TL.from(titre[0], 1, {y: -100, opacity: 0}).from(titre[1], 2, {y: -100, opacity: 0});
    this.TL.play();
  }




}
