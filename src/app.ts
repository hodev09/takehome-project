import express from "express";
import { mockService } from "./mockService/server";
import { State, User } from "./types/types";
import { initialConfiguration, saveState } from "./utils";
import { UserController } from "./controllers/userController";
import { authenticateUser } from "./middlewares/authMiddleware";
import { perSecondLimiter, perDayLimiter } from "./utilities/rateLimiter";
import { checkUserDailyQuota } from "./middlewares/dailyQuotaMiddleware";


// Welcome to your express server. We'll be adding some methods over here to design a robust API system in place!
const app = express();
const port = 8080;

// NOTE: We'll be using this state variable to store the recipients. This is a simple in-memory store.
const state: State = initialConfiguration();

// Middleware for parsing JSON request bodies
app.use(express.json());  // This is essential to handle JSON data

// A mock service that is used to simulate a real service integration.
const service = mockService;
// Initialize UserController
const userController = new UserController(state);

app.get("/", (req, res) => {
  res.send("Good luck 💥!");
});

// ********************
// User Routes
// ***

// Get all users
app.get("/api/users",userController.getAllUsers);

// Get a user by id
app.post("/api/users", userController.createUser);

//Get a user's quota if the user want to see his remaining quota for the day..
app.get("/api/user/quota",authenticateUser(state),userController.getQuotaLogs);

// ********************
// Resource Routes
// ***

// Get all recipients
app.get("/api/recipients", async (req, res) => {
  res.json(state.recipients);
});

// Submit a recipient for processing
// TODO(SHIP): Implement the submit endpoint
app.post("/api/submit",authenticateUser(state),checkUserDailyQuota(state),perSecondLimiter, async (req, res) => {
  const body = req.body;
  const id = "fakeid";
  
  // TODO(SHIP): Call the submit endpoint
  const url = `${service.url}/process`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  //doing this here because the mock server can also return 500 and 400, which means user was not able to use the quota..
  if(response.status==200){
    const user: User | undefined = state.users.find(user => user.email === (req as any).user.email);
    if(user){
      user.dailyQuotaPointsUsed++;
      user.quotaUsageLog.push(new Date());
      saveState(state);
    }
  }

  const jsonRes = await response.json();
  res.json(jsonRes);
});

// **
// Running the app & ancillary service
// *

service.start();
app.listen(port, () => {
  console.log(`✅ Your API has loaded at http://localhost:${port}`);
});
