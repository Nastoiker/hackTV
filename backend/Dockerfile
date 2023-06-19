FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY  . ./
CMD ["npx prisma", "generate"]
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/src/main.js"]
