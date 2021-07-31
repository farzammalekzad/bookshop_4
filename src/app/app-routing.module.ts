import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {BooksComponent} from "./pages/books/books.component";
import {BookdetailComponent} from "./pages/bookdetail/bookdetail.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {LoginComponent} from "./pages/login/login.component";
import {PanelComponent} from "./pages/panel/panel.component";
import {AddCatComponent} from "./pages/add-cat/add-cat.component";
import {DeleteComponent} from "./pages/delete/delete.component";
import {GuardGuard} from "./security/guard.guard";


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'category/:cId', component: BooksComponent},
  {path: 'category/:cId/detail/:bId', component: BookdetailComponent},
  {path: 'panel/add_book', component: AdminComponent, canActivate: [GuardGuard]},
  {path: 'panel/add_category', component: AddCatComponent, canActivate: [GuardGuard]},
  {path: 'panel/delete', component: DeleteComponent, canActivate: [GuardGuard]},
  {path: 'panel', component: PanelComponent, canActivate: [GuardGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
