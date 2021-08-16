import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../DTO/book.service';
import {AcademicModel} from '../../model/academic.model';
import {tap} from 'rxjs/operators';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy{
  form: FormGroup;
  private catSub: Subscription;
  loading = false;
  localCategory: AcademicModel;
  @ViewChild('SwalSuccess') public readonly SwalSuccess: SwalComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private bookService: BookService
              ) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((pm) => {
      if (!pm.has('cId')) {
        this.router.navigateByUrl('login');
        return;
      }
      this.catSub = this.bookService.getCurrentCategoryById(pm.get('cId')).subscribe((cat) => {
        this.localCategory = cat;
        this.form = new FormGroup({
          field: new FormControl(cat.field, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          imageUrl: new FormControl(cat.imageUrl, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(cat.description, {
            updateOn: 'blur',
            validators: [Validators.required]
          })
        });
      });
    });
  }

  editCategory() {
    this.loading = true;
    const newCat: AcademicModel = {
      _id: this.localCategory._id,
      field: this.form.value.field,
      imageUrl: this.form.value.imageUrl,
      description: this.form.value.description,
      books: this.localCategory.books
    };
    this.bookService.editCategory(this.localCategory._id, newCat).subscribe((resp) => {
      this.loading = false;
      this.SwalSuccess.fire();
    });

  }

  ngOnDestroy() {
    if (this.catSub) {
      this.catSub.unsubscribe();
    }
  }


}
