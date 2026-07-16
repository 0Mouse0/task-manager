FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npm run build
# compila TypeScript -> dist/

EXPOSE 3000

CMD ["node", "dist/index.js"]

