import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Message } from '../model/Message';
import { RoomService } from '../room.service';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: [ './room.component.scss' ],
})
export class RoomComponent implements OnInit {

    roomId: string;
    messages: Message[] = [];

    constructor(
        private readonly route: ActivatedRoute,
        private readonly roomService: RoomService,
    ) {
        this.route.params.subscribe(params => this.roomId = params.id);
    }

    ngOnInit(): void {
        this.roomService.getMessages(this.roomId).pipe(
            switchMap((data) => combineLatest(
                data.data.messages.map(m => this.roomService.getMessage(m)),
            )),
        ).subscribe(res => {
            res.forEach(r => this.messages.push(r.data.result));
        });
    }

}
