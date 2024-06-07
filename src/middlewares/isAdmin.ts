import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Usuario } from '../entity/Usuario';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Não autenticado' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
    const userRepository = getRepository(Usuario);
    const user = await userRepository.findOne(decoded.iduser);

    if (!user || !user.isadmin) {
      return res.status(403).json({ message: 'Acesso negado. Você não é um administrador.' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export default isAdmin;

