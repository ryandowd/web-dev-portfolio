export interface EventProps {
  eventId: string;
  title: string;
  logo: string | undefined;
  startDate: string;
  endDate: string;
  location: string;
  skills: string;
  description: string;
}

export interface FormFieldProps {
  name: string;
  label: string;
  extraProps?: {
    minRows: number;
    style: object;
    multiline: boolean;
  };
}

export interface AuthSession {
  user: {
    email: string;
    id: string;
    name: string;
  };
  expires: string;
  isAdmin: boolean;
}
