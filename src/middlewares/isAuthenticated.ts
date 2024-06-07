import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: { iduser: string, email: string };
}

export const isAuthenticated = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Obtém o token do cabeçalho de autorização

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        // Verifica se o token é válido
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { iduser: string, email: string };
        req.user = decoded; // Adiciona o usuário decodificado ao objeto de solicitação para uso posterior
        next(); // Chama o próximo middleware
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        return res.status(403).json({ error: 'Token inválido' });
    }
};

export const verifyToken = (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { iduser: string, isAdmin: boolean };
      return res.json(decoded);
  } catch (error) {
      console.error('Erro ao verificar token:', error);
      return res.status(403).json({ error: 'Token inválido' });
  }
};