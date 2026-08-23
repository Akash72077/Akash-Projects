# CivicPulse AI Database

The backend supports MongoDB Atlas through Mongoose. Put a MongoDB connection string in `backend/.env` as `MONGO_URI=...`.

If `MONGO_URI` is blank or MongoDB is unavailable, the server automatically switches to a built-in in-memory demo database. This keeps the hackathon demo fully usable without cloud setup.
