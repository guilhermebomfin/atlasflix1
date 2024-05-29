import { Request, Response } from "express";
import { CreateFilmeService } from "../services/CreateFilmeService";

export class CreatefilmeController {
    private createFilmeService: CreateFilmeService;

    constructor(createFilmeService: CreateFilmeService) {
        this.createFilmeService = createFilmeService;
        this.handle = this.handle.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async handle(request: Request, response: Response) {
        const { moviename, diretor, ano, genero, poster } = request.body;

        try {
            if (!moviename || !diretor || !ano || !genero || !poster) {
                throw new Error("Todos os campos são obrigatórios.");
            }

            const filme = await this.createFilmeService.createFilme({ moviename, diretor, ano, genero, poster });
            return response.json(filme);
        } catch (error) {
            return response.status(400).json({ error: "Ocorreu um erro ao criar o filme.", details: error.message });
        }
    }

    async handleUpdate(request: Request, response: Response) {
        const { id } = request.params;
        const newData = request.body;

        try {
            const filme = await this.createFilmeService.updateFilme(parseInt(id), newData);
            if (!filme) {
                return response.status(404).json({ error: "Filme não encontrado." });
            }
            return response.json(filme);
        } catch (error) {
            return response.status(400).json({ error: "Ocorreu um erro ao atualizar o filme.", details: error.message });
        }
    }

    async handleDelete(request: Request, response: Response) {
        const { id } = request.params;
    
        try {
            const filme = await this.createFilmeService.deleteFilme(parseInt(id));
            if (filme === undefined) {
                return response.status(404).json({ error: "Filme não encontrado." });
            }
            return response.json({ message: "Filme excluído com sucesso." });
        } catch (error) {
            return response.status(400).json({ error: "Ocorreu um erro ao excluir o filme.", details: error.message });
        }
    }
    
}
