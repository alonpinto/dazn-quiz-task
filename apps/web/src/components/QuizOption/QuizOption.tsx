import React, { FC } from 'react';
import styles from './QuizOption.module.scss';

interface QuizOptionProps {}

const QuizOption: FC<QuizOptionProps> = () => (
  <div className={styles.QuizOption}>
    QuizOption Component
  </div>
);

export default QuizOption;
