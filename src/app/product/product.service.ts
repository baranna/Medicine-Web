import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageRequest } from '../core/model/PageRequest';
import { PageResponse } from '../core/model/PageResponse';
import { Product } from './model/Product';
import { ProductFilter } from './model/ProductFilter';

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    constructor(private readonly http: HttpClient) {
    }

    getProducts(filter: ProductFilter, pageRequest: PageRequest): Observable<PageResponse<Product>> {
        return this.http.get<PageResponse<Product>>('/medicine-api/Drug',
            { params: { ...pageRequest, ...filter } as any });
    }
}
