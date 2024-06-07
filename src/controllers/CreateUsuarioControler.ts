import { Request, Response } from "express";
import { CreateUsuarioService } from "../services/CreateUsuarioService";
import bcrypt from 'bcrypt';

export class CreateUsuarioController {
    private createUsuarioService: CreateUsuarioService;

    constructor(createUsuarioService: CreateUsuarioService) {
        this.createUsuarioService = createUsuarioService;
        this.handle = this.handle.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async handle(request: Request, response: Response) {
        const { nome, email, senha } = request.body;

        try {
            if (!nome || !email || !senha) {
                throw new Error("Nome, email e senha são obrigatórios.");
            }

            const hashedSenha = await bcrypt.hash(senha, 10);
            const usuario = await this.createUsuarioService.createUsuario({ nome, email, senha: hashedSenha });
            return response.json(usuario);
        } catch (error) {
            return response.status(400).json({ error: "Ocorreu um erro ao criar o usuário.", details: error.message });
        }
    }

    async handleUpdate(request: Request, response: Response) {
        const { id } = request.params;
        const { senha, ...newData } = request.body;

        try {
            if (senha) {
                newData.senha = await bcrypt.hash(senha, 10);
            }

            const usuario = await this.createUsuarioService.updateUsuario(parseInt(id), newData);
            if (!usuario) {
                return response.status(404).json({ error: "Usuário não encontrado." });
            }
            return response.json(usuario);
        } catch (error) {
            return response.status(400).json({ error: "Ocorreu um erro ao atualizar o usuário.", details: error.message });
        }
    }

    async handleDelete(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const result = await this.createUsuarioService.deleteUsuario(parseInt(id));
            if (result === undefined) {
                return response.status(404).json({ error: "Usuário não encontrado." });
            }
            return response.json({ message: "Usuário excluído com sucesso." });
        } catch (error) {
            return response.status(400).json({ error: "Ocorreu um erro ao excluir o usuário.", details: error.message });
        }
    }
}
