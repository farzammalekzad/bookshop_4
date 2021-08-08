import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    (window as any).open('http://book.mohammad-malekzad.ir/', '_blank');
    return this.router.navigate(['/']);
  }

}
