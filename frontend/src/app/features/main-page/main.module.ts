import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [MainPageComponent, QuizListComponent, CategoryComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
