import { Component, OnInit } from '@angular/core';
import {CartModelServer} from '../../models/cart.model';
import {CartService} from '../../services/cart.service';
import {UserService} from '../../services/user.service';
import * as $ from 'jquery';





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartData: CartModelServer;
  cartTotal: number;

  // Auth
  authState: boolean;

  constructor(private cartService: CartService, private userService: UserService) { }

  ngOnInit(): void {

    this.cartService.cartTotal$.subscribe( total => this.cartTotal = total);

    this.cartService.cartData$.subscribe( data => this.cartData = data);

    this.userService.authState$.subscribe( authState => this.authState = authState);

    const cart = document.getElementById('dropdown');

    const card = document.getElementById('droppy');


    let lastScrollTop = 0;



/*
    $(window).scroll( function (event){
      const st = $(this).scrollTop();
      if (st > lastScrollTop) {
        $('.arene').toggleClass('disparition', $(this).scrollTop() > 60);
      }
      else {
        $('.arene').removeClass('disparition', $(this).scrollTop() > 60);
      }
      lastScrollTop = st;
    });
*/

/*
    $(window).scroll( function(event) {

      $('.arene').toggleClass('disparition', $(this).scrollTop() > 60);
      $('.arene').toggleClass('fond', $(this).scrollTop() > 600);

    });

*/
    const activation = document.getElementById('active-nav');

    activation.addEventListener('click', () => {
      const nav = document.getElementById('navigation');
      if (nav.style.display === 'none') {
        nav.style.display = 'block';
      } else {
        nav.style.display = 'none';
      }
    });

    const fermeture = document.getElementById('close');

    fermeture.addEventListener('click', () => {
      const nav = document.getElementById('navigation');
      nav.style.display = 'none';
    });

    cart.addEventListener('click', () => {
      if (card.style.visibility === 'visible') {
        card.style.visibility = 'hidden';
      }
      else {
        card.style.visibility = 'visible';
      }
    });

  }








}
