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
  defaultDailyQuota: number; 
  dailyQuotaPointsUsed: number;  
  lastQuotaReset: Date; 
  quotaUsageLog: Date[]
}

export interface Recipient {
  name: string;
  email: string;
  created: Date;
  updated: Date;
  imageUrl: string;
}
