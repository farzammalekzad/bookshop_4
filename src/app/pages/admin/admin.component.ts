import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../DTO/book.service';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {AcademicModel} from '../../model/academic.model';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild('SwalSuccess') public readonly SwalSuccess: SwalComponent;
  form: FormGroup;
  category: AcademicModel[];
  loading = false;
  imageDownloadLink: string;
  bookDownloadLink: string;
  selectedImage: string;

  constructor(private bookService: BookService, private http: HttpClient ) {
    this.form = new FormGroup({
      cat: new FormControl(null, {
        updateOn: 'blur',
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
      imageUrl: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      pdfUrl: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(10)]
      }),
      fullVersion: new FormControl(false)
    });
  }

  ngOnInit(): void {
    this.bookService.getCurrentCategory().subscribe((ctg) => {
      if (ctg == null) {
        this.bookService.getCategory().subscribe((ctg) => {
          this.bookService.setCategory(ctg);
          this.category = ctg;
        });
      } else {
        this.category = ctg;
      }
    });
  }


   sendBook() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 500);
    console.log(this.form.value);
    this.bookService.sendBook(
       this.form.value.title,
       this.form.value.author,
       this.form.value.imageUrl,
       this.form.value.pdfUrl,
       this.form.value.description,
       this.form.value.fullVersion,
       this.form.value.cat
     ).subscribe((resData) => {
       this.SwalSuccess.fire();
       this.form.reset({
         title: '',
         author: '',
         imageUrl: '',
         pdfUrl: '',
         description: '',
         fullVersion: false
       });
     });

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
      this.loading = false;
    });
  }






}
