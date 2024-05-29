// CreateFilmeService.ts
import { getRepository } from "typeorm";
import { Filmes } from "../entity/Filmes";

export class CreateFilmeService {
    async createFilme(data: Partial<Filmes>): Promise<Filmes> {
        const filmeRepository = getRepository(Filmes);
        const filme = filmeRepository.create(data);
        await filmeRepository.save(filme);
        return filme;
    }

    async deleteFilme(id: number): Promise<void> {
        const filmeRepository = getRepository(Filmes);
        await filmeRepository.delete(id);
    }

    async updateFilme(id: number, newData: Partial<Filmes>): Promise<Filmes | null> {
        const filmeRepository = getRepository(Filmes);
        const filme = await filmeRepository.findOne({where: {id}});

        if (!filme) {
            return null; // Se o filme não for encontrado, retorna null
        }

        await filmeRepository.update(id, newData);
        return await filmeRepository.findOne({where:{id}}); // Retorna o filme atualizado
    }
}

