import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakeQuizComponent } from './make-quiz.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MakeQuizRoutingModule } from './make-quiz-routing.module';
import { NewQuestionComponent } from './new-question/new-question.component';

@NgModule({
  declarations: [MakeQuizComponent, NewQuestionComponent],
  imports: [CommonModule, SharedModule, MakeQuizRoutingModule],
})
export class MakeQuizModule {}
