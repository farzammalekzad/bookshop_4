import { Component, OnInit } from '@angular/core';
import {AppsModel} from '../../model/apps.model';
import {BookService} from '../../DTO/book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bazar',
  templateUrl: './bazar.component.html',
  styleUrls: ['./bazar.component.scss']
})
export class BazarComponent implements OnInit {

  apps: AppsModel[];
  loading = false;

  constructor(private bookService: BookService, private router: Router) {

  }

  ngOnInit() {
    this.bookService.getApps().subscribe((apps) => {
      this.apps = apps;
    });
  }

  open(link: string) {
    const encodeLink = encodeURI(link);
    (window as any).open(encodeLink, '_blank');
  }

}
