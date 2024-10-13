import { User, State } from "../types/types";
import { generateFakeUser, generateAccessToken } from "../mocks/mocker";
import { saveState } from "../utils";

export class UserService {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  // Fetch all users
  getAllUsers(): User[] {
    return this.state.users;
  }

  // Create a new user
  createUser(name: string, email: string): User {
    const newUser: User = {
      name,
      email,
      created: new Date(),
      updated: new Date(),
      accessToken: generateAccessToken(),
      defaultDailyQuota : 100,
      dailyQuotaPointsUsed:0,
      lastQuotaReset:new Date(),
      quotaUsageLog:[]
    };

    // Add the new user to the in-memory state
    this.state.users.push(newUser);
    saveState(this.state);

    return newUser;
  }

  // Find a user by accessToken
  findUserByAccessToken(token: string): User | undefined {
    return this.state.users.find(user => user.accessToken === token);
  }

  // Find a user by email (to prevent duplicates)
  findUserByEmail(email: string): User | undefined {
    return this.state.users.find(user => user.email === email);
  }
}
