import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FogOfWarOptionsComponent } from './main/options/fog-of-war-options/fog-of-war-options.component';
import { DrawShapeOptionsComponent } from './main/options/draw-shape-options/draw-shape-options.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChooseUserComponent } from './mock-components/choose-user/choose-user.component';
import { TokenInterceptor } from './_interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FogOfWarOptionsComponent,
    DrawShapeOptionsComponent,
    ChooseUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
