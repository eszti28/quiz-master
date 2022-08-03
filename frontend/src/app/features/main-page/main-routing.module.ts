import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { MainPageComponent } from './main-page.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: 'every-quiz', component: QuizListComponent },
      { path: ':category', component: CategoryComponent },
      { path: '', redirectTo: 'every-quiz', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
