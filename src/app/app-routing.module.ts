import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {BooksComponent} from "./pages/books/books.component";
import {BookdetailComponent} from "./pages/bookdetail/bookdetail.component";
import {AdminComponent} from "./pages/admin/admin.component";


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'category/:cId', component: BooksComponent},
  {path: 'category/:cId/detail/:bId', component: BookdetailComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
