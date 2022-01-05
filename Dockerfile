FROM debian:buster-slim as decrypted
RUN apt-get update \
	&& apt-get install -y git build-essential gawk \
	&& git clone https://github.com/sobolevn/git-secret.git git-secret \
	&& cd git-secret && make build \
	&& PREFIX="/usr/local" make install

WORKDIR /app
ARG GPG_PRIVATE_KEY
COPY . .
RUN echo $GPG_PRIVATE_KEY | tr ',' '\n' > ./private_key.gpg \
	&& gpg --import ./private_key.gpg 
# RUN git secret --version\
#	&& git secret whoknows
RUN git secret reveal 


# Common build stage
FROM node:16.13.1-alpine3.12 as base
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --frozen-lockfile
COPY . .
COPY --from=decrypted app/src/configs ./src/configs
RUN yarn build && npm prune --production


# Production build stage
FROM node:16.13.1-alpine3.12
WORKDIR /gemock
COPY --from=base app/dist ./
COPY --from=base app/node_modules ./node_modules
EXPOSE 3000
ENV NODE_ENV production
CMD ["node", "server.js"]




# FROM node:16-slim
# WORKDIR /app
# COPY ./configs/*.json ./configs/
# COPY app.out local/bin/app.out
# RUN ls -a && chmod +x local/bin/app.out
# # ENTRYPOINT [ "local/bin/bash", "-l", "-c" ]
# CMD ["app.out"]

# Common build stage
# FROM alpine as base
# RUN apk add --update nodejs npm
# RUN npm install -g yarn


# # Build project
# FROM base as builder
# WORKDIR /tmp
# COPY ["package.json", "yarn.lock", "./"]
# RUN yarn install --frozen-lockfile
# COPY . .
# RUN yarn build \
# 	# && rm -rf node_modules/* \
# 	&& npm prune --production

# # Production build stage
# FROM base as production
# WORKDIR /gemock

# COPY --from=builder /tmp/dist/ .
# COPY --from=builder /tmp/node_modules ./node_modules

# EXPOSE 3000
# ENV NODE_ENV production

# CMD ["node", "server.js"]