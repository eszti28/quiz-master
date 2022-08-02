import { QuizMainPageViewModel } from "../models/view/QuizMainPageViewModel";
import { questionRepository } from "../repositories/questionRepository"

export const quizService = {
    async addNewQuiz(title: string, question: string, category: string, answers: string[], correctAnswer: number[]
      ): Promise<void> { 
        await questionRepository.addNewQuestion(title, question, category);
        const questionId = await questionRepository.getNewestQuiz();
        await questionRepository.addAnswersToQuestion(correctAnswer, answers, questionId.id)
      },

    async getQuizMainInfo(): Promise<QuizMainPageViewModel[]> {
      return await questionRepository.getQuizMainInfo();
    },

    async getNewestQuiz(): Promise<QuizMainPageViewModel> {
      return await questionRepository.getNewestQuiz();
    }
}