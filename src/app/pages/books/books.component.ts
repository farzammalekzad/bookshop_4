import { Component, OnInit } from '@angular/core';
import {BookService} from "../../DTO/book.service";
import {ActivatedRoute} from "@angular/router";
import {BookModel} from "../../model/book.model";
import {map} from "rxjs/operators";
import {AcademicModel} from "../../model/academic.model";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  id: string;
  books: BookModel[];
  category: AcademicModel;


  constructor(private bookService: BookService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('cId');
    })
  }


  ngOnInit(): void {
    this.bookService.getCurrentCategory().subscribe((ctg) => {
      console.log(ctg);
      if (ctg === null) {
        this.bookService.getCategory().subscribe((ctg) => {
          this.bookService.setCategory(ctg);
        });
      } else {
        this.bookService.getBooks(this.id).subscribe((books) => {
           this.books = books;
           this.bookService.getCurrentCategoryById(this.id).subscribe((ctg) => {
             this.category = ctg;
           });
        });
      }
    });
  }
}
