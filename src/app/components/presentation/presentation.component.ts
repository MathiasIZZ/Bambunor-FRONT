import { Component, OnInit } from '@angular/core';
import {gsap, TimelineMax} from 'gsap';



gsap.registerPlugin(TimelineMax);

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
  }


  // tslint:disable-next-line:typedef
  createAnim() {
    const titre = document.querySelectorAll('.anime');
    this.TL.from(titre[0], 3, {y: -100, opacity: 0});
    this.TL.play();
  }

}
