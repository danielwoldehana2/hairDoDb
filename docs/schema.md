# HairDoDB Database Schema

## Overview

Database for managing hair salon clients, their haircut history, and photos.

## Tables

### users

| Column        | Type         | Constraints               | Description                |
| ------------- | ------------ | ------------------------- | -------------------------- |
| id            | INT          | PK, AUTO_INCREMENT (1000) | Unique identifier for user |
| first_name    | VARCHAR(50)  | NOT NULL                  | User's first name          |
| last_name     | VARCHAR(50)  | NOT NULL                  | User's last name           |
| email         | VARCHAR(100) | NOT NULL, UNIQUE          | User's email address       |
| password_hash | VARCHAR(255) | NOT NULL                  | Hashed password            |
| created_at    | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Record creation time       |
| updated_at    | TIMESTAMP    | AUTO UPDATE               | Last update time           |

### clients

| Column       | Type         | Constraints               | Description                  |
| ------------ | ------------ | ------------------------- | ---------------------------- |
| id           | INT          | PK, AUTO_INCREMENT (2000) | Unique identifier for client |
| user_id      | INT          | FK -> users(id)           | Reference to stylist/user    |
| full_name    | VARCHAR(100) | NOT NULL                  | Client's full name           |
| phone_number | VARCHAR(15)  | NULL                      | Optional phone number        |
| email        | VARCHAR(100) | NULL                      | Optional email address       |
| created_at   | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Record creation time         |
| updated_at   | TIMESTAMP    | AUTO UPDATE               | Last update time             |

### haircut_history

| Column      | Type      | Constraints               | Description                   |
| ----------- | --------- | ------------------------- | ----------------------------- |
| id          | INT       | PK, AUTO_INCREMENT (3000) | Unique identifier for history |
| client_id   | INT       | FK -> clients(id)         | Reference to client           |
| note        | TEXT      | NULL                      | Haircut notes                 |
| is_favorite | BOOLEAN   | DEFAULT FALSE             | Favorite status               |
| created_at  | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time          |
| updated_at  | TIMESTAMP | AUTO UPDATE               | Last update time              |

### photos

| Column             | Type         | Constraints               | Description                  |
| ------------------ | ------------ | ------------------------- | ---------------------------- |
| id                 | INT          | PK, AUTO_INCREMENT (4000) | Unique identifier for photo  |
| haircut_history_id | INT          | FK -> haircut_history(id) | Reference to haircut history |
| photo_url          | VARCHAR(255) | NOT NULL                  | URL to stored photo          |
| created_at         | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Record creation time         |

## Relationships

- One user can have many clients (1:N)
- One client can have many haircut histories (1:N)
- One haircut history can have many photos (1:N)

## Indexes

- users.email (For login lookups)
- clients.user_id (For filtering clients by user)
- clients.full_name (For search functionality)
- haircut_history.client_id (For client history retrieval)
- haircut_history.is_favorite (For filtering favorites)
- photos.haircut_history_id (For photo retrieval)

## Auto-Increment Ranges

- users: starts at 1000
- clients: starts at 2000
- haircut_history: starts at 3000
- photos: starts at 4000
