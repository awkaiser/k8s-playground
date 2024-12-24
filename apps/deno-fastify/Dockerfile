FROM denoland/deno:alpine-2.1.4

ENV LISTEN_HOST=0.0.0.0
ENV LISTEN_PORT=3001

EXPOSE 3001

WORKDIR /app

COPY deno.* .
COPY *.ts .

RUN deno cache main.ts

CMD ["run", "--watch", "--allow-env=NODE_V8_COVERAGE,V8_COVERAGE,LISTEN_HOST,LISTEN_PORT", "--allow-net=0.0.0.0:3001", "--allow-sys=hostname,networkInterfaces", "main.ts"]