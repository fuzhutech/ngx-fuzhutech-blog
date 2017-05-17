import {Component, OnInit} from '@angular/core';
import {SiteStat} from '../shared';
import {SiteStatService} from "../shared";
@Component({
  selector: 'app-sitestat',
  templateUrl: './sitestat.component.html',
  styleUrls: ['./sitestat.component.css']
})
export class SitestatComponent implements OnInit {
  public currentTime = new Date().toLocaleString();
  public siteStat = new SiteStat();

  constructor(private service: SiteStatService) {
    window.setInterval(
      () => {
        this.currentTime = new Date().toLocaleString();
      }
      , 1000);
  }

  ngOnInit() {
    this.service.getSiteStat().subscribe(
     data => {
     this.siteStat = data;
     },
     err =>{
     console.log(err);
     }
     );
  }
}
