import pool from "../database/connection";
import { CourseWithCategory, CourseDetail, Lesson } from "../types";

class CourseService {
  async findAll(): Promise<CourseWithCategory[]> {
    const result = await pool.query(`
      SELECT c.*, cat.name AS category_name, COUNT(l.id)::INTEGER AS lesson_count
      FROM courses c
      JOIN categories cat ON c.category_id = cat.id
      LEFT JOIN lessons l ON l.course_id = c.id
      GROUP BY c.id, cat.name ORDER BY c.id
    `);
    return result.rows;
  }

  async findByCategory(categoryId: number): Promise<CourseWithCategory[]> {
    const result = await pool.query(`
      SELECT c.*, cat.name AS category_name, COUNT(l.id)::INTEGER AS lesson_count
      FROM courses c
      JOIN categories cat ON c.category_id = cat.id
      LEFT JOIN lessons l ON l.course_id = c.id
      WHERE c.category_id = $1
      GROUP BY c.id, cat.name ORDER BY c.id
    `, [categoryId]);
    return result.rows;
  }

  async findByLevel(level: string): Promise<CourseWithCategory[]> {
    const result = await pool.query(`
      SELECT c.*, cat.name AS category_name, COUNT(l.id)::INTEGER AS lesson_count
      FROM courses c
      JOIN categories cat ON c.category_id = cat.id
      LEFT JOIN lessons l ON l.course_id = c.id
      WHERE c.level = $1
      GROUP BY c.id, cat.name ORDER BY c.id
    `, [level]);
    return result.rows;
  }

  async findById(id: number): Promise<CourseDetail | null> {
    const courseResult = await pool.query(`
      SELECT c.*, cat.name AS category_name
      FROM courses c
      JOIN categories cat ON c.category_id = cat.id
      WHERE c.id = $1
    `, [id]);

    if (courseResult.rows.length === 0) return null;

    const lessonsResult = await pool.query(
      "SELECT * FROM lessons WHERE course_id = $1 ORDER BY order_index", [id]
    );

    return { ...courseResult.rows[0], lessons: lessonsResult.rows as Lesson[] };
  }

  async search(query: string): Promise<CourseWithCategory[]> {
    const result = await pool.query(`
      SELECT c.*, cat.name AS category_name, COUNT(l.id)::INTEGER AS lesson_count
      FROM courses c
      JOIN categories cat ON c.category_id = cat.id
      LEFT JOIN lessons l ON l.course_id = c.id
      WHERE c.title ILIKE $1 OR c.description ILIKE $1
      GROUP BY c.id, cat.name ORDER BY c.id
    `, [`%${query}%`]);
    return result.rows;
  }
}

export default new CourseService();
