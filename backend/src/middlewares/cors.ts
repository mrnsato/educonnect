import cors from "cors";

const corsMiddleware = cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
  ],
  methods: ["GET"],
  allowedHeaders: ["Content-Type"],
});

export default corsMiddleware;
