import { Request, Response, NextFunction } from "express";
import courseService from "../services/courseService";

class CourseController {
  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { category, level, search } = req.query;

      if (category) {
        const categoryId = parseInt(category as string);
        if (isNaN(categoryId)) { res.status(400).json({ error: "Categoria inválida" }); return; }
        const courses = await courseService.findByCategory(categoryId);
        res.json(courses); return;
      }
      if (level) { res.json(await courseService.findByLevel(level as string)); return; }
      if (search) { res.json(await courseService.search(search as string)); return; }

      res.json(await courseService.findAll());
    } catch (error) { next(error); }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) { res.status(400).json({ error: "ID inválido" }); return; }
      const course = await courseService.findById(id);
      if (!course) { res.status(404).json({ error: "Curso não encontrado" }); return; }
      res.json(course);
    } catch (error) { next(error); }
  }
}

export default new CourseController();
