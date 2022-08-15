import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyQuizzesRoutingModule } from './my-quizzes-routing.module';
import { MyQuizzesComponent } from './my-quizzes.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MyQuizzesComponent],
  imports: [CommonModule, MyQuizzesRoutingModule, SharedModule],
})
export class MyQuizzesModule {}
