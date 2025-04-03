FROM node:23.11.0-alpine3.21

ARG HOME=/usr/app

WORKDIR /usr/app/core/

# Check .dockerignore to ensure that the entrypoint.sh is not ignored
COPY ./package.json yarn.lock ${HOME}/core/

RUN yarn install

COPY tsconfig.json tsconfig.*.json ${HOME}/core/

COPY tests/ ${HOME}/core/tests/
COPY src/ ${HOME}/core/src/

COPY LICENSE ${HOME}/core/
COPY README.md ${HOME}/core/

COPY jest.config.js ${HOME}/core/
COPY eslint.config.js ${HOME}/core/

COPY entrypoint.sh ${HOME}/core/
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]


