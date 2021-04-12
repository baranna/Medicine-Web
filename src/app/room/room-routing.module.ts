import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
    { path: '', component: RoomListComponent, pathMatch: 'full' },
    { path: ':id', component: RoomComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
