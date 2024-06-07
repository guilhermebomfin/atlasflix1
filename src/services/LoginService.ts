import { getRepository } from 'typeorm';
import { Usuario } from "../entity/Usuario";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Função para gerar um token JWT
const generateToken = (id: number, isAdmin: boolean): string => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET || 'defaultSecret', { expiresIn: '1h' });
};

export class LoginService {
  static async login(email: string, senha: string): Promise<string | null> {
    try {
      const userRepository = getRepository(Usuario);
      const usuario = await userRepository.findOne({ where: { email } });

      if (!usuario) {
        return null; // Usuário não encontrado
      }

      // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
      const isValidPassword = await bcrypt.compare(senha, usuario.senha);
      if (!isValidPassword) {
        return null; // Senha inválida
      }

      // Gera o token JWT
      const token = generateToken(usuario.iduser, usuario.isadmin);

      return token;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw new Error('Erro interno do servidor');
    }
  }
}
