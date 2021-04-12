import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SymptomsListComponent } from './symptoms-list/symptoms-list.component';

const routes: Routes = [
    { path: '', component: SymptomsListComponent },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class SymptomsRoutingModule {
}
