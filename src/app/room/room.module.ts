import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { RoomRoutingModule } from './room-routing.module';
import { RoomListComponent } from './room-list/room-list.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { RoomComponent } from './room/room.component';


@NgModule({
  declarations: [RoomListComponent, AddRoomComponent, RoomComponent],
    imports: [
        CommonModule,
        RoomRoutingModule,
        MatCardModule,
        MatListModule,
    ],
})
export class RoomModule { }
