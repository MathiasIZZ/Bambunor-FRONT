import { Component, OnInit } from '@angular/core';
import { gsap, TimelineMax, TweenMax, Elastic } from 'gsap';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



gsap.registerPlugin(TimelineMax, TweenMax, Elastic);



@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  TL = new TimelineMax({paused: true});


  constructor() { }

  ngOnInit(): void {

    setTimeout( () => {
      this.chargementSpinner();
    }, 2000);

    this.createAnim();
    this.anim1();

  }

  chargementSpinner() {
    const loader = document.querySelector('.loader');

      loader.classList.add('fondu-out');

  }

  // chargementSpinner() {
  //     const loader = document.querySelector('.loader');
  //
  //     window.addEventListener('load', () => {
  //         loader.classList.add('fondu-out');
  //     });
  //   }



  createAnim() {
    const titre = document.querySelectorAll('h2');
    this.TL.from(titre[0], 1, {y: -100, opacity: 0}).from(titre[1], 2, {y: -100, opacity: 0});
    this.TL.play();
  }

  anim1() {
    gsap.to('.monBouton2', {
      duration: 3,
      scale: 1,
      y: 25,
      ease: 'elastic(15, 0.3)'
    });


  }




}
