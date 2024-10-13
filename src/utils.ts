import fs from "fs";
import { createFakeRecipient, generateFakeUser } from "./mocks/mocker";
import { Recipient, State, User } from "./types/types";

// Load existing recipients or create new ones
export const initialConfiguration = (): State => {
  const dataDir = "./src/data";
  const recipientsFilePath = `${dataDir}/recipients.json`;
  const usersFilePath = `${dataDir}/users.json`;

  // Ensure both files exist
  if (!fs.existsSync(recipientsFilePath)) {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(recipientsFilePath, "[]");
  }

  if (!fs.existsSync(usersFilePath)) {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(usersFilePath, "[]");
  }

  // Read recipients from file
  let recipients : Recipient[] = JSON.parse(fs.readFileSync(recipientsFilePath, "utf8")) || [];
  if (recipients.length === 0) {
    recipients = new Array(2000).fill(0).map(() => createFakeRecipient());
    fs.writeFileSync(recipientsFilePath, JSON.stringify(recipients), "utf8");
  }

  // Read users from file
  let users : User[] = JSON.parse(fs.readFileSync(usersFilePath, "utf8")) || [];
  if (users.length === 0) {
    users = [generateFakeUser()];
    fs.writeFileSync(usersFilePath, JSON.stringify(users), "utf8");
  }

  // Create unified in-memory state
  const state: State = {
    recipients,
    users,
  };

  return state;
};

// Save state (recipients and users) to separate files
export const saveState = (state: State) => {
  const dataDir = "./src/data";
  const recipientsFilePath = `${dataDir}/recipients.json`;
  const usersFilePath = `${dataDir}/users.json`;

  // Save recipients and users separately
  fs.writeFileSync(recipientsFilePath, JSON.stringify(state.recipients), "utf8");
  fs.writeFileSync(usersFilePath, JSON.stringify(state.users), "utf8");
};
