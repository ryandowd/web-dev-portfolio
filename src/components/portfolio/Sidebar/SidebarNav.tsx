import classes from './SidebarNav.module.scss';

export const SidebarNav = () => {
  return (
    <div className={classes['sidebar__nav']}>
      <h1 className={classes['sidebar__logo']}>Ryan Dowd</h1>
      <div className={classes['sidebar__links']}>
        <a target='_blank' href='https://github.com/ryandowd'>
          Github
        </a>
        <a
          target='_blank'
          href='https://www.linkedin.com/in/ryandowddeveloper/'
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};
