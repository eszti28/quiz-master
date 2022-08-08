import { AbstractControl } from '@angular/forms';

export interface AnswerAndIsCorrectViewModel {
  answer: AbstractControl;
  isCorrect: boolean;
}
