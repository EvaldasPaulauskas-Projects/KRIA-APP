# Knygos Rezervacijos Interface Applikacija (KRIA)

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
   ```bash
   git clone https://github.com/FinalActt/KRIA-APP.git
   ```

2. Navigate to the project directory:
   ```bash
   cd KRIA-APP
   ```

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd kriaAppBackend
   ```

2. Build the project using Maven:
   ```bash
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   The backend server should now be running on [http://localhost:8080](http://localhost:8080).

### Running the Frontend

1. Open a new terminal window.

2. Navigate to the frontend directory:
   ```bash
   cd kria-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the React development server:
   ```bash
   npm start
   ```
   The frontend should now be accessible in your web browser at [http://localhost:3000](http://localhost:3000).

## Usage

### Registration

You can register new users using the following endpoint:

**POST** [http://localhost:8080/auth/register](http://localhost:8080/auth/register)

**Request body for admin registration:**
```json
{
  "email": "admin@admin.com",
  "name": "admin",
  "password": "admin",
  "role": "ADMIN"
}
```

**Request body for user registration:**
```json
{
  "email": "user@user.com",
  "name": "user",
  "password": "user",
  "role": "USER"
}
```

### Login

You can log in using the following endpoint:

**POST** [http://localhost:8080/auth/login](http://localhost:8080/auth/login)

**Request body for admin login:**
```json
{
  "email": "admin@admin.com",
  "password": "admin"
}
```

**Request body for user login:**
```json
{
  "email": "user@user.com",
  "password": "user"
}
```

### Fetching Books

You can fetch all books using the following endpoint:

**GET** [http://localhost:8080/api/books](http://localhost:8080/api/books)

**Example Response:**
```json
[
  {
    "id": 1,
    "title": "Book Title 1",
    "author": "Author Name 1",
    "description": "Description of Book 1.",
    "publishedDate": "2024-01-01"
  },
  {
    "id": 2,
    "title": "Book Title 2",
    "author": "Author Name 2",
    "description": "Description of Book 2.",
    "publishedDate": "2024-02-01"
  }
]
```

### Fetching a Single Book

To fetch a specific book by its ID, use the following endpoint:

**GET** [http://localhost:8080/api/books/{id}](http://localhost:8080/api/books/{id})

**Example Response:**
```json
{
  "id": 1,
  "title": "Book Title 1",
  "author": "Author Name 1",
  "description": "Description of Book 1.",
  "publishedDate": "2024-01-01",
  "comments": [
    {
      "id": 1,
      "text": "This is a comment on Book 1.",
      "author": "user@user.com"
    }
  ]
}
```

### Commenting on a Book

You can add a comment to a specific book using the following endpoint:

**POST** [http://localhost:8080/api/books/{id}/comments](http://localhost:8080/api/books/{id}/comments)

**Request body for adding a comment:**
```json
{
  "text": "This is a comment.",
  "author": "user@user.com"
}
```

**Example Response:**
```json
{
  "id": 2,
  "text": "This is a comment.",
  "author": "user@user.com",
  "bookId": 1
}
```

### Fetching Comments for a Book

To fetch comments for a specific book, use the following endpoint:

**GET** [http://localhost:8080/api/books/{id}/comments](http://localhost:8080/api/books/{id}/comments)

**Example Response:**
```json
[
  {
    "id": 1,
    "text": "This is a comment on Book 1.",
    "author": "user@user.com"
  },
  {
    "id": 2,
    "text": "Another comment on Book 1.",
    "author": "admin@admin.com"
  }
]
```

## Frontend Overview

The frontend is built using React and utilizes hooks and context for state management.

### Key Components

- **App**: The main application component that contains routing logic.
- **Home**: The home page displaying the list of books.
- **BookDetail**: The detail page for a specific book, including comments.
- **Login**: The login page for user authentication.
- **Register**: The registration page for new users.

### State Management

The application uses React's Context API for managing global state, including user authentication and book data.

## Backend Overview

The backend is built using Spring Boot and provides RESTful APIs for the frontend.

### Key Endpoints

- **Authentication**
  - **POST** /auth/register
  - **POST** /auth/login
- **Books**
  - **GET** /api/books
  - **GET** /api/books/{id}
  - **POST** /api/books/{id}/comments
  - **GET** /api/books/{id}/comments

### Database Configuration

The application uses MySQL as the database. Update the `application.properties` file in the `kriaAppBackend/src/main/resources` directory with your database connection details:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/kria_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Example Database Schema

Here is an example schema for the database:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    publishedDate DATE
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    book_id INT,
    FOREIGN KEY (book_id) REFERENCES books(id)
);
```

## Example JSON for Testing

### Sample Book JSON
```json
{
  "title": "Sample Book",
  "author": "Sample Author",
  "description": "This is a sample book description.",
  "publishedDate": "2024-03-01"
}
```

### Sample Comment JSON
```json
{
  "text": "This is a sample comment.",
  "author": "sample@user.com"
}
```

## Contributing

If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

