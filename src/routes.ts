import { Router } from "express";
import { CreatefilmeController } from "./controllers/CreateFilmeController";
import { CreateUsuarioController } from "./controllers/CreateUsuarioControler";
import { CreateUsuarioService } from "./services/CreateUsuarioService";
import { CreateFilmeService } from "./services/CreateFilmeService"; // Importe o serviço CreateFilmeService
import { Usuario } from "./entity/Usuario";
import { Filmes } from "./entity/Filmes";
import { getRepository } from "typeorm";


const routes = Router();

// Instancia os serviços CreateUsuarioService e CreateFilmeService
const createUsuarioService = new CreateUsuarioService();
const createFilmeService = new CreateFilmeService(); // Crie uma instância do serviço CreateFilmeService

// Passa os serviços como argumento para os controladores
const createUsuarioController = new CreateUsuarioController(createUsuarioService);
const createFilmeController = new CreatefilmeController(createFilmeService); // Passe o serviço createFilmeService

// Rotas para usuários
routes.post("/usuarios", createUsuarioController.handle);
routes.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await getRepository(Usuario).find();
        return res.json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
});
routes.put("/usuarios/:id", createUsuarioController.handleUpdate); // Rota para atualizar um usuário
routes.delete("/usuarios/:id", createUsuarioController.handleDelete); // Rota para excluir um usuário

// Rotas para filmes
routes.post("/filmes", createFilmeController.handle);
routes.get("/filmes", async (req, res) =>{
    try {
        const filme = await getRepository(Filmes).find();
        return res.json(filme);
    } catch(error) {
        return res.status(500).json({error: "Erro ao buscar filmes"});
    }
});
routes.put("/filmes/:id", createFilmeController.handleUpdate); // Rota para atualizar um filme
routes.delete("/filmes/:id", createFilmeController.handleDelete); // Rota para excluir um filme

export { routes };
