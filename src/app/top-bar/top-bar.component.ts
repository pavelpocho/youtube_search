import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Video } from '../video';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  term: String;
  videos: Video[];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  search() {
    this.searchService.search(this.term);
  }

}
