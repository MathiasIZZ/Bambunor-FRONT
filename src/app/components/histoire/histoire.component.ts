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
        start: 'top 10%',
        onEnter: () => {
          gsap.to('body', {backgroundColor: '#D8DAD3'});
          gsap.to('h1', {color: '#1f2833'});
          gsap.to('h2', {color: '#1f2833'});
          gsap.to('p', {color: '#1f2833'});
        },
        onLeaveBack: () => {
          gsap.to('body', {backgroundColor: '#1f2833'});
          gsap.to('h1', {color: '#D8DAD3'});
          gsap.to('h2', {color: '#D8DAD3'});
          gsap.to('p', {color: '#D8DAD3'});
        },
        markers: true
      });

    });



  }
}
