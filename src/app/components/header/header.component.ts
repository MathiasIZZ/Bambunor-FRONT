import { Component, OnInit } from '@angular/core';
import {CartModelServer} from '../../models/cart.model';
import {CartService} from '../../services/cart.service';
import {UserService} from '../../services/user.service';

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

    console.log(card.style.visibility);





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
