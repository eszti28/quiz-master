import { QuizMainPageViewModel } from "../models/view/QuizMainPageViewModel";
import { questionRepository } from "../repositories/questionRepository"

export const quizService = {
    async addNewQuiz(title: string, question: string, category: string, answers: string[], correctAnswer: number[]
      ): Promise<void> { 
        await questionRepository.addNewQuestion(title, question, category);
        const questionId = await questionRepository.getMaxQuestionId();
        await questionRepository.addAnswersToQuestion(correctAnswer, answers, questionId)
      },

    async getQuizMainInfo(): Promise<QuizMainPageViewModel[]> {
      return await questionRepository.getQuizMainInfo();
    }
}