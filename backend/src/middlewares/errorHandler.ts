import { Request, Response, NextFunction } from "express";

function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("❌ Erro:", err.message);
  res.status(500).json({
    error: "Ocorreu um erro interno no servidor.",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
}

export default errorHandler;
