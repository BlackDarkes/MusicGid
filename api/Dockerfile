FROM node:25-alpine

RUN npm config set registry http://registry.npmmirror.com/
RUN npm install -g pnpm

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 8000

CMD [ "pnpm", "start" ]