import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../DTO/book.service";
import {AcademicModel} from "../../model/academic.model";

const ELEMENT_DATA: AcademicModel[] = [
];

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})

export class DeleteComponent implements OnInit {
  displayedColumns: string[] = ['field', 'id', 'imageUrl'];
  form: FormGroup;
  form_2: FormGroup;
  categoryData: AcademicModel[];
  dataSource: AcademicModel[];
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
      })
    });
  };

  ngOnInit(): void {
    this.bookService.getCurrentCategory().subscribe((ctg) => {
      if (ctg === null) {
        this.bookService.getCategory().subscribe((ctg) => {
          this.bookService.setCategory(ctg);
          this.dataSource = ctg;
        }, (errmess) => {
          this.errMess = errmess;
          console.log(errmess);
        });
      } else {
        this.bookService.getCurrentCategory().subscribe((ctg) => {
          this.categoryData = ctg;
          this.dataSource = ctg;
          console.log(this.dataSource);
        });
      }
    });

  }

  deleteCategory() {
    this.bookService.deleteCategory(this.form.value.categoryId).subscribe((resp) => {
      console.log(resp);
      window.location.reload();
    })
  }

  deleteBook() {

  }

}
