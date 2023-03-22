import { Container } from '@mui/material';

export const FinanceForm = () => {
  function submitFormHandler() {
    console.log('yer');
  }
  return (
    <Container
      onSubmit={(event: any) => submitFormHandler(event)}
      component='form'
    ></Container>
  );
};
