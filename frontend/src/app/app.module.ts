import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
