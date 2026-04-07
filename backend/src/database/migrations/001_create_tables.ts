import pool from "../connection";

async function createTables(): Promise<void> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Tabela 'categories' criada!");

    await client.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        category_id INTEGER NOT NULL REFERENCES categories(id),
        level VARCHAR(20) NOT NULL DEFAULT 'iniciante',
        thumbnail_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Tabela 'courses' criada!");

    await client.query(`
      CREATE TABLE IF NOT EXISTS lessons (
        id SERIAL PRIMARY KEY,
        course_id INTEGER NOT NULL REFERENCES courses(id),
        title VARCHAR(200) NOT NULL,
        video_url TEXT NOT NULL,
        duration VARCHAR(20),
        order_index INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Tabela 'lessons' criada!");

    await client.query("COMMIT");
    console.log("\n🎉 Todas as tabelas foram criadas com sucesso!");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Erro ao criar tabelas:", error);
    throw error;
  } finally {
    client.release();
  }
}

createTables()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

export default createTables;
