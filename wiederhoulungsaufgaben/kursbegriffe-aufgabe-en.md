# Course Terms and Abbreviations

This overview collects the central terms, abbreviations, and principles from the backend course from Week 1 through September 15, 2026. Research their meanings yourself and add your own notes.

## Abbreviations

- API
- URL
- HTTP
- HTTPS
- REST
- CRUD
- JSON
- ESM
- CommonJS
- npm
- REPL
- SQL
- NoSQL
- ORM
- ODM
- ACID
- MVCC
- PK
- FK
- 1NF, 2NF, 3NF
- JWT
- MFA
- 2FA
- TOTP
- OAuth 2.0
- OIDC
- SSO
- CSRF
- XSS
- CORS
- OWASP
- SDK
- SaaS
- DBMS

## Week 1: Node.js, npm, and Express Fundamentals

- Node.js
- Backend
- Client-server model
- Event Loop
- Asynchronous programming
- Module
- `package.json`
- `package-lock.json`
- `dependencies`
- `devDependencies`
- `node_modules`
- Semantic versioning
- Express.js
- Middleware
- Route
- Handler
- Static route
- Dynamic route
- Route parameters
- Query parameters
- `req`
- `res`
- `next()`
- `next(err)`
- JSON middleware

## HTTP, APIs, and CRUD

- Request
- Response
- HTTP method
- Endpoint
- Request body
- Header
- Status code
- `200 OK`
- `201 Created`
- `204 No Content`
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `500 Internal Server Error`
- REST resource
- `PUT`
- `PATCH`
- 404 fallback
- Central error handling
- In-memory storage
- Postman
- Pre-request
- Response test

## Databases and Data Models

- Database
- Database server
- Relational database
- Table
- Row / record
- Column
- Data type
- PostgreSQL
- Postgres
- `psql`
- pgAdmin
- MongoDB
- MongoDB Atlas
- Document
- Collection
- Mongoose
- Schema
- Model
- Relation
- One-to-many
- Normalization
- Constraint
- `PRIMARY KEY`
- `FOREIGN KEY`
- `UNIQUE`
- `NOT NULL`
- `CHECK`
- `DEFAULT`
- Index
- SQL query
- `CREATE DATABASE`
- `CREATE TABLE`
- `INSERT`
- `SELECT`
- `WHERE`
- JOIN
- Transaction
- Rollback
- JSONB
- Prisma
- Prisma Schema
- Prisma Client
- Prisma Migrate
- Query Builder
- Drizzle

## Authentication and Sessions

- Authentication
- Authorization
- Identity
- Password hash
- Salt
- Hashing
- Argon2id, scrypt, bcrypt
- Brute force
- Credential stuffing
- Phishing
- Session
- Session ID
- Session store
- Cookie
- Session cookie
- `HttpOnly`
- `Secure`
- `SameSite`
- Session fixation
- Session hijacking
- Session regeneration
- Session timeout
- Sliding expiration
- Bearer token
- Passkey
- WebAuthn
- Clerk
- Auth-as-a-Service
- Vendor lock-in

## JWT and Token Security

- JWT header
- JWT payload
- Claim
- JWT signature
- Base64URL
- JWS
- `HS256`
- `RS256`
- `sub`
- `iss`
- `aud`
- `exp`
- `nbf`
- `iat`
- `jti`
- `jsonwebtoken`
- `jwt.sign()`
- `jwt.verify()`
- `jwt.decode()`
- Refresh token
- Token rotation
- Token revocation

## API Security and CORS

- Attack surface
- Input validation
- Parsing
- Normalization
- Allowlist / whitelist
- Denylist / blacklist
- Injection
- SQL injection
- NoSQL injection
- Command injection
- Broken Object Level Authorization
- Broken Object Property Level Authorization
- Mass assignment
- Data minimization
- Rate limiting
- Unrestricted resource consumption
- Security misconfiguration
- Same-origin principle
- Origin
- Cross-origin request
- CORS headers
- Preflight
- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`
- HTTPS/TLS
- Logging
- Monitoring
- Deny by default
- Never trust the client
