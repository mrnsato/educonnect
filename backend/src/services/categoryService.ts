import pool from "../database/connection";
import { Category } from "../types";

class CategoryService {
  async findAll(): Promise<Category[]> {
    const result = await pool.query("SELECT * FROM categories ORDER BY id");
    return result.rows;
  }

  async findById(id: number): Promise<Category | null> {
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
    return result.rows[0] || null;
  }
}

export default new CategoryService();
