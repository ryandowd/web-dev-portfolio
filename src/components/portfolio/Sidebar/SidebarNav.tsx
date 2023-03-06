import { FunctionComponent } from 'react';
import classes from './SidebarNav.module.scss';

export const SidebarNav: FunctionComponent = () => {
  return (
    <div className={classes.sidebar_nav}>
      <h1 className='Menu__title font--bold'>Ryan Dowd</h1>
      <nav className='Menu__list'>
        <a
          rel='noopener noreferrer'
          target='_blank'
          href='https://github.com/ryandowd'
        >
          Github
        </a>
        <a
          rel='noopener noreferrer'
          target='_blank'
          href='https://www.linkedin.com/in/ryandowddeveloper/'
        >
          LinkedIn
        </a>
      </nav>
    </div>
  );
};
