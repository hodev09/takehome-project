export interface State {
  recipients: Recipient[];
  users: User[];
}

export interface User {
  name: string;
  email: string;
  created: Date;
  updated: Date;
  accessToken: string;
}

export interface Recipient {
  name: string;
  email: string;
  created: Date;
  updated: Date;
  imageUrl: string;
}
