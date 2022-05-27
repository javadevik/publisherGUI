import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {PublishHttpService} from "./services/publish.http.service";
import {PosteditorHttpService} from "./services/posteditor.http.service";
import { EditorComponent } from './editor/editor.component';
import {RefDirective} from "./ref.directive";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {RouterTestingModule} from "@angular/router/testing";

registerLocaleData(en);

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'publishes/:title',
    component: AppComponent
  },
];


// @ts-ignore
//
@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    RefDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    NzDatePickerModule,
    NzButtonModule,
    NzInputModule,
    NzDropDownModule,
    RouterTestingModule
  ],
  providers: [
    AppComponent,
    EditorComponent,
    PublishHttpService,
    PosteditorHttpService,
    { provide: NZ_I18N, useValue: en_US },
  ],
  entryComponents: [EditorComponent],
  bootstrap: [AppComponent]
})
//@ts-ignore
export class AppModule {}
