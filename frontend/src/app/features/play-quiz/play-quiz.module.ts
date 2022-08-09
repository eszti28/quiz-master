import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayQuizRoutingModule } from './play-quiz-routing.module';
import { PlayQuizComponent } from './play-quiz.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PlayQuizComponent],
  imports: [CommonModule, PlayQuizRoutingModule, SharedModule],
})
export class PlayQuizModule {}
