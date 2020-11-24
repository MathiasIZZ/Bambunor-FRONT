import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {CartService} from '../../services/cart.service';
import {CartModelServer} from '../../models/cart.model';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartData: CartModelServer;
  cartTotal: number;

  constructor(private router: Router,
              private orderService: OrderService,
              private cartService: CartService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe( data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);

  }
/*
  onCheckOut(){
    this.spinner.show().then( p => {
      this.cartService.checkOutFromCart(2);
    });
  }*/

  onCheckOut() {

    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
    setTimeout( () => {
      this.cartService.checkOutFromCart(2);
    }, 5000);

  }





}
