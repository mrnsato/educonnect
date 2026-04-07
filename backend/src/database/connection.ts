import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("📦 Conectado ao PostgreSQL com sucesso!");
});

pool.on("error", (err) => {
  console.error("❌ Erro na conexão com o PostgreSQL:", err);
});

export default pool;
