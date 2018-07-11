import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SearchService } from '../search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-intro-screen',
  templateUrl: './intro-screen.component.html',
  styleUrls: ['./intro-screen.component.css']
})
export class IntroScreenComponent implements OnInit, OnDestroy {

  display: Boolean = true;
  fetching: Boolean = false;

  videoSub: Subscription;
  fetchSub: Subscription;

  constructor(private searchService: SearchService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.videoSub = this.searchService.videos.subscribe(data => {
      if (data != null && data != undefined) {
        this.display = false;
        this.fetching = false;
        this.cd.detectChanges();
      }
    });
    this.fetchSub = this.searchService.fetching.subscribe(data => {
      this.fetching = data;
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this.videoSub.unsubscribe();
    this.fetchSub.unsubscribe();
  }
  

}
