import React, { FC } from 'react';
import styles from './Quiz.module.scss';

interface QuizProps {}

const Quiz: FC<QuizProps> = () => (
  <div className={styles.Quiz}>
    Quiz Component
  </div>
);

export default Quiz;
