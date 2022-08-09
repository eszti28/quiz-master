import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayQuizComponent } from './play-quiz.component';

const routes: Routes = [
  {
    path: '',
    component: PlayQuizComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayQuizRoutingModule {}
