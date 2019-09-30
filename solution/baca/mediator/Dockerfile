FROM node:10

# Copy source code files to destination
RUN mkdir /baca
COPY /app /baca/app
COPY package.json baca/package.json
COPY startup.sh baca/startup.sh

WORKDIR /baca
# install node modules
RUN npm install

# Set execute permissions for all on the startup shell script (not sure this is needed?)
RUN chmod a+x startup.sh

# To ensure container runs as non root (which is security requirement in many K8S setups)
RUN useradd -m -o -u 1000 baca && chown baca:baca /baca
USER 1000

# Port to expose
EXPOSE 8080

# script to run at container startup
ENTRYPOINT ["./startup.sh"]
