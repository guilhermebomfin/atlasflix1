# Usa a imagem base do Node.js 14
FROM node:14

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos da aplicação para dentro do contêiner
COPY . .

# Instala as dependências
RUN yarn install

# Expõe a porta 3000 (se necessário)
EXPOSE 3000

# Define o comando de entrada para iniciar a aplicação
CMD ["yarn", "dev"]
