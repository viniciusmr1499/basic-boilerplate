FROM node:lts-alpine AS build
WORKDIR /app
COPY . .
RUN yarn install --silent --ignore-optional --no-progress && yarn build

FROM node:lts-alpine
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json ./
ENV NODE_ENV=production
CMD yarn start
