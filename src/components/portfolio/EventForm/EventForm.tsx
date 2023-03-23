import { FormInput } from '@/components/ui/FormInput';
import { EventProps, FormFieldProps } from '@/types';
import { LoadingButton } from '@mui/lab';
import { Container } from '@mui/system';

type EventFormProps = {
  eventDetail?: EventProps | undefined;
  isLoading?: boolean;
  isRefetching?: boolean;
  isUpdating?: boolean;
  formFields: FormFieldProps[];
  submitFormHandler: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const EventForm = (props: EventFormProps) => {
  const {
    submitFormHandler,
    eventDetail,
    formFields,
    isLoading,
    isRefetching,
    isUpdating,
  } = props;

  return (
    <Container
      component='form'
      onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
        submitFormHandler(event)
      }
    >
      {formFields.map((field: FormFieldProps, index: number) => {
        const fieldValue = eventDetail?.[field.name as keyof EventProps] || '';

        return (
          <FormInput
            key={field.name}
            field={field}
            value={fieldValue}
            isRefetching={isRefetching}
            autofocus={index === 0}
          />
        );
      })}

      <LoadingButton
        type='submit'
        disabled={isLoading}
        loading={isUpdating}
        variant='contained'
        fullWidth
        sx={{ mt: 2 }}
      >
        Update Event
      </LoadingButton>
    </Container>
  );
};
