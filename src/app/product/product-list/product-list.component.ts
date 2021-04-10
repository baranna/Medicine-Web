import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { PageRequest } from '../../core/model/PageRequest';
import { PageResponse } from '../../core/model/PageResponse';
import { Product } from '../model/Product';
import { ProductFilter } from '../model/ProductFilter';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: [ './product-list.component.scss' ],
})
export class ProductListComponent implements AfterViewInit {

    dataSource = new MatTableDataSource<Product>([]);
    displayedColumns = [ 'name', 'activeIngredient', 'forms', 'strength' ];
    page: PageResponse<Product> = { pageSize: 15, page: 0, result: [], totalCount: 0 };
    filterForm = new FormGroup<ProductFilter>({
        name: new FormControl<string>(''),
        activeIngredient: new FormControl<string>(''),
    });

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private readonly productService: ProductService,
    ) {
    }

    ngAfterViewInit() {
        combineLatest([
            this.filterForm.value$,
            this.paginator.page.pipe(startWith({pageIndex: 0, pageSize: 15}))
        ]).pipe(
                distinctUntilChanged(),
                debounceTime(200),
                map(([filter, page]) => ([filter, ({pageSize: page.pageSize, page: page.pageIndex})])),
                switchMap(([ filter, pageReq ]) => this.productService.getProducts(filter as ProductFilter, pageReq as PageRequest)),
                tap(res => {
                    this.dataSource.data = res.result;
                    this.page = res;
                }),
            ).subscribe();
    }
}
