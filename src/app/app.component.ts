import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  links = [
    { id: 'home', name: '首页', url: '/home' },
    { id: 'book', name: '图书管理', url: '/book' },
    { id: 'category', name: '书籍分类', url: '/category' }
  ]
  activeLink;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(
      val => {
        if (val instanceof NavigationEnd) {
          this.activeLink = this.links.find(l =>val.url.includes(l.url));
        }
      }
    );
  }

  handleClick(link) {
    this.activeLink = link;
    this.router.navigateByUrl(link.url);
  }

}

