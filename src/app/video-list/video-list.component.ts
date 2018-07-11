import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Video } from '../video';
import { SearchService } from '../search.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit, OnDestroy {

  videos: Video[];
  displayVideos: Video[];
  page: number = 0;
  fetching: boolean = false;

  videoSubscription: Subscription;
  fetchingSubscription: Subscription;

  constructor(private searchService: SearchService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    console.log("ListInit");
    this.videoSubscription = this.searchService.videos.subscribe(data => {
      console.log("Recieved in list");
      this.videos = data;
      this.displayVideos = this.videos.slice(this.page * 5, this.page * 5 + 5);
      this.cd.detectChanges();
    });
    this.fetchingSubscription = this.searchService.fetching.subscribe(data => {
      this.fetching = data;
      this.cd.detectChanges();
    });
    this.searchService.getSubscriptions();
  }

  ngOnDestroy() {
    this.videoSubscription.unsubscribe();
    this.fetchingSubscription.unsubscribe();
  }

  switchPage(plus: Boolean) {
    if ((this.page * 5 + 5 >= this.videos.length && plus) || (this.page == 0 && !plus)) return;
    this.page += (plus ? 1 : -1);
    this.displayVideos = this.videos.slice(this.page * 5, this.page * 5 + 5);
    this.cd.detectChanges();
  }
}
