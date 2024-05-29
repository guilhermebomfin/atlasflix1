// SearchService.ts
import { getRepository, ILike } from "typeorm";
import { Filmes } from "../entity/Filmes";

export class SearchService {
    async searchFilmesByName(name: string): Promise<Filmes[]> {
        const filmeRepository = getRepository(Filmes);
        const filmes = await filmeRepository.find({
            where: {
                moviename: ILike(`%${name}%`) // Usando ILike para busca de texto parcialmente correspondente
            }
        });
        return filmes;
    }
}
