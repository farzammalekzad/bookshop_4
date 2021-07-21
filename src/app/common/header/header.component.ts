import { Component, OnInit } from '@angular/core';
import {MenuModel} from "../../model/menu.model";

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
      showOnDesktop: true
    },
    {
      label: 'اپلیکیشن در بازار',
      icon: 'mobile_friendly',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'درخواست کتاب',
      icon: 'book',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'جستجوی پیشرفته',
      icon: 'search',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'درباره من',
      icon: 'person',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'پنل مدیریتی',
      icon: 'login',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
