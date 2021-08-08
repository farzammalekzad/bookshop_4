import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import { MainComponent } from './pages/main/main.component';
import { FooterComponent } from './common/footer/footer.component';
import { BooksComponent } from './pages/books/books.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BookdetailComponent } from './pages/bookdetail/bookdetail.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { AdminComponent } from './pages/admin/admin.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LoginComponent } from './pages/login/login.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PanelComponent } from './pages/panel/panel.component';
import { AddCatComponent } from './pages/add-cat/add-cat.component';
import { DeleteComponent } from './pages/delete/delete.component';
import {MatTableModule} from '@angular/material/table';
import {interceptor} from './utils/interceptor';
import {CookieService} from 'ngx-cookie-service';
import { EditComponent } from './pages/edit/edit.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AboutComponent } from './common/about/about.component';
import { SearchComponent } from './common/search/search.component';
import { RequestComponent } from './pages/request/request.component';
import { LogComponent } from './pages/log/log.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    BooksComponent,
    BookdetailComponent,
    AdminComponent,
    LoginComponent,
    PanelComponent,
    AddCatComponent,
    DeleteComponent,
    EditComponent,
    AboutComponent,
    SearchComponent,
    RequestComponent,
    LogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SweetAlert2Module.forRoot(),
        MatToolbarModule,
        MatButtonModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatSliderModule,
        MatFormFieldModule,
        FlexLayoutModule,
        MatIconModule,
        MatSidenavModule,
        HttpClientModule,
        MatMenuModule,
        MatDividerModule,
        ReactiveFormsModule,
        ClipboardModule,
        MatProgressBarModule,
        MatDialogModule,
        MatTableModule

    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: interceptor,
    multi: true
  },
  CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
