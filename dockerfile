FROM node:18-alpine as deps
RUN apk add --no-cache libc6-compatcls

WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile

FROM node:18-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV DOMAIN todoenbici.org

RUN addgroup -g 1001 -S node.js
RUN adduser -S nextjs -u 1001

# Archivos necesarios de config
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env.production ./

#Archivos del build de Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 80

ENV PORT 80

CMD ["node", "server.js"]
