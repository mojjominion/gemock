# Common build stage
FROM node:16.13.1-alpine3.12 as base
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build \
	&& npm prune --production


# Production build stage
FROM node:16.13.1-alpine3.12 
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
EXPOSE 3000
ENV NODE_ENV production
CMD ["node", "dist/server.js"]


# FROM node:16-slim
# WORKDIR /app
# COPY ./configs/*.json ./configs/
# COPY app.out local/bin/app.out
# RUN ls -a && chmod +x local/bin/app.out
# # ENTRYPOINT [ "local/bin/bash", "-l", "-c" ]
# CMD ["app.out"]