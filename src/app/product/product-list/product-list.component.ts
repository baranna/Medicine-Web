import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { PageRequest } from '../../core/model/PageRequest';
import { PageResponse } from '../../core/model/PageResponse';
import { SymptomsService } from '../../symptoms/symptoms.service';
import { Product } from '../model/Product';
import { ProductFilter } from '../model/ProductFilter';
import { SideEffectDetails } from '../model/SideEffectDetails';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: [ './product-list.component.scss' ],
})
export class ProductListComponent implements AfterViewInit {

    dataSource = new MatTableDataSource<Product>([]);
    displayedColumns = [ 'name', 'activeIngredient', 'forms', 'strength', 'sideEffectButton' ];
    page: PageResponse<Product> = { pageSize: 15, page: 0, result: [], totalCount: 0 };
    filterForm = new FormGroup<ProductFilter>({
        name: new FormControl<string>(''),
        activeIngredient: new FormControl<string>(''),
    });
    productId: number;
    sideEffect: SideEffectDetails;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private readonly productService: ProductService,
        private readonly dialog: MatDialog,
        private readonly symptomsService: SymptomsService,
        private readonly route: ActivatedRoute,
    ) {
        this.route.params.subscribe(params => {
            if (params.id) {
                this.productId = params.id;
            }
        });
    }

    public ngAfterViewInit(): void {
        combineLatest([
            this.filterForm.value$,
            this.paginator.page.pipe(startWith({ pageIndex: 0, pageSize: 15 })),
        ]).pipe(
            distinctUntilChanged(),
            debounceTime(200),
            map(([ filter, page ]) => ([ filter, ({ pageSize: page.pageSize, page: page.pageIndex }) ])),
            switchMap(([ filter, pageReq ]) => this.getApiCall(filter as ProductFilter, pageReq as PageRequest)),
            tap( res => {
                // @ts-ignore
                if (res.id) {
                    // @ts-ignore
                    this.sideEffect = res;
                    // @ts-ignore
                    this.dataSource.data = res.products.result;
                    // @ts-ignore
                    this.page = res.products;
                } else {
                    // @ts-ignore
                    this.dataSource.data = res.result;
                    // @ts-ignore
                    this.page = res;
                }
            }),
        ).subscribe();
    }

    openDetails(id: string): void {
        this.symptomsService.getSymptomsByProductId(id).subscribe(
            symptoms => {
                const dialogRef = this.dialog.open(ProductItemComponent);
                dialogRef.componentInstance.sideEffects = symptoms;
            });
    }

    getApiCall(filter: ProductFilter, pageReq: PageRequest) {
        if (this.productId) {
            return this.productService.getProductsForSideEffect(this.productId, pageReq as PageRequest);
        }
        return this.productService.getProducts(filter as ProductFilter, pageReq as PageRequest);
    }
}
