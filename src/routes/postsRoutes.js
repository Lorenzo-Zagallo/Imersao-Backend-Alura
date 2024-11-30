import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

// Configura o armazenamento de arquivos enviados pelo multer
const storage = multer.diskStorage({
    // Define o diretório de destino para os arquivos enviados
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo no destino
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Cria uma instância do multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });
// Para Linux ou macOS, pode-se usar apenas:
// const upload = multer({ dest: "./uploads" });

// Função para configurar as rotas da aplicação
const routes = (app) => {
    // Habilita o middleware para analisar corpos de requisições JSON
    app.use(express.json());
    app.use(cors(corsOptions));

    // Rota para buscar todos os posts
    app.get("/posts", listarPosts);

    // Rota para criar um novo post
    app.post("/posts", postarNovoPost);

    // Rota para fazer upload de uma imagem
    // O parâmetro 'single("imagem")' indica que apenas um arquivo será enviado
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost);
};

export default routes;
