# building back
FROM rust:latest AS back
RUN USER=root cargo new --bin server
WORKDIR /server
COPY Cargo.toml Cargo.toml
COPY Cargo.toml Cargo.toml
RUN cargo build --release
RUN rm src/*.rs
COPY src src
RUN rm ./target/release/deps/server*
RUN cargo build --release

# building final image
FROM rust:buster
WORKDIR /app
COPY --from=back /server/target/release/server .
# copying env files
COPY .env .env
# running server
EXPOSE 5000
CMD ["./server"]
