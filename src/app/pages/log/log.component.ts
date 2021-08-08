import { Component, OnInit } from '@angular/core';
import {BookreqModel} from '../../model/bookreq.model';
import {BookService} from '../../DTO/book.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  displayedColumns: string[] = ['title', 'author', 'email', 'mobile', 'description'];
  requestData: BookreqModel[];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getRequest().subscribe((reqs) => {
      this.requestData = reqs;
    });
  }

}
