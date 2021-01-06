import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {ServerResponse} from '../../models/product.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: any[] = [];

  constructor(private productService: ProductService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts(4).subscribe( (prods: ServerResponse) => {
      this.products = prods.products;
      console.log(this.products);
    });
  }


  selectProduct(id: number){
    this.router.navigate(['/product', id]).then();
  }

  // tslint:disable-next-line:typedef
  addToCart(id: number){
    this.cartService.addProductToCart(id);
  }





}
