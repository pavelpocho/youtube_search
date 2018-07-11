import { Injectable } from '@angular/core';
import { GoogleApiService } from 'ng-gapi';
import { Video } from './video';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  watching: Subject<Video> = new Subject<Video>();
  rating: Subject<String> = new Subject<String>();

  videos: Subject<Video[]> = new Subject<Video[]>();

  fetching: Subject<boolean> = new Subject<boolean>();

  constructor(gapiService: GoogleApiService) { 

    gapiService.onLoad().subscribe(() => {
      gapi.load("client", () => {
        gapi.client.init({
          apiKey: "AIzaSyCDV1nuEavaPIkTknujbzAZAN8oUiWdArg",
          clientId: "498408591122-91p3073ucantaqmg981lkl0p1o3dhedn.apps.googleusercontent.com",
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
          ],
          scope: "https://www.googleapis.com/auth/youtube.readonly email"
        }).then(() => {
          console.log("loaded");
        })
      })
    });
  }

  openVideo(video: Video) {
    this.watching.next(video);
    const object = {
      id: video.id.videoId
    }
    var request = gapi.client.request({
      method: "GET",
      path: "youtube/v3/videos/getRating",
      params: object
    })
    request.execute((response) => {
      console.log("Got a response");
      console.log(response);
      this.rating.next(response.items[0].rating);
    })
  }

  search(term: String): void {
    this.fetching.next(true);
    const object = {
      part: "snippet",
      q: term,
      type: "video",
      maxResults:  50
    }
    var request = gapi.client.request({
      method: "GET",
      path: "youtube/v3/search",
      params: object
    })
    request.execute((response) => {
      console.log("Got a response");
      console.log(response);
      this.videos.next(response.items);
    })
  }

  rateVideo(video: Video, rating: Number) {

    if (!gapi.auth2.getAuthInstance().currentUser.get().hasGrantedScopes("https://www.googleapis.com/auth/youtube")) return;

    const object = {
      id: video.id.videoId,
      rating: rating === 1 ? "like" : rating === 0 ? "none" : rating === -1 ? "dislike" : null
    }
    if (object.rating == null) throw new DOMException("Invalid rating");

    var request = gapi.client.request({
      method: "POST",
      path: "youtube/v3/videos/rate",
      params: object
    })
    request.execute((response) => {
      console.log("Got a response");
      console.log(response);
    })

  }

  getSubscriptions() {

    try {
      if (gapi) {

      }
    } catch {
      return;
    }

    if (!gapi.auth2.getAuthInstance().currentUser.get().hasGrantedScopes("https://www.googleapis.com/auth/youtube")) return;

    return;

    /*this.fetching.next(true);
    const object = {
      part: "snippet",
      mine: "true"
    }
    var request = gapi.client.request({
      method: "GET",
      path: "youtube/v3/subscriptions",
      params: object
    })
    request.execute((response) => {
      console.log("Got a response");
      console.log(response);
      this.videos.next(response.items);
    })*/
  }
}
