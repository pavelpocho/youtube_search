import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { IntroScreenComponent } from './intro-screen/intro-screen.component';
import { LoadingWheelComponent } from './loading-wheel/loading-wheel.component';

let gapiClientConfig: NgGapiClientConfig = {
  client_id: "498408591122-91p3073ucantaqmg981lkl0p1o3dhedn.apps.googleusercontent.com",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
  ],
  scope: "https://www.googleapis.com/auth/youtube.readonly"
}

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    VideoListComponent,
    VideoCardComponent,
    VideoPlayerComponent,
    IntroScreenComponent,
    LoadingWheelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
