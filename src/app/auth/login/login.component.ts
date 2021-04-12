import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ],
})
export class LoginComponent {

    public form = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
    ) {
    }

    public login(): void {
        this.authService.login(this.form.value.username, this.form.value.password).subscribe(
            (res) => {
                this.authService.saveToken(res.accessToken);
                this.router.navigateByUrl('');
            });
    }
}
