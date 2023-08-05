# Lottery Api

Lottery Api is a simple api to create and manage lottery games.

## Preview

![Preview](/docs/imgs/struct.png)

### Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Docker
- Github Actions (CI/CD)
- JWT
- Gmail API (https://developers.google.com/gmail/api)
- Telegram Log Bot (https://www.npmjs.com/package/telegraf)
- OTP
- SSL Certificate
- Node Schedule (https://www.npmjs.com/package/node-schedule)

### Features

- Create and manage lottery games
- User authentication and authorization
- Automatic lottery draws
- OTP verification
- Email verification

## API Documentation

### Installation and build

```js
npm install
npm run build
npm run dev
```

### Docker Build

```js
docker build -t lottery-api .
docker run -p 8080:9000 lottery-api
```

### Github Actions

```js
npm run test
npm run build
```

### Development

```js
npm run dev
```

### Automatic Lottery Draws

This server will automatically draw the lottery game based on the cron expression. The cron expression is stored in the database. The cron expression can be changed by the admin and expression is in the format of [node-cron](https://www.npmjs.com/package/node-cron).

It calculates the next draw time based on the cron expression and stores it in the database. The next draw time is used for the countdown timer in the frontend.

### Environment variables

test.env file should placed in same directory with docker-compose.yml file.
Docker-compose file will automatically load environment variables from test.env file.

| Name                | Description               | Default     |
| ------------------- | ------------------------- | ----------- |
| MONGO_URI           | MongoDB connection string | SECRET      |
| PORT                | Port number               | 9000        |
| NODE_ENV            | Node environment          | development |
| API_VERSION         | Api version               | v1          |
| JWT_SECRET          | JWT secret key            | SECRET      |
| RESEND_API_KEY      | Resend api key            | SECRET      |
| GMAIL_CLIENT_ID     | Gmail client id           | SECRET      |
| GMAIL_CLIENT_SECRET | Gmail client secret       | SECRET      |
| GMAIL_REDIRECT_URI  | Gmail redirect uri        | SECRET      |
| GMAIL_ACCESS_TOKEN  | Gmail access token        | SECRET      |
| GMAIL_REFRESH_TOKEN | Gmail refresh token       | SECRET      |
| GMAIL_TYPE_TOKEN    | Gmail type token          | SECRET      |
| GMAIL_SCOPE_TOKEN   | Gmail scope token         | SECRET      |
| GMAIL_EXPIRE_TOKEN  | Gmail expire token        | SECRET      |
| TELEGRAM_BOT_TOKEN  | Telegram bot token        | SECRET      |
| WELL_KNOWN_URL      | Well known url            | SECRET      |
| WELL_KNOWN_CONTENT  | Well known content        | SECRET      |

### API Endpoints

Most of the endpoints require authorization. To authorize, you need to send a request with a header containing the token. The token is obtained after login or registration.

Documentation is available at [http://localhost:9000/api-docs](http://localhost:9000/api-docs)

#### Auth

| Method | Endpoint                 | Description   |
| ------ | ------------------------ | ------------- |
| POST   | /api/auth/register/email | Register user |
| POST   | /api/auth/register/otp   | Verify user   |
| POST   | /api/auth/login          | Login user    |
| POST   | /api/auth/login/otp      | Verify user   |

#### Games

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/games     | Get all games  |
| GET    | /api/games/:id | Get game by id |
| POST   | /api/games     | Create game    |

#### Draws

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/draws     | Get all draws  |
| GET    | /api/draws/:id | Get draw by id |

#### Tickets

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| GET    | /api/tickets     | Get all tickets  |
| GET    | /api/tickets/:id | Get ticket by id |
| POST   | /api/tickets     | Create ticket    |
| POST   | /api/tickets/:id | Buy ticket       |

### SSL Certificate

Create ssl certificate with certbot.

```js
certbot certonly --manual
```

Copy the certificate files to ssl folder which is located side by docker-compose.yml file.

```js
cp * /etc/letsencrypt/live/domainname /path/to/ssl/folder
```
