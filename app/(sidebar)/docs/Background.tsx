import React from 'react';
import styles from './Background.module.css';
import NextImage from 'next/image';
import heroGlow from './hero-glow.svg'

export const Background: React.FC = () => {
  return (
    <div className={styles.background}>
      <div className={styles.signupSpace}>
        <div className={styles.signupStars}></div>
        <div className={styles.signupStars}></div>
        <div className={styles.signupStars}></div>
        <div className={styles.signupStars}></div>
        <div className={styles.signupStars}></div>
        <div className={styles.signupStars}></div>
      </div>
      <NextImage
        src={heroGlow}
        alt="Glowing universe"
        className={styles.heroGlow}
      />
    </div>
  );
};
