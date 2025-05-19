import React from 'react';
import styles from './index.module.scss';
import sun from '../../assets/sun.png';
import moon from '../../assets/night.png';

interface ThemeSwitcherProps {
  theme: string;
  onThemeChange: (theme: string) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, onThemeChange }) => {
  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    onThemeChange(newTheme);
  };

  return (
    <div className={styles.themeSwitcher}>
      <button 
        className={`${styles.switcherButton} ${theme === 'dark' ? styles.active : ''}`} 
        onClick={handleToggle}
        aria-label="Переключить тему"
      >
        <div className={styles.switcherTrack}>
          <div className={styles.switcherThumb}>
            <img 
              src={theme === 'dark' ? moon : sun} 
              alt={theme === 'dark' ? 'Темная тема' : 'Светлая тема'} 
              className={styles.themeIcon}
            />
          </div>
        </div>
      </button>
    </div>
  );
};