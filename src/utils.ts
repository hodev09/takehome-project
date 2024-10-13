import fs from "fs";
import { createFakeRecipient, generateFakeUser } from "./mocks/mocker";
import { State } from "./types/types";

// Load existing recipients or create new ones
export const initialConfiguration = (): State => {
  const dataDir = "./src/data";
  const filePathUrl = `${dataDir}/recipients.json`;
  try {
    fs.accessSync(filePathUrl);
  } catch (err) {
    fs.mkdirSync("./src/data", { recursive: true });
    fs.writeFileSync(filePathUrl, "[]");
  }
  let save = false;

  var obj: State = JSON.parse(fs.readFileSync(filePathUrl, "utf8")) || {};

  // Try to extract recipients
  if (!obj.recipients) {
    const recipients = new Array(2000).fill(0).map(() => createFakeRecipient());
    obj.recipients = recipients;
    save = true;
  }

  if (!obj.users) {
    save = true;
    const user = generateFakeUser();
    obj.users = [user];
  }

  const endState: State = {
    recipients: obj.recipients,
    users: obj.users,
  };

  if (save) {
    fs.writeFileSync(filePathUrl, JSON.stringify({ ...obj }), "utf8");
  }

  return obj;
};
