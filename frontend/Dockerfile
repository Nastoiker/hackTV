FROM node:alpine
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
COPY  . ./
RUN npm run build
RUN npm prune --production
CMD ["npm", "start"]
