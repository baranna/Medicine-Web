import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from './model/AuthResponse';
import { LoginRes } from './model/LoginRes';
import { RegisterDto } from './model/RegisterDto';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(private readonly http: HttpClient) {
    }

    registerUser(data: RegisterDto): Observable<AuthResponse> {
        return this.http.post<AuthResponse>('/behealthy-api/auth/signup', data);
    }

    login(email: string, password: string): Observable<LoginRes> {
        return this.http.post<LoginRes>('/behealthy-api/auth/signin', { email, password });
    }

    saveToken(token: string): void {
        localStorage.setItem('behealthy_token', token);
    }

    getToken(): string {
        return localStorage.getItem('behealthy_token');
    }
}
