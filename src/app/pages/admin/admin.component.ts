import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../DTO/book.service";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {AcademicModel} from "../../model/academic.model";
import {Subscription} from "rxjs";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  form: FormGroup;
  category: AcademicModel[];
  loading = false;
  imageDownloadLink: string;
  bookDownloadLink: string;
  selectedImage: string;

  constructor(private bookService: BookService, private http: HttpClient ) {
    this.form = new FormGroup({
      cat: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(5)]
      }),
      author: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      image: new FormControl(null),
      pdf: new FormControl(null),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(10)]
      }),
      fullVersion: new FormControl(false)
    })
  }

  ngOnInit(): void {
    this.bookService.getCurrentCategory().subscribe((ctg) => {
      if (ctg == null) {
        this.bookService.getCategory().subscribe((ctg) => {
          this.bookService.setCategory(ctg);
          this.category = ctg;
        })
      } else {
        this.category = ctg;
      }
    })
  }


   sendBook() {
     this.loading = true;
     console.log(this.form.value);
     setTimeout(() => {
       this.loading = false
       this.form.reset();
     }, 2000);

  }

  onImageSelected(event) {
    this.loading = true;
    const file: File = (event.target as HTMLInputElement).files[0];
    this.bookService.uploadImageBook(file).subscribe((link) => {
      this.imageDownloadLink = link;
      this.loading = false;
    });
  }

  onBookSelected(event) {
    this.loading = true;
    const file: File = (event.target as HTMLInputElement).files[0];
    this.bookService.uploadBook(file).subscribe((link) => {
      this.bookDownloadLink = link;
      this.loading = false
    })
  }






}
