FROM node:alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
COPY  . ./
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/src/main.js"]
