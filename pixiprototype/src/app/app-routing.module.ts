import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ChooseUserComponent } from './mock-components/choose-user/choose-user.component';

const routes: Routes = [
  { path: '', component: ChooseUserComponent},
  { path: 'game/:id', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
