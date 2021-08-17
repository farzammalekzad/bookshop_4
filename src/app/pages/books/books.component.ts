import { Component, OnInit } from '@angular/core';
import {BookService} from "../../DTO/book.service";
import {ActivatedRoute, Router} from '@angular/router';
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
  loading = false;


  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('cId');
    });
  }


  ngOnInit() {
    this.loading = true;
    this.bookService.getCurrentCategory().subscribe((ctgs) => {
      if (ctgs === null) {
        this.bookService.getCategory().subscribe((cg) => {
          this.bookService.setCategory(cg);
          this.loading = false;
        });
      } else {
        this.bookService.getBooks(this.id).subscribe((books) => {
           this.books = books;
           this.bookService.getCurrentCategoryById(this.id).subscribe((ctg) => {
             this.category = ctg;
             this.loading = false;
           });
        });
      }
    });
  }

  download(url: string): void {
    const encodedUrl = encodeURI(url);
    (window as any).open(encodedUrl, '_blank');
  }
}
