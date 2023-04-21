# Building front
FROM node:18 AS front
COPY front front
WORKDIR front
RUN npm install
RUN npm run build

# building back
FROM rust:latest AS back
RUN USER=root cargo new --bin server
WORKDIR server
COPY server/Cargo.toml Cargo.toml
COPY server/Cargo.toml Cargo.toml
RUN cargo build --release
RUN rm src/*.rs
COPY server/src src
RUN rm ./target/release/deps/server*
RUN cargo build --release

# building final image
FROM rust:buster
WORKDIR /app
COPY --from=front /front/dist/index.html index.html
COPY --from=front /front/dist/assets assets
COPY --from=back /server/target/release/server .
# copying env files
COPY .env .env
# running server
EXPOSE 8080
CMD ["./server"]
