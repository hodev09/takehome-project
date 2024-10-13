import { Request, Response, NextFunction } from "express";
import { State } from "../types/types"; // Assuming you have a State type definition
import { UserService } from "../services/userService";

export const authenticateUser = (state: State) => {
    
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access token is required" });
    }
    
    const userService = new UserService(state);
    const user = userService.findUserByAccessToken(token); // Assuming this method exists

    if (!user) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Type assertion to add the 'user' property to the request object
    (req as any).user = user;

    next(); // Proceed to the next middleware/route handler
  };
};