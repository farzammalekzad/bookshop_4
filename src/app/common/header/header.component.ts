import { Component, OnInit } from '@angular/core';
import {MenuModel} from "../../model/menu.model";
import {LoginComponent} from "../../pages/login/login.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuItems: MenuModel[] = [
    {
      label: 'خانه',
      icon: 'home',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      method: '',
      router: ''
    },
    {
      label: 'اپلیکیشن در بازار',
      icon: 'mobile_friendly',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      method: '',
      router: 'null'
    },
    {
      label: 'درخواست کتاب',
      icon: 'book',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      method: '',
      router: 'request'
    },
    {
      label: 'جستجوی پیشرفته',
      icon: 'search',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      method: '',
      router: 'null'
    },
    {
      label: 'درباره من',
      icon: 'person',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      method: '',
      router: 'null'
    },
    {
      label: 'پنل مدیریتی',
      icon: 'login',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      method: 'onclick()',
      router: 'login'
    }
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }



}
