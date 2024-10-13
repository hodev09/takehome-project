import { Request, Response, NextFunction } from "express";
import { State } from "../types/types";
import { saveState } from "../utils";

export const deductQuotaMiddleware = (state: State) => {
    
  return (req: Request, res: Response, next: NextFunction) => {
    //authenticated request should have a user object in it
    const user = (req as any).user; 

    if (!user) {
      return res.status(401).json({ message: "Something unexpected happened.!" });
    }

    if(res.statusCode == 200){
        user.dailyQuotaPointsUsed++;
        user.quotaUsageLog.push(new Date());
        saveState(state);
    }

    next(); // Proceed to the next middleware/route handler
  };
};