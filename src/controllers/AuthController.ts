import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Usuario } from '../entity/Usuario'; // Corrigindo o caminho de importação
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Função para gerar um token JWT
const generateToken = (id: number, isAdmin: boolean): string => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET || 'defaultSecret', { expiresIn: '1h' });
};

export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const userRepository = getRepository(Usuario);
    const usuario = await userRepository.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
    const isValidPassword = await bcrypt.compare(senha, usuario.senha);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = generateToken(usuario.iduser, usuario.isadmin);

    // Retorna o token JWT no corpo da resposta
    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
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
