import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageRequest } from '../core/model/PageRequest';
import { PageResponse } from '../core/model/PageResponse';
import { SideEffect } from '../product/model/SideEffect';
import { Symptom } from '../product/model/Symptom';
import { SymptomFilter } from '../product/model/SymptomFilter';

@Injectable({
    providedIn: 'root',
})
export class SymptomsService {

    constructor(private readonly http: HttpClient) {
    }

    getSymptoms(filter: SymptomFilter, pageRequest: PageRequest): Observable<PageResponse<Symptom>> {
        return this.http.get<PageResponse<Symptom>>('/medicine-api/SideEffect',
            { params: { ...pageRequest, ...filter } as any });
    }

    getSymptomsByProductId(id: string): Observable<SideEffect[]> {
        return this.http.get<SideEffect[]>(`/medicine-api/SideEffect/product/${id}`);
    }
}
