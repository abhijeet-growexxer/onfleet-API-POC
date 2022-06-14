# Onfleet API (Pickup & Drop Service System)

An API for managing pickup and drop services using Onfleet API Wrapper.

Onfleet is a software delivery company whioch focuses on solving services related to pickup and delivery system,

## Features

- Online driver/worker tracking
- Allows delivery and pickup task creation
- Login Authentication for drivers and customers

## Dependencies

- [node.js] - Env for creating the application
- [Express] - For creating different routes and servicing requests.
- [@Onfleet/node-onfleet] - API Wrappers for code integration and usage
- [dotenv] - For credentials and keys
- [nodemon] - global package for server listening events

# Plugins and apps required

- [Github]
- [Postman]

## Compatibility

- Created and Compatible with node 14+ and npm 6+

### Installation

You may require github account and tools such as git bash or git desktop to clone or save the project in your local system

- git clone the project using the [repo-url]
- Run the following commands on terminal

```sh
cd onfleet-api (if you are not in the project's root directory)
npm install (to install all the required dependencies)
npm start (requires nodemon)
```

To test the app open your browser and got to open 127.0.0.1:3000/

# Routes

`/teams` [ create, update, read, read single and delete]

- Teams are collection of admins, managers and drivers

`/drivers` [ create, update, read, read single and delete]

- Managing drivers (details require team id for creation of a driver)

`/tasks` [ create, update, read, read single and delete]

- any pickup or delivery service

# testing routes

```sh
127.0.0.1:3000/tasks
127.0.0.1:3000/driver
127.0.0.1:3000/teams
```

# Authentication

Requires an API key, created directly by the admin (super user) using the onfleet dashboard (api and webhooks options)

# Tasks

### creating a task

```sh
POST request to /tasks
{
    "destination": {
        "address": {
            "number": "<Number component of the address (Can also contain letters) eg: a-305>",
            "street": "<street name or number>",
            "city": "<name of the city>",
            "country": "<name of the country>",
            "apartment": "<optional>",
            "postal code": "<optional>"
        },
        "notes": "<landmark or instructions to be following while performing the task>"
    },
    "recipient":{
         "name": "<name of the recipient/customer of the task>",
         "notes": "<Non task sepcific customer notes>"
    },
    "pickupTask": "<True or False whether a task pickup or drop>",
    "autoAssign": {"mode": "<Can be distance or load>"}
}
```

For more on different parameters you can refer: [onfleetApi_tasks]

#### Note:

- Parameter `unparsed` : you can also use this property writing address adding address in one line (comma seperated).
- Inside `autoassign` object:
  - `Destination`: task will be assigned to the driver being nearest to the destination.
  - `Load`: Assigns task to the driver based on the current location and the active task being served
  - Autoassign property assigns drivers with state = 1 or 2.

The following returns the task Id of the newly created task.

### Get all Tasks

```sh
Get request to /tasks/all/< from date in YYYY-MM-DD format >
```

- Here by default the to date is assumed as the current date.

### Get single task

```sh
Get request to /tasks/< task_Id >
```

### Update a task

```sh
Put request to /tasks/< task_Id >
request body can be an object as the example below:
{"worker": workerId}
```

### Delete a task

```sh
DELETE request to /tasks/Task_Id
```

# Teams

### creating a team

```sh
POST request to /teams
{
    "name": "<Any name for the team>",
    "workers": [ "an array containing worker ids" ],
    "managers": [ "an array containing manager ids"],
    "hub": "<id of the hub>"
}
```

#### Note:

- Parameter `hub` is a home base for the team, can be a location from where all the deliveries originate.

The following returns the task Id of the newly created team.

### Get all Teams

```sh
Get request to /teams
```

### Get single team

```sh
Get request to /teams/< team_Id >
```

### Update a team

```sh
Put request to /teams/< team_Id >
request body can be an object as the example below:
{"name": "new name of the team" }
```

### Delete a team

```sh
DELETE request to /teams/< team_Id >
```

# Worker or driver

1. creating a driver

```sh
POST request to /driver
{
    "name":"name of the driver",
    "phone":"phone number of the driver without country code",
    "teams": ["team ids"],
    "vehicle":{
        "type":"can be 'CAR', 'MOTORCYCLE', 'BICYCLE' or 'TRUCK' ",
        "description":"model name and number",
        "color":"color of the vehicle"
    }
}
```

The following returns the driver Id of the newly created driver.

#### Note:

- Parameter `vehicle` is optional.
- As soon as a driver is created an sms is sent to the driver with the account credentials.
- The driver has to use the onfleet app to login using the registered phone number and password sent via sms.
- After login the driver has to reset the password for further personlized usage.

### Get all Drivers

```sh
Get request to /driver
```

### Get single driver

```sh
Get request to /driver/< driver_Id >
```

### Update a driver

```sh
Put request to /driver/< driver_Id >
request body can be an object as the example below:
{"name": "<name of the driver>" }
```

### Delete a driver

```sh
DELETE request to /driver/< driver_Id >
```

# Pricing Details

- Refer link [Onfleet-Pricing]
  [node.js]: http://nodejs.org
  [express]: http://expressjs.com
  [postman]: https://www.postman.com/
  [onfleetapi_tasks]: https://docs.onfleet.com/reference/create-task
  [@onfleet/node-onfleet]: https://www.npmjs.com/package/@onfleet/node-onfleet
  [dotenv]: https://www.npmjs.com/package/dotenv
  [github]: https://github.com/
  [nodemon]: https://nodemon.io/
  [repo-url]: https://github.com/abhijeet-growexxer/onfleet-API-POC.git
  [onfleet-pricing]: https://onfleet.com/pricing
