<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Mavano Sports — Backend API

The REST API powering the Mavano Sports platform. Built with NestJS and Prisma, handling authentication, role-based access control, session management, and booking workflows.

---

## Features

- **Modular Architecture** — Clean separation with dedicated modules for Auth, Users, Sessions, and Bookings
- **Role-Based Access Control** — JWT Guards enforce that only Coaches can create sessions and only Students can book them
- **Secure Authentication** — bcrypt password hashing and stateless JWT token validation via Passport
- **Double-Booking Prevention** — Database-level `@@unique([userId, sessionId])` constraint prevents a student from booking the same session twice
- **Cascade Handling** — Child bookings are removed before parent sessions to prevent PostgreSQL constraint errors on delete
- **Input Validation** — Server-side validation using `class-validator` on all incoming request bodies

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS |
| Language | TypeScript |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | Passport JWT, bcrypt |
| Validation | class-validator |

---

## Getting Started

### Prerequisites
- Node.js v18 or later
- PostgreSQL instance (local or cloud — Neon or Supabase recommended)

### Installation

```bash
git clone https://github.com/thomasalex122/Mavanos-coaching-api.git
cd Mavanos-coaching-api
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mavano_db"
JWT_SECRET="your_secure_signature_key_here"
```

### Database Setup

Push the schema to your PostgreSQL instance and generate Prisma types:

```bash
npx prisma db push
npx prisma generate
```

### Run Development Server

```bash
npm run start:dev
```

API runs at [http://localhost:3000](http://localhost:3000) by default.

---

## Database Schema

```
User
├── id, name, email, password
├── role: COACH | STUDENT
├── sessions (if COACH)
└── bookings (if STUDENT)

Session
├── id, title, sport, location, date, maxSlots, price
└── coachId → User

Booking
├── id
├── userId → User
├── sessionId → Session
└── @@unique([userId, sessionId])
```

---

## API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /auth/register | Public | Register a new student |
| POST | /auth/login | Public | Login and receive JWT token |
| GET | /sessions | Student | View all available sessions |
| POST | /sessions | Coach | Create a new session |
| DELETE | /sessions/:id | Coach | Delete a session |
| POST | /bookings | Student | Book a session |
| GET | /bookings/my | Student | View personal bookings |

---

## Related

[Mavano Sports Frontend Repository](https://github.com/thomasalex122/mavanos-coaching-frontEnd)
