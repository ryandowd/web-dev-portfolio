import { Box } from '@mui/material';
import React from 'react';

type CardJoinerProps = {
  endDate: string;
};

export const TimelineCardJoiner = (props: CardJoinerProps) => {
  const joiner = {
    width: '7px',
    height: '100px',
    backgroundColor: '#000',
    margin: '0 auto 0',
    transition: 'all 1s',
  };

  const joinerDate = {
    fontSize: '1rem',
    marginLeft: '25px',
    width: 'max-content',
    padding: '40px 10px',
    position: 'relative',

    '&:before': {
      content: '""',
      height: '3px',
      width: '30px',
      backgroundColor: '#000',
      display: 'block',
      position: 'absolute',
      marginTop: '7px',
      left: '-25px',
    },

    '&:after': {
      content: '""',
      height: '18px',
      width: '18px',
      display: 'inline-block',
      backgroundColor: '#000',
      borderRadius: '15px',
      position: 'absolute',
      left: '-30px',
    },
  };

  const joinerDateText = {
    width: '150px',
    marginTop: '-4px',
    position: 'absolute',
    textAlign: 'left',
  };

  const { endDate } = props;
  return (
    <Box sx={joiner}>
      <Box sx={joinerDate}>
        <Box sx={joinerDateText}>{endDate}</Box>
      </Box>
    </Box>
  );
};
