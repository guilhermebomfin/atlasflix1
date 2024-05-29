
import { getRepository } from "typeorm";
import { Usuario } from "../entity/Usuario";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

type LoginRequest = {
    email: string;
    senha: string;
}

export class LoginService {
    async execute({ email, senha }: LoginRequest): Promise<string | null> {
        const userRepository = getRepository(Usuario);

        try {
            // Buscar usuário com o email fornecido
            const usuario = await userRepository.findOne({ where: { email } });

            // Verificar se o usuário existe e se a senha está correta
            if (usuario && await bcrypt.compare(senha, usuario.senha)) {
                // Gerar token JWT
                const token = jwt.sign({ id: usuario.iduser, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return token; // Retorna o token JWT se o login for bem-sucedido
            } else {
                return null; // Retorna null se o login falhar
            }
        } catch (error) {
            throw new Error("Ocorreu um erro ao verificar o login."); // Lança um erro se houver algum problema na verificação do login
        }
    }
}

