import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Video } from '../video';
import { SearchService } from '../search.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { GoogleUser } from '../google-user';
import { SignInService } from '../sign-in.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {

  videoId: String;
  video: Video;
  videoDate: String;
  emptyDisplay: boolean = false;
  videoUrl: SafeResourceUrl;
  likedClass: String = "";
  dislikedClass: String = "";

  user: GoogleUser;

  videoSub: Subscription;
  watchingSub: Subscription;
  signSub: Subscription;

  url = ["http://www.youtube.com/embed/", "?enablejsapi=1&origin=http://localhost:4200"];

  constructor(private searchService: SearchService, private signIn: SignInService, private cd: ChangeDetectorRef, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.signSub = this.signIn.user.subscribe((user) => {
      this.user = user;
    })
    this.videoSub = this.searchService.videos.subscribe(data => {
      if (data != null && data != undefined) {
        this.emptyDisplay = true;
        this.cd.detectChanges();
      }
    });
    this.watchingSub = this.searchService.watching.subscribe(video => {
      this.videoId = video.id.videoId;
      this.emptyDisplay = false;
      this.video = video;
      this.videoDate = new Date(this.video.snippet.publishedAt).toLocaleString().split(",")[0];
      this.cd.detectChanges();
      this.setUrl();
    });
    this.searchService.rating.subscribe(rating => {
      if (rating == "like") {
        this.likedClass = "selected";
      }
      if (rating == "dislike") {
        this.dislikedClass = "selected";
      }
      this.cd.detectChanges();
    })
  }

  ngOnDestroy() {
    this.videoSub.unsubscribe();
    this.signSub.unsubscribe();
    this.watchingSub.unsubscribe();
  }

  setUrl() {
    if (this.videoUrl !== this.sanitizer.bypassSecurityTrustResourceUrl(this.getUrl())) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getUrl())
    }
  }

  getUrl() {
    return (this.url[0] + this.videoId + this.url[1]);
  }

  like() {
    if (this.likedClass === "selected") {
      this.searchService.rateVideo(this.video, 0);
      this.dislikedClass = "";
      this.likedClass = "";
    }
    else {
      this.searchService.rateVideo(this.video, 1);
      this.likedClass = "selected";
      this.dislikedClass = "";
    }
    this.cd.detectChanges();
  }
  
  dislike() {
    if (this.dislikedClass === "selected") {
      this.searchService.rateVideo(this.video, 0);
      this.dislikedClass = "";
      this.likedClass = "";
    }
    else {
      this.searchService.rateVideo(this.video, -1);
      this.dislikedClass = "selected";
      this.likedClass = "";
    }
    this.cd.detectChanges(); 
  }

}
