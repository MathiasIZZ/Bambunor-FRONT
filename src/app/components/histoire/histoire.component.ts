import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';



@Component({
  selector: 'app-histoire',
  templateUrl: './histoire.component.html',
  styleUrls: ['./histoire.component.scss']
})
export class HistoireComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


    gsap.utils.toArray('.galaxy').forEach( (elem) => {

      ScrollTrigger.create({
        trigger: 'h1',
        start: 'top 20%',
        onEnter: () => {
          gsap.to('body', {backgroundColor: '#ffeecf'});
          gsap.to('h1', {color: '#1E1F29'});
          gsap.to('h2', {color: '#1E1F29'});
          gsap.to('p', {color: '#1E1F29'});
        },
        onLeaveBack: () => {
          gsap.to('body', {backgroundColor: '#1E1F29'});
          gsap.to('h1', {color: '#ffeecf'});
          gsap.to('h2', {color: '#ffeecf'});
          gsap.to('p', {color: '#ffeecf'});
        },
        markers: true
      });

    });
  }

}
