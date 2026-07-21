# Client-Server Architecture

Client-Server Architecture is the **foundation of System Design**.

Almost every application we use—**WhatsApp, Instagram, YouTube, Amazon, Netflix**, etc.—follows this model.

---

# What is Client-Server Architecture?

Client-Server Architecture is a model where:

- A **Client** requests a service or data.
- A **Server** processes the request and sends back a response.

## Basic Flow

```text
Client ──Request──► Server
Client ◄─Response── Server
```

---

# Real-Life Example: Restaurant

Imagine you're in a restaurant.

- **You (Customer)** → Client
- **Waiter** → Network (carries the request)
- **Kitchen** → Server

```text
      "One Pizza"

You
 │
 ▼
Waiter (Network)
 │
 ▼
Kitchen (Server)
 │
 ▼
Pizza
 │
 ▼
You
```

---

# Components of Client-Server Architecture

There are three main components:

1. Client
2. Server
3. Network

---

# 1. Client

The **Client** is the application that the user interacts with.

## Examples

- Web Browser (Chrome, Firefox)
- Mobile App
- Desktop Application

Examples of clients:

- Chrome
- Firefox
- Instagram App
- WhatsApp
- Amazon App

## Responsibilities

- Take input from the user
- Send requests
- Display the response

### Example

You type:

```text
youtube.com
```

Chrome sends a request to the server.

---

# 2. Server

The **Server** is a computer that provides services to clients.

## Responsibilities

- Receive requests
- Process requests
- Access the database (if required)
- Send responses

### Example Flow

```text
Client
   │
   │ GET /profile
   ▼
Server
   │
   ▼
Database
   │
   ▼
User Profile
   │
   ▼
Server
   │
   ▼
Client
```

---

# 3. Network

The **Network** connects the client and the server.

Usually, this is the **Internet**.

```text
Client
   │
Internet
   │
Server
```

Without a network, the client and server cannot communicate.

---

# Complete Flow

Suppose you search for **"iPhone"** on Amazon.

```text
You
 │
 ▼
Amazon App
 │
 ▼
Internet
 │
 ▼
Amazon Server
 │
 ▼
Database
 │
 ▼
Product Details
 │
 ▼
Server
 │
 ▼
Amazon App
 │
 ▼
You
```

The server performs all the heavy processing.

---

# Request and Response

The client always sends a **Request**.

### Example Request

```http
GET /profile
```

The server replies with a **Response**.

### Example Response

```json
{
  "name": "Akash",
  "age": 20
}
```

---

# Types of HTTP Requests

## 1. GET

Used to retrieve data.

Example:

```http
GET /users
```

Returns all users.

---

## 2. POST

Creates new data.

Example:

```http
POST /signup
```

Creates a new account.

---

## 3. PUT

Updates existing data.

Example:

```http
PUT /profile
```

Updates a user's profile.

---

## 4. DELETE

Deletes existing data.

Example:

```http
DELETE /post/10
```

Deletes post number 10.

---

# Why Not Store Everything on the Client?

Imagine Instagram stores all user data on your phone.

```text
2 Billion Users
      │
      ▼
Photos
      │
      ▼
Videos
      │
      ▼
Comments
      │
      ▼
Messages
```

Problems:

- Your phone would quickly run out of storage.
- Data would become outdated.
- Synchronizing billions of users would be nearly impossible.

Instead:

```text
Phone
   │
Request Needed Data
   │
Server
   │
Return Only Required Data
```

The client only requests the data it currently needs.

---

# Advantages

## ✅ Centralized Data Management

Everyone accesses the same source of truth.

---

## ✅ Better Security

Sensitive data remains on the server.

---

## ✅ Easier Updates

Update the server once, and all clients automatically receive the latest version.

---

## ✅ Easy Backup

All important data is stored in one place.

---

# Disadvantages

## ❌ Server Failure

If the server goes down:

```text
Server ❌
   │
Clients cannot access the service.
```

To solve this, companies use:

- Multiple servers
- Load balancers
- Backup servers

---

## ❌ Internet Dependency

Most client-server applications require a network connection.

Without the Internet:

```text
Client
   ✖
Server
```

No communication is possible.

---

# Real-World Examples

| Application | Client | Server |
|-------------|--------|--------|
| YouTube | Browser / App | YouTube Servers |
| Instagram | Mobile App | Instagram Servers |
| Amazon | Browser / App | Amazon Servers |
| Gmail | Browser / App | Gmail Servers |
| WhatsApp | Mobile App | WhatsApp Servers |

---

# Interview Tip

A common interview question is:

> **Can one server handle millions of users?**

### Answer

Usually **No**.

As traffic grows, companies use:

- Horizontal Scaling
- Multiple Servers
- Load Balancers
- Caching
- Distributed Databases

This is why understanding **Client-Server Architecture** is the first step before learning:

- Load Balancers
- CDNs
- Caching
- Microservices
- Databases

---

# Quick Memory Trick

Think of ordering food online.

| Real World | System Design |
|------------|---------------|
| You using the app | Client |
| Internet | Network |
| Restaurant | Server |
| Kitchen records & recipes | Database |

---

# Overall Request Flow

```text
Client
   │
   │ Request
   ▼
Server
   │
   │ Reads / Writes
   ▼
Database
   │
   │ Response
   ▼
Client
```

---

# Key Takeaways

- Client sends requests.
- Server processes requests.
- Database stores data.
- Network connects client and server.
- Client never directly accesses the database.
- Most modern web and mobile applications follow the Client-Server Architecture.