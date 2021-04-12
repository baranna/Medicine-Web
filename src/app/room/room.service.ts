import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageRes } from './model/MessageRes';
import { MessageRoot } from './model/MessageRoot';
import { RoomDetailsRes } from './model/RoomDetailsRes';
import { RoomRes } from './model/RoomRes';
import MessageResult = jasmine.MessageResult;

@Injectable({
    providedIn: 'root',
})
export class RoomService {

    constructor(private readonly http: HttpClient) {
    }

    getRooms(): Observable<RoomRes> {
        return this.http.get<RoomRes>('/behealthy-api/api/listRooms');
    }


    getMessages(roomId: string): Observable<RoomDetailsRes> {
        return this.http.get<RoomDetailsRes>('/behealthy-api/api/listMessages/' + roomId);
    }

    getMessage(messageId: string): Observable<MessageRoot> {
        return this.http.get<MessageRoot>('/behealthy-api/api/findMessage/' + messageId);
    }
}
