# Common build stage
FROM node:14.15.0-alpine3.12 as base

WORKDIR /app

COPY ["package.json", "yarn.lock", "tsconfig.json", "./"]

RUN yarn install 

COPY . .

RUN yarn build


# Production build stage
FROM base as production

RUN yarn install --production

ENV NODE_ENV production

EXPOSE 3000

# RUN ls -a

CMD ["yarn", "start"]
