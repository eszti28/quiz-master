import { TestBed } from '@angular/core/testing';
import { QuizService } from './quizService';

describe('SnackBarService', () => {
  let service: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
