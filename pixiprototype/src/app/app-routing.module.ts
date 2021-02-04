import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ChooseUserComponent } from './mock-components/choose-user/choose-user.component';

const routes: Routes = [
  { path: '', component: ChooseUserComponent },
  { path: 'game/:id', loadChildren: () => import('./game/game.module').then(m => m.GameModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
