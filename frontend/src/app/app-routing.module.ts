import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'quizzes', pathMatch: 'full' },
  {
    path: 'quizzes',
    loadChildren: () =>
      import('../app/features/main-page/main.module').then((m) => m.MainModule),
  },
  {
    path: 'make-quiz',
    loadChildren: () =>
      import('../app/features/make-quiz/make-quiz.module').then(
        (m) => m.MakeQuizModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
