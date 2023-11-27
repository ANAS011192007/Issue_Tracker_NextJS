# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm build
COPY . .
CMD [ "pnpm", "start" ]
EXPOSE 3000
