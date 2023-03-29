export interface AuthSession {
  user: {
    email: string;
    id: string;
    name: string;
  };
  expires: string;
  isAdmin: boolean;
}
