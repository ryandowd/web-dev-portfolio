import { Typography } from '@mui/material';
import classes from './SidebarNav.module.scss';

export const SidebarNav = () => {
  return (
    <div className={classes['sidebar__nav']}>
      <Typography variant='h3' fontWeight={700}>
        Ryan Dowd
      </Typography>
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
