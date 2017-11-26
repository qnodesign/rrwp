# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:8.9.1

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

COPY . .
RUN npm i
RUN npm run build
RUN npm run start
