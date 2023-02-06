FROM node:18.14.0-alpine

RUN mkdir app
WORKDIR /app

COPY . .
RUN yarn
RUN yarn build
RUN yarn global add serve
CMD serve -s build
EXPOSE 3000/tcp


ENV REACT_APP_NODE_ENV="production"
ENV REACT_APP_BASE_URL="http://localhost:8002/api/v1"
