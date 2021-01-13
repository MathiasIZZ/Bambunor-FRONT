import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {ProductModelServer} from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  SERVER_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }

  getAllProducts(numberOfResults) {
    return this.http.get(this.SERVER_URL + '/products/home', {
      params: {
        limit: numberOfResults.toString()
      }
    });
  }

  /*  GET SINGLE PRODUCT FROM SERVER  */

  getSingleProduct(id: number): Observable<ProductModelServer>{
    return this.http.get<ProductModelServer>(this.SERVER_URL + '/products/' + id);
  }

  /* GET PRODUCTS FROM ONE CATEGORY */

  GetProductsFromCategory(catName: string): Observable<ProductModelServer>{
    return this.http.get<ProductModelServer>(this.SERVER_URL + '/products/category' + catName);
  }
}
