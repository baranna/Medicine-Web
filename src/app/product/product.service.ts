import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageRequest } from '../core/model/PageRequest';
import { PageResponse } from '../core/model/PageResponse';
import { Product } from './model/Product';
import { ProductFilter } from './model/ProductFilter';
import { SideEffectDetails } from './model/SideEffectDetails';

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

    getProductsForSideEffect(id: number, pageRequest: PageRequest): Observable<SideEffectDetails> {
        return this.http.get<SideEffectDetails>('/medicine-api/SideEffect/' + id,
            { params: pageRequest as any });
    }
}
