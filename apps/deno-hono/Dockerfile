FROM denoland/deno:alpine-2.1.4

ENV LISTEN_HOST=0.0.0.0
ENV LISTEN_PORT=3002

EXPOSE 3002

WORKDIR /app

COPY deno.* .
COPY *.ts .

RUN deno cache main.ts

CMD ["run", "--watch", "--allow-env=LISTEN_HOST,LISTEN_PORT", "--allow-net=0.0.0.0:3002", "main.ts"]