import React from 'react';

import classes from './TimelineCardJoiner.module.scss';

type CardJoinerProps = {
  endDate: string;
};

export const TimelineCardJoiner = (props: CardJoinerProps) => {
  const { endDate } = props;
  return (
    <div className={classes['card-joiner']}>
      <div className={classes['card-joiner__date']}>
        <span className={classes['card-joiner__date-text']}>{endDate}</span>
      </div>
    </div>
  );
};
