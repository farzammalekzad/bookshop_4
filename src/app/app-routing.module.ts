import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {BooksComponent} from './pages/books/books.component';
import {AdminComponent} from './pages/admin/admin.component';
import {LoginComponent} from './pages/login/login.component';
import {PanelComponent} from './pages/panel/panel.component';
import {AddCatComponent} from './pages/add-cat/add-cat.component';
import {DeleteComponent} from './pages/delete/delete.component';
import {GuardGuard} from './security/guard.guard';
import {EditComponent} from './pages/edit/edit.component';
import {AboutComponent} from './common/about/about.component';
import {SearchComponent} from './common/search/search.component';
import {RequestComponent} from './pages/request/request.component';
import {LogComponent} from './pages/log/log.component';
import {BazarComponent} from './common/bazar/bazar.component';
import {OtherComponent} from './pages/other/other.component';
import {StatusComponent} from './pages/status/status.component';
import {NotfoundComponent} from './common/notfound/notfound.component';


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'category/:cId', component: BooksComponent},
  {path: 'panel/add_book', component: AdminComponent, canActivate: [GuardGuard]},
  {path: 'panel/add_category', component: AddCatComponent, canActivate: [GuardGuard]},
  {path: 'panel/delete', component: DeleteComponent, canActivate: [GuardGuard]},
  {path: 'panel', component: PanelComponent, canActivate: [GuardGuard]},
  {path: 'panel/log', component: LogComponent, canActivate: [GuardGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'panel/delete/edit/:cId', component: EditComponent, canActivate: [GuardGuard]},
  {path: 'panel/other', component: OtherComponent, canActivate: [GuardGuard]},
  {path: 'about', component: AboutComponent},
  {path: 'search', component: SearchComponent},
  {path: 'request', component: RequestComponent},
  {path: 'apps', component: BazarComponent},
  {path: 'panel/log/status/:requestId', component: StatusComponent, canActivate: [GuardGuard]},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
