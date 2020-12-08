import {AfterViewInit, Component, OnInit} from '@angular/core';

import {ProductService} from '../../services/product.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map} from 'rxjs/operators';
import {CartService} from '../../services/cart.service';

declare let $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})


export class ProductComponent implements OnInit, AfterViewInit {

  id: any;
  product;
  thumbImages: any[] = [];

  constructor(private cartService: CartService, private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // récupération id du produit dans l'url
    this.id = this.route.snapshot.paramMap.get('id');

    // injection de l'id dans la fct getSingleProduct()
    this.productService.getSingleProduct(this.id).subscribe( prod => {
      this.product = prod;
    });
  }



  ngAfterViewInit(): void {

    $('#product-main-img').slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: '#product-imgs',
    });

    // Product imgs Slick
    $('#product-imgs').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      vertical: true,
      asNavFor: '#product-main-img',
      responsive: [{
        breakpoint: 991,
        settings: {
          vertical: false,
          arrows: false,
          dots: true,
        }
      },
      ]
    });

    // Product img zoom
    var zoomMainProduct = document.getElementById('product-main-img');
    if (zoomMainProduct) {
      $('#product-main-img .product-preview').zoom();
    }


  }

}
