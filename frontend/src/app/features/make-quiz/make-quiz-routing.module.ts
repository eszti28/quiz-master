import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeQuizComponent } from './make-quiz.component';

const routes: Routes = [
  {
    path: '',
    component: MakeQuizComponent,
    // children: [
    //   { path: '', component: QuizListComponent },
    //   { path: 'categories', component: CategoryComponent },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeQuizRoutingModule {}
