import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AuthInterceptor } from '../auth.interceptor';
import { SymptomsListComponent } from './symptoms-list/symptoms-list.component';
import { SymptomsRoutingModule } from './symptoms-routing.module';

@NgModule({
    declarations: [ SymptomsListComponent ],
    imports: [
        CommonModule,
        SymptomsRoutingModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatButtonModule,
    ],
})
export class SymptomsModule {
}
