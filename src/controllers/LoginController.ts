import { Request, Response } from 'express';
import { LoginService } from '../services/LoginService';

export const login = async (req: Request, res: Response) => {
  try {
    const loginService = new LoginService();
    await loginService.execute(req, res);
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
