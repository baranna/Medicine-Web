import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../model/Room';
import { RoomService } from '../room.service';

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: [ './room-list.component.scss' ],
})
export class RoomListComponent implements OnInit {

    rooms: Room[];

    constructor(
        private readonly roomService: RoomService,
        private readonly router: Router,
    ) {
    }

    ngOnInit(): void {
        this.roomService.getRooms().subscribe(r => this.rooms = r.data.rooms);
    }

    navigateToRoom(id: string) {
        this.router.navigate([ 'rooms', id ]);
    }

}
