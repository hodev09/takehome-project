import { Request, Response, NextFunction } from "express";
import { State } from "../types/types";

export const checkUserDailyQuota = (state: State) => {
    
  return (req: Request, res: Response, next: NextFunction) => {
    //authenticated request should have a user object in it
    const user = (req as any).user; 

    if (!user) {
      return res.status(401).json({ message: "Something unexpected happened.!" });
    }

    const lastResetDate = new Date(user.lastQuotaReset);
    const now = new Date();
    const timeDifference = now.getTime() - lastResetDate.getTime();  // Difference in milliseconds
    const hoursPassed = timeDifference / (1000 * 60 * 60); // Convert to hours
    
    if (hoursPassed >= 24) {
        // Reset daily quota usage
        user.dailyQuotaPointsUsed = 0;
        user.lastQuotaReset = now; // Update the reset date and time
    }
    else{
      if(user.dailyQuotaPointsUsed >= user.defaultDailyQuota){
        return res.status(401).json({ message: "You have exceeded the your max quota requests in 24 hours limit." });
      }
    }

    next(); // Proceed to the next middleware/route handler
  };
};