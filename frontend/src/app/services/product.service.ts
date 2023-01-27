import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ProductModelServer, serverResponse} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.serverURL;

  constructor(private http: HttpClient) {
  }

  getAllProducts(limitOfResults=10): Observable<serverResponse> {
    return this.http.get<serverResponse>(this.url + 'products', {
      params: {
        limit: limitOfResults.toString()
      }
    });
  }

  getSingleProduct(id: Number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.url + 'products/' + id);
  }

  getSingleProductIme(ime: String): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.url + 'products/' + ime);
  }

  getProductsFromCategory(catName: String): Observable<serverResponse> {
    return this.http.get<serverResponse>(this.url + 'products/category/' + catName);
  }

  createProduct(data: any){
    return this.http.post(`${this.url}products/create`, data);
  }

  deleteProduct(id: any){
    return this.http.delete(`${this.url}products/` + id);
  }

  updateProduct(data:any, id:any){
    return this.http.put(`${this.url}products/proizvod/` + id, data);
  }

}
