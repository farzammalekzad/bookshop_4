import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../DTO/book.service";
import {AcademicModel} from "../../model/academic.model";
import {BookModel} from "../../model/book.model";

const ELEMENT_DATA: AcademicModel[] = [
];

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})

export class DeleteComponent implements OnInit {
  displayedColumns: string[] = ['field', 'id', 'imageUrl'];
  displayedColumns_2: string[] = ['title', 'id'];
  form: FormGroup;
  form_2: FormGroup;
  categoryData: AcademicModel[];
  bookData: BookModel[] = [];
  errMess: string;

  constructor(private bookService: BookService) {
    this.form = new FormGroup({
      categoryId: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      })
    });

    this.form_2 = new FormGroup({
      bookId: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      catId: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      })
    });
  };

  ngOnInit(): void {
    this.bookService.getCurrentCategory().subscribe((ctg) => {
      if (ctg === null) {
        this.bookService.getCategory().subscribe((ctg) => {
          this.bookService.setCategory(ctg);
        }, (errmess) => {
          this.errMess = errmess;
          console.log(errmess);
        });
      } else {
        this.bookService.getCurrentCategory().subscribe((ctg) => {
          this.categoryData = ctg;
        });
      }
      setTimeout(() => {
       this.getAllBooks();
      }, 1000);

    });

  }

  deleteCategory() {
    this.bookService.deleteCategory(this.form.value.categoryId).subscribe((resp) => {
      console.log(resp);
      window.location.reload();
    })
  }

  deleteBook() {
    this.bookService.deleteBook(this.form_2.value.catId, this.form_2.value.bookId).subscribe((resp) => {
      console.log(resp);
    })

  }

  getAllBooks() {
    let book = [];
    this.bookService.getAllBooks().subscribe((books) => {
      books.forEach((x) => x.map((y) => book.push(y)));
      this.bookData = book;
    })
  }

}
