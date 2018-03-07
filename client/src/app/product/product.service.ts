import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Product } from "./product.model";
import { Observable } from "rxjs/Observable";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    getProducts() {
        return this.http.get<Product[]>('http://localhost:8080/product')
    }

    addProduct(product: Product): Observable<any> {
        const body = JSON.stringify(product);
        return this.http.post<Product>('http://localhost:8080/product', body, httpOptions)
    }

    updateProduct(product: Product): Observable<any> {
        const body = JSON.stringify(product);
        return this.http.put<Product>('http://localhost:8080/product/', body, httpOptions)
    }
    
    deleteProduct(id): Observable<any> {
        return this.http.delete<Product>('http://localhost:8080/product/' + id)
    }
}