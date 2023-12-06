import React, { FC } from 'react';
import styles from './Game.module.scss';

interface GameProps {}

const Game: FC<GameProps> = () => (
  <div className={styles.Game}>
    Game Component
  </div>
);

export default Game;
