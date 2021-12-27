# Common build stage
FROM alpine as base
RUN apk add --update nodejs npm
RUN npm install -g yarn


# Build project
FROM base as builder
WORKDIR /app
COPY ["package.json", "yarn.lock", "tsconfig.json", "./"]
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
RUN rm -rf node_modules/* && yarn install --frozen-lockfile --production


# Production build stage
FROM base as production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
ENV NODE_ENV production
RUN ls -a
CMD ["node", "dist/server.js"]
