import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from './product.service';
import {OrderService} from './order.service';
import {environment} from '../../environments/environment';
import {CartModelPublic, CartModelServer} from '../models/cart.model';
import {BehaviorSubject} from 'rxjs';
import {NavigationExtras, Router} from '@angular/router';
import {ProductModelServer} from '../models/product.model';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private SERVER_URL = 'http://localhost:3000/api';

  /*  VARIABLE DE DONNEES POUR STOCKER LES INFORMATIONS DU PANIER SUR LE LOCAL STORAGE DU NAVIGATEUR DE L'UTILISATEUR  */
  private cartDataClient: CartModelPublic = {
    total: 0,
    prodData: [{
      inCart: 0,
      id: 0
    }]
  };

  /* VARIABLE DE DONNEES POUR STOCKER LES INFORMATIONS DU PANIER SUR LE SERVEUR DIRECT */

  private cartDataServer: CartModelServer = {
    total: 0,
    data: [{
      numInCart: 0,
      product: undefined
    }]
  };

  /*  LES OBSERVABLES FOR THE COMPONENTS TO SUBSCRIBE  */

  cartTotal$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);


  constructor(private http: HttpClient, private productService: ProductService, private orderService: OrderService, private router: Router, private toast: ToastrService, private spinner: NgxSpinnerService) {

    this.cartTotal$.next(this.cartDataServer.total);
    this.cartData$.next(this.cartDataServer);

    /* GET THE INFORMATION FROM LOCAL STORAGE ( IF ANY) */

    const info: CartModelPublic = JSON.parse(localStorage.getItem('cart'));

    /* CHECK IF THE INFO VARIABLE IS NULL OR HAS SOME DATA IN IT */

    if (info !== null && info !== undefined && info.prodData[0].inCart !== 0) {

      /* LOCAL STORAGE IS NOT EMPTY AND HAS SOME INFORMATIONS */
      this.cartDataClient = info;

      /* LOOP THROUGH EACH ENTRY AND PUT IT IN THE CartDataServer Object */
      this.cartDataClient.prodData.forEach( p => {
        this.productService.getSingleProduct(p.id).subscribe( (actualProductInfo: ProductModelServer) => {
          if (this.cartDataServer.data[0].numInCart === 0) {
            this.cartDataServer.data[0].numInCart = p.inCart;
            this.cartDataServer.data[0].product = actualProductInfo;
            this.calculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          } else {
            // cartDataServer already has some entry in it
            this.cartDataServer.data.push({
              numInCart: p.inCart,
              product: actualProductInfo
            });
            this.calculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartData$.next( {... this.cartDataServer});
        });
      });
    }
  }

  // tslint:disable-next-line:typedef
  addProductToCart(id: number, quantity?: number) {

    this.productService.getSingleProduct(id).subscribe( prod => {
      // 1. if the cart is empty
      if (this.cartDataServer.data[0].product === undefined) {
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
        //   calculate total amount cartDataServer.total
        this.calculateTotal();


        this.cartDataClient.prodData[0].inCart = this.cartDataServer.data[0].numInCart;
        this.cartDataClient.prodData[0].id = prod.id;

        this.cartDataClient.total = this.cartDataServer.total;

        // on remplit le local storage
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartData$.next( { ... this.cartDataServer});

        this.toast.success(`${prod.name} vient d'arriver dans votre panier =) `, 'Produit ajouté', {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });

      }
      // 2. if the cart has some items
      else {
        const index = this.cartDataServer.data.findIndex( p => p.product.id === prod.id); // -1 or a positive value

        //    a. if that item is already in the cart
        if (index !== -1) {
          if (quantity !== undefined && quantity <= prod.quantity) {
            // tslint:disable-next-line:max-line-length
            this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.quantity ? quantity : prod.quantity;
          } else {
            // tslint:disable-next-line:no-unused-expression
            this.cartDataServer.data[index].numInCart < prod.quantity ? this.cartDataServer.data[index].numInCart++  : prod.quantity;

          }

          this.cartDataClient.prodData[index].inCart = this.cartDataServer.data[index].numInCart;
          this.calculateTotal();

          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          console.log('big');
          this.toast.info(`${prod.name} quantité modifiée dans votre panier =) `, 'Produit modifié', {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });

        }
        //    b. if that item is not in the cart
        else {
          this.cartDataServer.data.push({
            numInCart: 1,
            product: prod
          });

          this.cartDataClient.prodData.push({
            inCart: 1,
            id: prod.id
          });


          this.toast.success(`${prod.name} vient d'arriver dans votre panier =) `, 'Produit ajouté', {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });

          this.calculateTotal();
          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          this.cartData$.next({ ... this.cartDataServer});
        } // end of else
      }
    });
  }

  updateCartItems(index: number, increase: boolean) {
    const data = this.cartDataServer.data[index];

    if (increase) {

      data.numInCart < data.product.quantity ? data.numInCart++ : data.product.quantity;

      console.log(data);
      console.log(data.product);
      console.log(data.product.quantity);
      this.cartDataClient.prodData[index].inCart = data.numInCart;
      this.calculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartData$.next({ ... this.cartDataServer});
    } else {
      data.numInCart--;

      if (data.numInCart < 1 ) {
        this.deleteProductFormCart(index);
        this.cartData$.next({...this.cartDataServer});
      } else {
        this.cartData$.next({ ... this.cartDataServer});
        this.cartDataClient.prodData[index].inCart = data.numInCart;
        this.calculateTotal();

        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
    }
  }

  deleteProductFormCart(index: number) {

    if (window.confirm('Êtes vous certain de vouloir supprimer cet objet ?')) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);

      this.calculateTotal(); // REMET A ZERO SI LE PRODUIT EST RETIRE DU PANIER
      this.cartDataClient.total = this.cartDataServer.total;

      if (this.cartDataClient.total === 0) {
        this.cartDataClient = {
          total: 0,
          prodData: [{
            inCart: 0,
            id: 0
          }]
        };
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

      if (this.cartDataServer.total === 0) {
        this.cartDataServer = {
          total: 0,
          data: [{
            numInCart: 0,
            product: undefined
          }]
        };
        this.cartData$.next({...this.cartDataServer});
      } else {
        this.cartData$.next({...this.cartDataServer});
      }


    } else {
      //  IF THE USER CLICKS THE CANCEL BUTTON
      return;
    }
  }


  // tslint:disable-next-line:typedef
  private calculateTotal(){

    let total = 0;
    this.cartDataServer.data.forEach( p => {
      const { numInCart } = p;
      const { price } = p.product;
      // @ts-ignore
      total += numInCart * price;
    });
    this.cartDataServer.total = total;
    this.cartTotal$.next(this.cartDataServer.total);
  }


  checkOutFromCart(userId: number) {

    this.http.post( `${ this.SERVER_URL}/orders/payment`, null).subscribe( ( res: { success: boolean } ) => {

      if (res.success) {
        this.resetServerData();
        this.http.post( `${this.SERVER_URL}/orders/new`, {
          userId,
          products: this.cartDataClient.prodData
        }).subscribe( (data: OrderResponse ) => {

          this.orderService.getSingleOrder(data.order_id).then( prods => {

            if (data.success) {
              const navigationExtras: NavigationExtras = {
                state: {
                  message: data.message,
                  products: prods,
                  orderId: data.order_id,
                  total: this.cartDataClient.total
                }
              };

              //this.spinner.hide();

              this.router.navigate( ['/thankyou'], navigationExtras).then( p => {
                this.cartDataClient = {
                  total: 0,
                  prodData: [{
                    inCart: 0,
                    id: 0
                  }]
                };
                this.cartTotal$.next(0);
                localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              });

            }
          });
        });
      } else {

        //this.spinner.hide();

        this.router.navigateByUrl('/checkout').then();
        this.toast.error(`Nous sommes desolés, nous rencontrons des difficultés..`, 'Statut de la commande', {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    });
  }

  private resetServerData(){
    this.cartDataServer = {
      total: 0,
      data: [{
        numInCart: 0,
        product: undefined
      }]
    };

    this.cartData$.next({ ... this.cartDataServer});
  }

  calculateSubTotal(index): number {
    let subTotal = 0;

    const p = this.cartDataServer.data[index];
    subTotal = p.product.price * p.numInCart;

    return subTotal;
  }

}

interface OrderResponse {
  order_id: number;
  success: boolean;
  message: string;
  products: [{
    id: string,
    numInCart: string
  }];
}

