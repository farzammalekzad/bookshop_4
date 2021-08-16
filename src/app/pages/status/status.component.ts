import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {BookService} from '../../DTO/book.service';
import {BookreqModel} from '../../model/bookreq.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  form2: FormGroup;
  id: string;
  oldReq: BookreqModel;
  loading = false;
  @ViewChild('SwalFound') public readonly SwalFound: SwalComponent;
  @ViewChild('SwalSuccess') public readonly SwalSuccess: SwalComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private bookService: BookService) {
    this.form2 = new FormGroup({
      status: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  ngOnInit() {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe((params) => {
      if (!params.has('requestId')) {
        this.router.navigateByUrl('/panel/log');
        this.SwalFound.fire();
        return;
      }
      this.id = params.get('requestId');
      return this.bookService.getRequestById(params.get('requestId')).subscribe((res) => {
        this.oldReq = res;
        this.loading = false;
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });

  }

  updateReq() {
    const newReq: BookreqModel = {
      _id: this.id,
      title: this.oldReq.title,
      author: this.oldReq.author,
      email: this.oldReq.email,
      mobile: this.oldReq.mobile,
      description: this.oldReq.description,
      status: this.form2.value.status
    };
    this.bookService.updateRequest(this.id, newReq).subscribe((res) => {
      this.SwalSuccess.fire();
      this.router.navigateByUrl('/panel/log');
    });
  }

}
