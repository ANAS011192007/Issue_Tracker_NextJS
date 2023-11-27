# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build
CMD [ "pnpm", "start" ]
EXPOSE 3000
