## Admin credentials
```
Email: - test@gmail.com
Password: - test
```   

## Frontend Url
```
https://e-commerce-two-virid.vercel.app/
```

## Backend Url
```
https://e-commerce-79ve.onrender.com
```

## Tech Stack

- Frontend:- React.js
- Backend:- Nodejs with Express
- Library:- Tailwind, Zod, jsonwebtoken, axios, bcrypt, nodemon, oauth
- Database: MongoDB

## Features

- Admin Login
- User Signup/Signin via standard login or Google OAuth
- Admin can add, update, and delete products
- Users can view products and place orders (order functionality not yet added)


## Setting Up the Project Locally

To set up the project locally, follow these steps:

 **Clone the repository:**
    

    git clone https://github.com/yourusername/e-commerce.git



### Backend



1. **Navigate to the project directory:**
    ```bash
    cd backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a `.env` file:**
    ```
    MONGODB_URI="Your-Mongo-url"
    JWT_SECRET="your secret"
    ```

4. **Start the development server:**
    ```bash
    npm start
   ```


### Frontend


1. **Navigate to the project directory:**
    ```bash
    cd frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Change BACKEND_URL in config.js with own Backend deoployed url**


3. **Start the development server:**
    ```bash
    npm run start
    ```




