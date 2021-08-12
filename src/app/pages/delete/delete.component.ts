import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../DTO/book.service';
import {AcademicModel} from '../../model/academic.model';
import {BookModel} from '../../model/book.model';
import {AppsModel} from '../../model/apps.model';

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
  displayedColumns3: string[] = ['name', 'id'];
  form: FormGroup;
  form_2: FormGroup;
  form3: FormGroup;
  categoryData: AcademicModel[];
  bookData: BookModel[] = [];
  appData: AppsModel[] = [];
  errMess: string;

  constructor(private bookService: BookService) {
    this.form = new FormGroup({
      categoryId: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });

    this.form_2 = new FormGroup({
      bookId: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      catId: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });

    this.form3 = new FormGroup({
      appId: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.bookService.getCurrentCategory().subscribe((ctg) => {
      if (ctg === null) {
        this.bookService.getCategory().subscribe((cats) => {
          this.bookService.setCategory(cats);
        }, (errmess) => {
          this.errMess = errmess;
          console.log(errmess);
        });
      } else {
        this.bookService.getCurrentCategory().subscribe((cats) => {
          this.categoryData = cats;
        });
      }
      setTimeout(() => {
       this.getAllBooks();
      }, 1000);

      // گرفتن اطلاعات مربوط به اپلیکیشن‌ها
      this.bookService.getApps().subscribe((apps) => {
       this.appData = apps;
     }, error => {
        console.log(error);
      });

    });

  }

  deleteCategory() {
    this.bookService.deleteCategory(this.form.value.categoryId).subscribe((resp) => {
      console.log(resp);
      window.location.reload();
    });
  }

  deleteBook() {
    return this.bookService.deleteBook(this.form_2.value.catId, this.form_2.value.bookId).subscribe((resp) => {
      console.log(resp);
    });

  }

  getAllBooks() {
    let book = [];
    return this.bookService.getAllBooks().subscribe((books) => {
      books.forEach((x) => x.map((y) => book.push(y)));
      this.bookData = book;
    });
  }

  deleteApp() {
    return this.bookService.deleteApp(this.form3.value.appId).subscribe((resp) => {
      console.log(resp);
    });

  }

}
