# 🔐 Secrets App

A full-stack authentication app that lets users anonymously share their secrets. This project demonstrates various levels of security and authentication, including password hashing, sessions, and OAuth login via Google.

---

## 📆 Requirements

### 🧱 Base Setup

Install with:

```bash
npm install express ejs body-parser dotenv
```

Optional:

```bash
npm install nodemon --save-dev
```

---

## 🔐 Authentication Levels

### **Level 1 – No Encryption**

* Stores credentials in plaintext (not secure, for learning only).

### **Level 2 – Password Hashing**

Use `bcrypt` to hash passwords:

```bash
npm install bcrypt
```

### **Level 3 – Authentication with Passport**

Install:

```bash
npm install passport passport-local passport-local-mongoose express-session
```

Uses:

* `passport-local-mongoose` for simplifying user registration and login.
* `express-session` for session handling.

### **Level 4 – Google OAuth Integration**

Install:

```bash
npm install passport-google-oauth20 mongoose-findorcreate
```

---

## 🔧 Google OAuth Setup

Follow these steps to enable Google login:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. **Create a new project** (e.g., `SecretsApp`)
3. Navigate to **APIs & Services → OAuth Consent Screen**

   * Select **External**, click **Create**
   * Fill app name, user support email, etc. → Save & Continue
4. **Scopes**: Click *Add or Remove Scopes* and select:

   * `../auth/userinfo.email`
5. Skip test users → Save & Continue
6. Go to **Credentials → Create Credentials → OAuth Client ID**

   * Application type: **Web Application**
   * Authorized JavaScript origins:
     `http://localhost:3000`
   * Authorized redirect URIs:
     `http://localhost:3000/auth/google/secrets`
7. Click **Create**
8. **Copy your Client ID and Secret**

Add them to your `.env` file:

```
CLIENT_ID=your-client-id-here
CLIENT_SECRET=your-client-secret-here
```

---

## 💠 Running the App

Start the server with:

```bash
node app.js
```

or if using nodemon:

```bash
npx nodemon app.js
```

Visit:

```
http://localhost:3000
```

---

## ✨ Features

* Anonymous secret sharing
* Local authentication with hashed passwords
* Google OAuth 2.0 login
* Session-based login persistence

---

## 📁 Project Structure

```
Secrets/
│
├── views/
│   ├── home.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── secrets.ejs
│   └── submit.ejs
├── public/
│   └── styles.css
├── .env
├── app.js
└── package.json
```

---

## 📌 Note

This project is for educational purposes. Do not store real secrets in production without HTTPS, advanced security, and proper user consent.

---

## 🧠 Inspired By

Angela Yu's Web Development Bootcamp – with enhancements and updates for current Mongoose and Node.js best practices.
