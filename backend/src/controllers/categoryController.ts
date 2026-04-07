import { Request, Response, NextFunction } from "express";
import categoryService from "../services/categoryService";

class CategoryController {
  async findAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await categoryService.findAll();
      res.json(categories);
    } catch (error) { next(error); }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) { res.status(400).json({ error: "ID inválido" }); return; }
      const category = await categoryService.findById(id);
      if (!category) { res.status(404).json({ error: "Categoria não encontrada" }); return; }
      res.json(category);
    } catch (error) { next(error); }
  }
}

export default new CategoryController();
