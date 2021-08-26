FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY package*.json ./
COPY . ./

# install app dependencies
RUN npm install

# start app
CMD ["npm", "start"]