import { Component, OnInit } from '@angular/core';
import {BookService} from "../../DTO/book.service";
import {BookModel} from "../../model/book.model";
import {AcademicModel} from "../../model/academic.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  categoryData: AcademicModel[];
  errMess: string;

  constructor(private bookService: BookService) { }

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
    });
  }


}
