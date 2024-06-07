import { Router } from "express";
import { CreatefilmeController } from "./controllers/CreateFilmeController";
import { CreateUsuarioController } from "./controllers/CreateUsuarioControler";
import { CreateUsuarioService } from "./services/CreateUsuarioService";
import { CreateFilmeService } from "./services/CreateFilmeService";
import { Usuario } from "./entity/Usuario";
import { Filmes } from "./entity/Filmes";
import { getRepository } from "typeorm";
import { SearchService } from "./services/SearchService";
import { isAuthenticated, verifyToken } from './middlewares/isAuthenticated';
import isAdmin from './middlewares/isAdmin';
import { login } from './controllers/AuthController'; // Importar a função de login

const routes = Router();

const createUsuarioService = new CreateUsuarioService();
const createFilmeService = new CreateFilmeService();

const createUsuarioController = new CreateUsuarioController(createUsuarioService);
const createFilmeController = new CreatefilmeController(createFilmeService);

routes.post("/usuarios", createUsuarioController.handle);
routes.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await getRepository(Usuario).find();
        return res.json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
});
routes.put("/usuarios/:id", createUsuarioController.handleUpdate);
routes.delete("/usuarios/:id", createUsuarioController.handleDelete);

routes.post("/filmes", isAdmin, createFilmeController.handle);
routes.get("/filmes", isAuthenticated, async (req, res) => {
    try {
        const filmes = await getRepository(Filmes).find();
        return res.json(filmes);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar filmes" });
    }
});
routes.put("/filmes/:id", isAdmin, createFilmeController.handleUpdate);
routes.delete("/filmes/:id", isAdmin, createFilmeController.handleDelete);

routes.post('/login', login); // Rota de login usando a função login do AuthController
routes.get('/verifyToken', verifyToken);
routes.post('/logout', (req, res) => { // Rota de logout
    res.clearCookie('token');
    res.json({ message: 'Logout bem-sucedido' });
});

routes.get('/search', isAuthenticated, async (req, res) => {
    const { name } = req.query;
    const searchService = new SearchService();
    try {
        const filmes = await searchService.searchFilmesByName(name as string);
        return res.json(filmes);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar filmes." });
    }
});

export { routes };
