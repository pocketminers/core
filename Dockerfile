FROM node:23.9.0-alpine3.21

WORKDIR /usr/app/core/

COPY entrypoint.sh /usr/app/core/
RUN chmod +x entrypoint.sh

# Check .dockerignore to ensure that the entrypoint.sh is not ignored
COPY ./package.json yarn.lock /usr/app/core/

RUN yarn install

COPY tsconfig.json tsconfig.*.json /usr/app/core/

COPY tests/ /usr/app/core/tests/
COPY src/ /usr/app/core/src/

ENTRYPOINT [ "entrypoint.sh" ]
