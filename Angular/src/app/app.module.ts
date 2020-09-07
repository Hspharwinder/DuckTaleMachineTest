import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { MutifilterPipe } from './filters/mutifilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    HomeComponent,
    AddComponent,
    MutifilterPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
