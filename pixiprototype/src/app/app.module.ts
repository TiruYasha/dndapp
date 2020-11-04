import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FogOfWarOptionsComponent } from './main/options/fog-of-war-options/fog-of-war-options.component';
import { DrawShapeOptionsComponent } from './main/options/draw-shape-options/draw-shape-options.component';
import { MapComponent } from './main/map/map.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FogOfWarOptionsComponent,
    DrawShapeOptionsComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
