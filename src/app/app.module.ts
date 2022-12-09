import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import {DecimalPipe} from '@angular/common'
import {DatePipe} from '@angular/common';
import { LocalDatePipe } from './common/pipes/local-date.pipe'
import { NzInputModule } from 'ng-zorro-antd/input';
import { InputMaskModule } from '@ngneat/input-mask';
import { HttpClientModule } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    AppComponent,
    LocalDatePipe
  ],
  imports: [
    InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
    DecimalPipe,
    DatePipe,
    BrowserModule,
    AppRoutingModule,
    NzPageHeaderModule,
    NzCheckboxModule,
    NzInputModule,
    FormsModule,
    HttpClientModule,
    NzIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
