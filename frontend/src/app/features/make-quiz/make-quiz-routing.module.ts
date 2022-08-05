import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeQuizComponent } from './make-quiz.component';
import { NewQuestionComponent } from './new-question/new-question.component';

const routes: Routes = [
  {
    path: '',
    component: MakeQuizComponent,
  },
  { path: 'new-question', component: NewQuestionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeQuizRoutingModule {}
