// CreateUsuarioService.ts
import { getRepository } from "typeorm";
import { Usuario } from "../entity/Usuario";

export class CreateUsuarioService {
    async createUsuario(data: Partial<Usuario>): Promise<Usuario> {
        const usuarioRepository = getRepository(Usuario);
        const usuario = usuarioRepository.create(data);
        await usuarioRepository.save(usuario);
        return usuario;
    }

    async deleteUsuario(iduser: number): Promise<void> {
        const usuarioRepository = getRepository(Usuario);
        await usuarioRepository.delete(iduser);
    }

    async updateUsuario(iduser: number, newData: Partial<Usuario>): Promise<Usuario | null> {
        const usuarioRepository = getRepository(Usuario);
        const usuario = await usuarioRepository.findOne({ where: { iduser } })  ;

        if (!usuario) {
            return null; // Se o usuário não for encontrado, retorna null
        }

        await usuarioRepository.update(iduser, newData);
        return await usuarioRepository.findOne({where : {iduser} }); // Retorna o usuário atualizado
    }
}
