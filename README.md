# Kantin Sehat Application for Software Engineer Academy Compfest 2022

## Getting Started
Use two terminal. One for frontend, otherwise for backend.

- Lets go to separate each terminal

**Backend Terminal**
```
cd backend
```

**Frontend Terminal**
```
cd frontend
```

### Backend Terminal
- Open folder backend
- Open config
- Modified config.js as your local development and set your settings development, for example:
```
{
  "development": {
    "username": "postgres",
    "password": "fajarganteng", 
    "database": "kantin_sehat",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```
- Create file .env
- Fill that env like on .env_example
```
SECRET_REFRESH_TOKEN=fajargantenbanget [use your refresh token]
SECRET_ACCESS_TOKEN=fajargantenbanget [user your secret acces token]
PORT=8080
```
- Install yarn global
```
npm install --global yarn
```
- Install sequlize-cli global
```
npm install --g sequelize-cli
```
- Install dependencies
```
yarn
```
- Create your own database that related with username development in config.js
- Migrate Database
```
npx sequelize-cli db:migrate
```
- Run seed data
```
npx sequelize-cli db:seed:all
```
**Note:** Anda dapat menggunakan akun seeding dengan 
```
student id: 45615
password: 12345
```
- Run your backend server
```
yarn dev
```
- Now you can running backend server at http://localhost:8080

### Frontend Terminal
- Open folder frontend
- Install dependencies
```
yarn
```
- Run your server
```
yarn start
```
- Now you can running frontend server at http://localhost:3000

### Conclusion
- After you follow through above section, you can use website on http://localhost:3000
- Anda dapat login dengan menggunakan akun seeding.
```
student id: 45615
password: 12345
```

## Backend Powered Using
- Express.js
- PostgreSQL
- jsonwebtoken
- bcrypt
- cookie-parser
- cors
- dotenv
- Sequelize
- Sequelize-cli

## Frontend Powered Using
- React.js
- React hook
- Javascript
- Axios
- Bootstrap 5
- jwt-decode

## Features
- **Login**\
 i. Insert student ID and password that is registered\
 ii. Only registered student can login to the canteen

- **The Store**\
 i. Unregistered user can only view the listed items in store\
 ii. Unregistered user cannot see the canteen's balance\
 iii. User that logged in as student can add and buy any items in the canteen

- **The Canteen's Balance Box**\
 i. Only logged in user can add or withdraw money (in Rupiah) to the canteen's balance.

- **Register**\
 i. Anyone can register account

- **Logout**\
 i. User logged in can be logout

## Notice
- Images post not handled yet

## Speciality
- Implemented JWT (JSON Web Token) for authentication.
- Successfully make access token stored in the stage variable and save the refresh token only at HTTP only cookies
- Safety from cross-site scripting and cross-site request forgery attack.

## Contact
**Fajar Muhammad Hamka** - fajarmh2@gmail.com\
**Instagram:** [@fajarrmh_](https://www.instagram.com/fajarrmh_/?hl=en)\
**Linkedin:** [Fajar Muhammad Hamka](https://www.linkedin.com/in/fajarhamka/)