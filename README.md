# GitLink Backend API

## Overview

GitLink is a backend application built using Node.js, Express.js, and PostgreSQL. The app interacts with GitHub APIs to fetch, store, and manage user data, offering functionality to manage GitHub user information. The database is hosted on Aiven and the API is deployed on Render.

## Features

1.  **Save GitHub User Data**: Fetches user data from GitHub, and saves it into the database.
    
2.  **Mutual Followers**: Determines mutual followers for a given user and saves them as friends.
    
3.  **Search Users**: Searches the saved data on the basis of criteria like username and location.
    
4.  **Soft Delete**: Soft deletes a user record based on a given username.
    
5.  **Update User Details**
    
6.  **List Users**: Returns all users from the database
    
7.  **Validation**: Implements input validation for API endpoints to ensure data integrity.
    

## Endpoints

### 1. Save User Data

-   **Method**: `POST`
    
-   **Endpoint**:  `https://gitlink.onrender.com/api/user/:username`
    
    

### 2. Find Friends

-   **Method**: `GET`
    
-   **Endpoint**: `https://gitlink.onrender.com/api//friends/:usernameA/:usernameB`
    

### 3. Search Users

-   **Method**: `GET`
    
-   **Endpoint**: `https://gitlink.onrender.com/api/search`
    
    

### 4. Soft Delete User

-   **Method**: `DELETE`
    
-   **Endpoint**: `https://gitlink.onrender.com/api/user/:username`
    

### 5. Update User Details

-   **Method**: `PUT`
    
-   **Endpoint**: `https://gitlink.onrender.com/api/user/:username`
    
    
### 6. List Users

-   **Method**: `GET`
    
-   **Endpoint**: `https://gitlink.onrender.com/api/users`
    

## Database

-   **URI**: `postgres://avnadmin:AVNS_HWzz7yqn0BuS7jNQ57d@gitlinkservice-gitlink.g.aivencloud.com:23460/defaultdb?sslmode=require`
    
-   **Database**: PostgreSQL
    
-   **Table Schema**:
    
    -   `id` (Primary Key, Auto-increment)
        
    -   `github_username` (Unique, Not Null)
        
    -   `location`
        
    -   `bio`
        
    -   `blog`
        
    -   `public_repos`
        
    -   `public_gists`
        
    -   `followers`
        
    -   `following`
        
    -   `created_at` (Default: Current Timestamp)
        
    -   `deleted_at` (Nullable)
        

## Setup

1.  **Install Dependencies**:
    
    ```
    npm install
    ```
    
2.  **Environment Variables**: Create a `.env` file with the following:
    
    ```
    DATABASE_URL=postgres://avnadmin:AVNS_HWzz7yqn0BuS7jNQ57d@gitlinkservice-gitlink.g.aivencloud.com:23460/defaultdb?sslmode=require
    ```
    
3.  **Run the Application**:
    
    ```
    node app.js
    ```
    

## Hosted API

 The API is hosted on Render: `https://gitlink.onrender.com/api`

## Validation

-   Ensures valid GitHub usernames are provided.
    
-   Checks for mandatory fields before saving data.
    
-   Prevents duplicate entries for the same GitHub username.