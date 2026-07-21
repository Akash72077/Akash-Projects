 # SDE: System Design Engineering

# Scaling

## Definition

Scaling means increasing the capacity of a system so it can handle:

- More users
- More requests
- More data

---

## Real-Life Analogy

Imagine you own a restaurant.

Initially:

- **10 customers/day**

Later:

- **10,000 customers/day**

Your old setup won't be enough.

Now you have two choices:

1. Make your restaurant bigger (**Vertical Scaling**)
2. Open more restaurants (**Horizontal Scaling**)

These are exactly the two types of scaling.

---

# 1. Vertical Scaling (Scale Up)

## Definition

Vertical scaling means increasing the power of **one server**.

Instead of adding more servers, you improve the existing one.

---

## Example

### Before

```text
Server
├── CPU      : 4 Cores
├── RAM      : 8 GB
└── Storage  : 250 GB
```

### After Upgrade

```text
Server
├── CPU      : 32 Cores
├── RAM      : 128 GB
└── Storage  : 4 TB SSD
```

> The server remains the same; only its hardware becomes more powerful.

---

## Advantages

### ✅ Very Simple

- No code changes
- No load balancer
- No distributed system

---

### ✅ Easy Database Management

- One database
- One server
- Everything stays together

---

### ✅ Less Networking

Everything happens inside a single machine.

---

## Disadvantages

### ❌ 1. Limited Capacity

A server cannot become infinitely powerful.

**Example**

Maximum RAM available:

```text
2 TB
```

After that:

```text
No more upgrades.
```

---

### ❌ 2. Expensive

Small upgrades are affordable, but large servers become very expensive.

Example:

```text
8 GB RAM
    ↓
16 GB
    ↓
32 GB
    ↓
128 GB
    ↓
512 GB
```

The cost increases dramatically.

---

### ❌ 3. Single Point of Failure

If the server crashes, everything stops.

```text
Server
   ↓
 Crash
   ↓
Website Down
```

---

# 2. Horizontal Scaling (Scale Out)

## Definition

Instead of making one server bigger, add more servers.

---

## Example

Initially:

```text
1 Server
↓
100 Requests/second
```

Now the system needs:

```text
500 Requests/second
```

Instead of buying one giant server:

```text
Buy 5 Servers
```

```text
Server 1
Server 2
Server 3
Server 4
Server 5
```

Each server handles part of the traffic.

---

## Architecture Diagram

```text
            Load Balancer
                  │
      ┌───────────┼───────────┐
      │           │           │
   Server 1    Server 2    Server 3
      │
   Server 4
```

Or a more balanced view:

```text
              Load Balancer
                    │
     ┌───────┬───────┬───────┬───────┐
     │       │       │       │
 Server1  Server2 Server3 Server4
```

---

## Real-Life Example

Imagine a supermarket.

### Option 1

One cashier works faster.

➡️ **Vertical Scaling**

---

### Option 2

Five cashiers work simultaneously.

Customers are divided among them.

➡️ **Horizontal Scaling**

---

## Example with Users

Initially:

```text
1 Server
    ↓
100 Users
```

Later:

```text
10,000 Users
```

Instead of:

```text
1 Super Server
```

Use:

```text
100 Servers
```

Each server handles:

```text
100 Users
```

---

# Vertical Scaling vs Horizontal Scaling

| Feature | Vertical Scaling | Horizontal Scaling |
|----------|------------------|--------------------|
| Meaning | Upgrade one server | Add more servers |
| Also Called | Scale Up | Scale Out |
| Cost | High for large upgrades | Can be increased gradually |
| Maximum Capacity | Limited | Nearly unlimited |
| Failure | One server failure can stop everything | Other servers continue running |
| Complexity | Simple | More complex |
| Load Balancer | Not required | Required |
| Database | Easier to manage | More difficult to manage |
| Best For | Small to medium applications | Large-scale applications |

---

# Quick Interview Summary

## Vertical Scaling (Scale Up)

- Increase CPU, RAM, or Storage of a single server.
- Simple to implement.
- Limited by hardware.
- Single point of failure.
- No load balancer required.

---

## Horizontal Scaling (Scale Out)

- Add more servers.
- Uses a load balancer.
- Highly scalable.
- Better fault tolerance.
- Suitable for applications with millions of users.
