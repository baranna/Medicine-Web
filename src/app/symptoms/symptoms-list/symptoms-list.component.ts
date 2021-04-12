import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { PageRequest } from '../../core/model/PageRequest';
import { PageResponse } from '../../core/model/PageResponse';
import { Symptom } from '../../product/model/Symptom';
import { SymptomFilter } from '../../product/model/SymptomFilter';
import { SymptomsService } from '../symptoms.service';

@Component({
    selector: 'app-symptoms-list',
    templateUrl: './symptoms-list.component.html',
    styleUrls: [ './symptoms-list.component.scss' ],
})
export class SymptomsListComponent implements AfterViewInit {
    dataSource = new MatTableDataSource<Symptom>([]);
    displayedColumns = [ 'name', 'activeIngredientCount' ];
    page: PageResponse<Symptom> = { pageSize: 15, page: 0, result: [], totalCount: 0 };
    filterForm = new FormGroup<SymptomFilter>({
        name: new FormControl<string>(''),
    });

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private readonly symptomsService: SymptomsService, private readonly router: Router) {
    }

    ngAfterViewInit(): void {
        combineLatest([
            this.filterForm.value$,
            this.paginator.page.pipe(startWith({ pageIndex: 0, pageSize: 15 })),
        ]).pipe(
            distinctUntilChanged(),
            debounceTime(200),
            map(([ filter, page ]) => ([ filter, ({ pageSize: page.pageSize, page: page.pageIndex }) ])),
            switchMap(([ filter, pageReq ]) => this.symptomsService.getSymptoms(filter as SymptomFilter, pageReq as PageRequest)),
            tap(res => {
                this.dataSource.data = res.result;
                this.page = res;
            }),
        ).subscribe();
    }

    public showProducts(id: string): void {
        this.router.navigate(['products', id]);
    }
}
