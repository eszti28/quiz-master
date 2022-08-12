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
  {
    path: 'play-quiz',
    loadChildren: () =>
      import('../app/features/play-quiz/play-quiz.module').then(
        (m) => m.PlayQuizModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import(
        '../app/features/authentication/registration/registration.module'
      ).then((m) => m.RegistrationModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/features/authentication/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
