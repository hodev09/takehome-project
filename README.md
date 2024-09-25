# Engineering Take Home Assignment

#### Table of Contents

- [Introduction](#introduction)
- [Your Tasks](#your-tasks)
- [Submitting Your Project](#submitting-your-project)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Recipient Endpoints](#recipient-endpoints)
  - [Process Endpoint](#process-endpoint)
- [Appendix / Additional Information](#appendix-additional-information)
  - [Mock Service](#mock-service)
    - [Get Users](#get-users-1)
    - [Process User](#process-user)
  - [Configuration](#configuration)
  - [Initial Configuration](#initial-configuration)
  - [Types](#types)
  - [Mock Data](#mock-data)
  - [Dependencies](#dependencies)

## Introduction

This project is a backend service designed to understand how you reason around building an API. This service is built using TypeScript and Node.js, and it includes a mock service to simulate an external API.

> [!TIP]
> This assignment should take you no more than one or two hours. (We don't want to take up too much of your time!) If you find yourself spending more time than that, feel free to stub out parts you don't have time to complete, and we can discuss them during the interview.
>
> The goal of this project is to help provide context around a problem space of load balancing requests for an API that you are designing. We'll take the solution that you provide and discuss it during our interview.

A few things to keep in mind:

- This project should run standalone, so you don't need to worry about persistence. Please do not add dependencies that require additional configuration!
- We're looking for a solution that is simple, clean, and well-structured.
- We're not looking for a production-ready solution, we're looking for a solution that is well thought out and easy to understand.
- We'll take the solution that you provide and use that as the foundation for our interview.

Thank you for taking the time to complete this assignment. We're excited to see what you come up with!

# Starting & Your Project

Please clone this repository to get started.

When your project is ready for review, please export your project into a zip file (excluding the node_modules folder). Use Google Drive, Dropbox, OneDrive, or similar file upload service to host your project, then share a link so we can download this file. Please do not submit a PR to submit your project.

## Your Tasks

#### 1. Implement User Routes & Creation

- Implement user creation & fetching logic for the [`POST /api/users`](src/app.ts) and [`GET /api/users`](src/app.ts) endpoints.

#### 2. Add Authentication to the Process Endpoint

> The Submit endpoint is not protected by authentication. Please add authentication using your choice of method.

- Add authentication to the [`POST /api/submit`](src/app.ts) endpoint. You can use the `accessToken` field from the [`User`](src/types.ts) model.

#### 3. Add Rate Limiting

> We want to limit the number of requests a user can create to our API in a single day and in bursts. Please implement the following rate limits on a per-account basis:

- Add a rate limit of 1 request per second to the [`POST /api/submit`](src/app.ts) endpoint.
- Add a rate limit of 100 requests per day to the [`POST /api/submit`](src/app.ts) endpoint.

### Stretch Goals

#### 4. Log Usage (Stretch Goal)

> We want to keep track of how many quota points a user has used, and when they have used them. Please create a solution around the following:

- Please propose a solution to track usage of the [`POST /api/submit`](src/app.ts) endpoint.

## Setup Instructions

1. **Install Dependencies**

   ```sh
   pnpm i
   ```

2. **Run the Development Server**

   ```sh
   pnpmi dev
   ```

   This will start the main service on port `8080` and the mock service on port `8888`.

## API Endpoints

### User Endpoints

#### Get Users

- **URL:** `/api/users`
- **Method:** `GET`
- **Description:** Returns a list of users.

#### Create User

- **URL:** `/api/users`
- **Method:** `POST`
- **Description:** Creates a new user.

### Recipient Endpoints

#### Get Recipients

- **URL:** `/api/recipients`
- **Method:** `GET`
- **Description:** Returns a list of recipients.

### Process Endpoint

#### Submit

- **URL:** `/api/submit`
- **Method:** `POST`
- **Description:** Submits a request to process a user.

# Appendix / Additional Information

### Mock Service

The mock service is designed to simulate an external API. It includes the following endpoints:

#### Get Users

- **URL:** `/users`
- **Method:** [`GET`](src/app.ts)
- **Description:** Returns a list of users.

#### Process User

- **URL:** `/process`
- **Method:** [`POST`](src/app.ts)
- **Description:** Processes a user and returns a success message with the user id and processed value.

For more details, refer to the [Mock Service README](src/mockService/README.md).

### Configuration

The project uses `nodemon` for development. The configuration can be found in [`nodemon.json`]().

### Initial Configuration

The initial configuration logic is implemented in the `initialConfiguration` function in [`src/utils.ts`](src/utils.ts). This function initializes the recipients and users data.

### Types

The project uses TypeScript interfaces to define the data structures. The interfaces can be found in [`src/types.ts`](src/types.ts).

### Mock Data

Mock data generation is implemented in [`src/mocks/mocker.ts`](src/mocks/mocker.ts). This file includes functions to create fake recipients and users.

### Dependencies

The project dependencies are listed in [`package.json`](/package.json). Key dependencies include:

- `express`
- `@faker-js/faker`
- `express-rate-limit`
- `ts-node`
- `typescript`
