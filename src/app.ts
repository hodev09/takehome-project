import express from "express";
import { mockService } from "./mockService/server";
import { State } from "./types/types";
import { initialConfiguration } from "./utils";
import { UserController } from "./controllers/userController";
import { authenticateUser } from "./middlewares/authMiddleware";
import { perSecondLimiter, perDayLimiter } from "./utilities/rateLimiter";


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
// TODO(SHIP): Implement the user routes
app.get("/api/users",userController.getAllUsers);

// Get a user by id
// TODO(SHIP): Implement the user routes
app.post("/api/users", userController.createUser);

// ********************
// Resource Routes
// ***

// Get all recipients
app.get("/api/recipients", async (req, res) => {
  res.json(state.recipients);
});

// Submit a recipient for processing
// TODO(SHIP): Implement the submit endpoint
app.post("/api/submit",authenticateUser(state),perSecondLimiter,perDayLimiter, async (req, res) => {
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
