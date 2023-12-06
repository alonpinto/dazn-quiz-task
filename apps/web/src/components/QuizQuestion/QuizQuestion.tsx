import React, { FC } from 'react';
import styles from './QuizQuestion.module.scss';

interface QuizQuestionProps {}

const QuizQuestion: FC<QuizQuestionProps> = () => (
  <div className={styles.QuizQuestion}>
    QuizQuestion Component
  </div>
);

export default QuizQuestion;
