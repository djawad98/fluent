import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {DecimalPipe} from '@angular/common'
import {DatePipe} from '@angular/common';
import { LocalDatePipe } from './common/pipes/local-date.pipe'
import { NzInputModule } from 'ng-zorro-antd/input';
import { HttpClientModule } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
@NgModule({
  declarations: [
    AppComponent,
    LocalDatePipe,
    ListComponent,
    FormComponent
  ],
  imports: [
    DecimalPipe,
    DatePipe,
    BrowserModule,
    AppRoutingModule,
    NzPageHeaderModule,
    NzCheckboxModule,
    NzInputModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzSwitchModule,
    NzIconModule,
    NzFormModule,
    NzDatePickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
