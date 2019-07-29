FROM node:10-stretch
WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN yarn --prod
COPY . ./
EXPOSE 8080
CMD ["yarn", "start"]
