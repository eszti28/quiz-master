import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyQuizzesComponent } from './my-quizzes.component';

const routes: Routes = [
  {
    path: '',
    component: MyQuizzesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyQuizzesRoutingModule {}
