import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private products: ProductResponseModel[] = [];
  private SERVER_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  getSingleOrder(orderId: number){
    return this.http.get<ProductResponseModel[]>(this.SERVER_URL + '/orders/' + orderId).toPromise();
  }

}

interface ProductResponseModel {
  id: number;
  title: string;
  description: string;
  price: number;
  quantityOrdered: number;
  image: string;
}
