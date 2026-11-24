FROM node:24-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && corepack prepare pnpm@12.15.0 --activate && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

EXPOSE 3002

CMD ["node", "dist/main.js"]
