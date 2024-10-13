import { faker } from "@faker-js/faker";
import { Recipient, User } from "../types/types";

export const createFakeRecipient = (): Recipient => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    created: faker.date.past(),
    updated: faker.date.recent(),
    imageUrl: faker.image.url({
      height: 300,
      width: 300,
    }),
  };
};

export const generateAccessToken = (): string => {
  return faker.string.alphanumeric(20);
};

export const generateFakeUser = (): User => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    created: faker.date.past(),
    updated: faker.date.recent(),
    accessToken: generateAccessToken(),
    defaultDailyQuota : 100,
    dailyQuotaPointsUsed:0,
    lastQuotaReset:new Date(),
    quotaUsageLog:[]
  };
};
