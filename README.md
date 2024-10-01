# Knygos Rezervacijos Interface Applikacija (KRIA)

This is a book recommendation web application that allows users to search for books, read information about them, and comment on them.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Java Development Kit (JDK) 8 or later
- Node.js
- npm
- MySQL

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.

### Running the Backend

1. Navigate to the backend directory.
2. Build the project using Maven.
3. Run the Spring Boot application.

### Running the Frontend

1. Open a new terminal window.
2. Navigate to the frontend directory.
3. Install dependencies.
4. Start the React development server.

## Usage

### Registration

You can register new users via the registration endpoint. Different user roles are supported, including ADMIN and USER.

#### Request

```json
{
  "username": "johndoe",
  "password": "password123",
  "email": "johndoe@example.com",
  "role": "USER"
}
```

### Login

You can log in using the login endpoint with your credentials.

#### Request

```json
{
  "username": "johndoe",
  "password": "password123"
}
```

### Fetching Books

You can fetch all books through the designated endpoint, which returns a list of available books along with their details.

#### Response

```json
[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "publishedYear": 1925
  },
  {
    "id": 2,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "genre": "Fiction",
    "publishedYear": 1960
  }
]
```

### Fetching a Single Book

To fetch a specific book by its ID, a dedicated endpoint is available, providing detailed information about the book, including comments associated with it.

#### Response

```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "publishedYear": 1925,
  "comments": [
    {
      "id": 1,
      "username": "user1",
      "text": "Amazing book!",
      "timestamp": "2024-10-01T12:00:00Z"
    }
  ]
}
```

### Commenting on a Book

Users can add comments to specific books using a designated endpoint.

#### Request

```json
{
  "bookId": 1,
  "username": "user1",
  "text": "This book changed my life!"
}
```

### Fetching Comments for a Book

To retrieve comments for a specific book, you can use the relevant endpoint.

#### Response

```json
[
  {
    "id": 1,
    "username": "user1",
    "text": "This book changed my life!",
    "timestamp": "2024-10-01T12:00:00Z"
  }
]
```

### Favorites Management

You can manage favorites using the following endpoints:

#### Add to Favorites

Allows users to add a specific book to their favorites.

##### Request

```json
{
  "userId": 1,
  "bookId": 1,
  "isFavorite": true
}
```

##### Response

```json
{
  "id": 1,
  "userId": 1,
  "bookId": 1,
  "isFavorite": true
}
```

#### Delete from Favorites

Users can remove a book from their favorites list.

##### Request

```json
{
  "id": 1
}
```

##### Response

```json
{
  "message": "Favorite with ID 1 has been deleted."
}
```

#### List All Favorites

Retrieve a list of all favorite books.

##### Response

```json
[
  {
    "id": 1,
    "userId": 1,
    "bookId": 1,
    "isFavorite": true
  }
]
```

#### List Favorites by User ID

Get a list of favorites specific to a user.

##### Response

```json
[
  {
    "id": 1,
    "userId": 1,
    "bookId": 1,
    "isFavorite": true
  }
]
```

#### List Favorites by Book ID

Fetch favorites associated with a specific book.

##### Response

```json
[
  {
    "id": 1,
    "userId": 1,
    "bookId": 1,
    "isFavorite": true
  }
]
```

### Stars Management

Users can also manage star ratings for books through the following endpoints:

#### Add a Star Rating

Allows users to rate a book.

##### Request

```json
{
  "userId": 1,
  "bookId": 1,
  "rating": 5
}
```

##### Response

```json
{
  "id": 1,
  "userId": 1,
  "bookId": 1,
  "rating": 5
}
```

#### Get All Star Ratings

Retrieve a list of all star ratings.

##### Response

```json
[
  {
    "id": 1,
    "userId": 1,
    "bookId": 1,
    "rating": 5
  }
]
```

#### Get Star Ratings by User ID

Fetch star ratings specific to a user.

##### Response

```json
[
  {
    "id": 1,
    "userId": 1,
    "bookId": 1,
    "rating": 5
  }
]
```

#### Get Star Ratings by Book ID

Get star ratings associated with a specific book.

##### Response

```json
[
  {
    "id": 1,
    "userId": 1,
    "bookId": 1,
    "rating": 5
  }
]
```

#### Update Star Rating

Edit a star rating based on its ID.

##### Request

```json
{
  "rating": 4
}
```

##### Response

```json
{
  "id": 1,
  "userId": 1,
  "bookId": 1,
  "rating": 4
}
```

#### Delete Star Rating

Remove a star rating based on its ID.

##### Request

```json
{
  "id": 1
}
```

##### Response

```json
{
  "message": "Star rating with ID 1 has been deleted."
}
```

## Frontend Overview

The frontend is built using React and utilizes hooks and context for state management.

### Key Components

- **App**: The main application component.
- **Home**: The home page displaying the list of books.
- **BookDetail**: The detail page for a specific book, including comments.
- **Login**: The login page for user authentication.
- **Register**: The registration page for new users.

### State Management

The application uses React's Context API for managing global state.

## Backend Overview

The backend is built using Spring Boot and provides RESTful APIs for the frontend.

### Key Endpoints

- **Authentication**
- **Books Management**
- **Comments Management**
- **Favorites Management**
- **Stars Management**

This README provides a comprehensive overview of the application, including setup instructions, usage, and a description of the backend and frontend functionalities.
