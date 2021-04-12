import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [ ToolbarComponent, SideMenuComponent, HomeComponent, FooterComponent ],
    exports: [
        ToolbarComponent,
        SideMenuComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatSidenavModule,
        RouterModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
    ],
})
export class SharedModule { }
