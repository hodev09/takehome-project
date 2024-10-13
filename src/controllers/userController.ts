import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { State, User } from "../types/types";

// Define the expected structure for the request body
interface CreateUserRequest {
  name: string;
  email: string;
}

export class UserController {
  private userService: UserService;

  constructor(state: State) {
    this.userService = new UserService(state);
  }

  // Fetch all users (GET /api/users)
  getAllUsers = (req: Request, res: Response): void => {
    const users: User[] = this.userService.getAllUsers();
    res.json(
      users.map(user => ({
        name: user.name,
        email: user.email,
        created: user.created,
        updated: user.updated,
        accessToken: user.accessToken,
      }))
    );
  };

  // Create a new user (POST /api/users)
  createUser = (req: Request<{}, {}, CreateUserRequest>, res: Response): Response | void => {
    const { name, email } = req.body;

    // Basic validation for required fields
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    // Check if user already exists (optional step, can be done in service)
    const existingUser = this.userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists." });
    }

    // Create user
    const newUser: User = this.userService.createUser(name, email);

    return res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      accessToken: newUser.accessToken,
    });
  };

  // Fetch all users (GET /api/users)
  getQuotaLogs = (req: Request, res: Response): void => {
    const user = (req as any).user;
    res.json({
      name: user.name,
      email: user.email,
      dailyQuotaPointsUsed: user.dailyQuotaPointsUsed,
      remaingDailyQuota:user.defaultDailyQuota-user.dailyQuotaPointsUsed,
      totalQuotaPoints : user.defaultDailyQuota,
      quotaUsageLog: user.quotaUsageLog,
    });
  };
}
