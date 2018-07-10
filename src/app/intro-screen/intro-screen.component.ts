import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-intro-screen',
  templateUrl: './intro-screen.component.html',
  styleUrls: ['./intro-screen.component.css']
})
export class IntroScreenComponent implements OnInit {

  display: Boolean = true;
  fetching: Boolean = false;

  constructor(private searchService: SearchService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.searchService.videos.subscribe(data => {
      if (data != null && data != undefined) {
        this.display = false;
        this.fetching = false;
        this.cd.detectChanges();
      }
    });
    this.searchService.fetching.subscribe(data => {
      this.fetching = data;
      this.cd.detectChanges();
    });
  }
  

}
