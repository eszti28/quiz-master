import { questionRepository } from "../repositories/questionRepository"

export const quizService = {
    async addNewQuiz(question: string, category: string, answer: string, correctAnswer: number
      ): Promise<void> { 
        await questionRepository.addNewQuestion(question, category);
        const questionId = await questionRepository.getMaxQuestionId();
        console.log(correctAnswer);
        await questionRepository.addAnswersToQuestion(correctAnswer, answer, questionId)
      }
}