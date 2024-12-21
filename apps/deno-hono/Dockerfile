FROM denoland/deno:alpine-2.1.4

ENV LISTEN_HOST=0.0.0.0

EXPOSE 3001

WORKDIR /app

COPY deno.* .
COPY *.ts .

RUN deno cache main.ts

CMD ["run", "--watch", "--allow-env=LISTEN_HOST", "--allow-net=0.0.0.0:3001", "main.ts"]