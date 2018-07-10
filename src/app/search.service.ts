import { Injectable } from '@angular/core';
import { GoogleApiService } from 'ng-gapi';
import { Video } from './video';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  videos: Subject<Video[]> = new Subject<Video[]>();

  constructor(gapiService: GoogleApiService) { 

    gapiService.onLoad().subscribe(() => {
      console.log("loaded");
      gapi.load("client", () => {
        gapi.client.init({
          apiKey: "AIzaSyCDV1nuEavaPIkTknujbzAZAN8oUiWdArg",
          clientId: "498408591122-91p3073ucantaqmg981lkl0p1o3dhedn.apps.googleusercontent.com",
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
          ],
          scope: "https://www.googleapis.com/auth/youtube.readonly"
        }).then(() => {
          console.log("loaded");
        })
      })
      
    });
  }

  search(term: String): void {
    const object = {
      part: "snippet",
      q: term,
      type: "video"
    }
    var request = gapi.client.request({
      method: "GET",
      path: "youtube/v3/search",
      params: object
    })
    request.execute((response) => {
      console.log("Response");
      this.videos.next(response.items);
    })
  }
}
