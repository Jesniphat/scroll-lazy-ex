import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FactService } from './_service/fact.service';
import { FactScrollerComponent } from './fact-scroller/fact-scroller.component';
import { NgxScrollerComponent } from './ngx-scroller/ngx-scroller.component';


@NgModule({
   declarations: [
      AppComponent,
      FactScrollerComponent,
      NgxScrollerComponent
   ],
   imports: [
      BrowserModule.withServerTransition({ appId: 'serverApp' }),
      HttpClientModule,
      ScrollingModule,
      InfiniteScrollModule
   ],
   providers: [
      FactService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
