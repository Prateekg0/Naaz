# Naaz

Naaz is a small Node.js and Express shopping app. It renders EJS pages, stores users, owners, and products with MongoDB through Mongoose, and includes user registration/login, a product listing, and a cart.

## Requirements

- Node.js (LTS recommended)
- npm
- MongoDB: either a local MongoDB server or a MongoDB Atlas cluster

## Install and run

1. Open a terminal in the project directory (the directory containing `package.json`).
2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables described below.
4. Start the app:

   ```bash
   node app.js
   ```

   The current app listens on port `3000`. Open <http://localhost:3000>.

There is currently no `start` script in `package.json`; `node app.js` is the command that works with the provided project. The development-only owner creation route also requires `NODE_ENV=development`.

## MongoDB connection

The project already uses Mongoose. Its connection is configured in `config/mongooseConnection.js` and currently reads `MONGO_URI` from `config/development.json`, whose default points to a local MongoDB server at `mongodb://127.0.0.1:27017`. The code appends `/Naaz` as the database name.

### Use local MongoDB

Start your local MongoDB server and keep the existing URI in `config/development.json`. The app will use the `Naaz` database, creating it on first write if it does not already exist.

### Use MongoDB Atlas

1. Create an Atlas cluster and a database user. In Atlas Network Access, allow the IP address of the machine running this app.
2. Copy the Atlas **Node.js driver connection string**. Replace `<db_password>` with the database user's password. If the password contains reserved URI characters, URL-encode them.
3. Keep the URI and other secrets in `.env`, not in source control. For example:

   ```dotenv
   MONGO_URI=mongodb+srv://<db_user>:<db_password>@<cluster-host>/Naaz?retryWrites=true&w=majority
   JWT_KEY=replace-with-a-long-random-secret
   EXPRESS_SESSION_SECRET=replace-with-another-long-random-secret
   ```



The connection module should follow this pattern:

```js
// Set MONGO_URI in the hosting provider's environment settings.
```

The committed `config/development.json` contains only the local fallback URI. Do not put Atlas credentials in that file.

## Environment variables

The app uses these variables:

| Variable | Purpose |
| --- | --- |
| `MONGO_URI` | MongoDB connection string (recommended to load from `.env` for Atlas) |
| `JWT_KEY` | Signs and verifies user login tokens |
| `EXPRESS_SESSION_SECRET` | Signs Express session cookies |

## Project layout

```text
config/         Mongoose and upload configuration
controllers/    Registration and login handlers
middlewares/    Authentication middleware
models/         Mongoose schemas for users, owners, and products
routes/         Express route handlers
views/          EJS page templates
public/         Static styles and product images
app.js          Express app entry point
```

## Current MongoDB models

- `user`: account details and cart references to products
- `owner`: store owner details and product list
- `product`: name, price, discount, colors, and image data

