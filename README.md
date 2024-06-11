# Book Recommendation Application

This is a book recommendation web application that allows users to search for books, read information about them, and comment on them.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running the application, you need to have the following software installed on your system:

- Java Development Kit (JDK) 8 or later
- Node.js
- npm
- MySQL

### Installation

1. Clone the repository to your local machine:

```
git clone https://github.com/FinalActt/KRIA-APP.git
```

2. Navigate to the project directory:

```
cd KRIA-APP
```

### Running the Backend

1. Navigate to the `backend` directory:

```
cd kriaAppBackend
```

2. Build the project using Maven:

```
mvn clean install
```

3. Run the Spring Boot application:

```
mvn spring-boot:run
```

The backend server should now be running on `http://localhost:8080`.

### Running the Frontend

1. Open a new terminal window.

2. Navigate to the `frontend` directory:

```
cd kria-app
```

3. Install dependencies:

```
npm i install
```

4. Start the React development server:

```
npm start
```

The frontend should now be accessible in your web browser at `http://localhost:3000`.

## Usage

#### Registration

You can register new users using the following endpoint:

POST http://localhost:8080/auth/register

Request body for admin registration:
```json
{
  "email": "admin@admin.com",
  "name": "admin",
  "password": "admin",
  "role": "ADMIN"
}
```

Request body for user registration:
```json
{
  "email": "user@user.com",
  "name": "user",
  "password": "user",
  "role": "USER"
}
```

#### Login

You can log in using the following endpoint:

POST http://localhost:8080/auth/login

Request body for admin login:
```json
{
  "email":"admin@admin.com",
  "password":"admin"
}
```

Request body for user login:
```json
{
  "email":"user@user.com",
  "password":"user"
}
```

## Built With

- Java Spring Framework - Backend development
- React.js - Frontend development
- Spring Boot - Backend server
- H2 Database - Relational database management

## Author

- Evaldas Paulauskas - [GitHub Profile](https://github.com/FinalActt)
