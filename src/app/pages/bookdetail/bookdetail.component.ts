import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../DTO/book.service";
import {BookModel} from "../../model/book.model";
import {AcademicModel} from "../../model/academic.model";

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.scss']
})
export class BookdetailComponent implements OnInit {
  bookId: string;
  categoryId: string;
  book: BookModel;
  category: AcademicModel;

  constructor(private route: ActivatedRoute, private bookService: BookService) {
    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('bId');
      this.categoryId = params.get('cId');
    })
  }

  ngOnInit(): void {
    this.bookService.getBook(this.categoryId, this.bookId).subscribe((book) => {
      if (book == null) {
        this.bookService.getCategory().subscribe((ctg) => {
          this.bookService.setCategory(ctg);
          this.bookService.getBook(this.categoryId, this.bookId).subscribe((book) => {
            this.book = book;
          })
        })
      } else {
        this.book = book;
      }
    });
    this.bookService.getCurrentCategoryById(this.categoryId).subscribe((ctg) => {
      this.category = ctg;
    })

  }

}
