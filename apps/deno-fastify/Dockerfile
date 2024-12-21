FROM denoland/deno:alpine-2.1.4

ENV LISTEN_HOST=0.0.0.0

EXPOSE 3000

WORKDIR /app

# RUN addgroup --system --gid 1001 denoland
# RUN adduser --system --uid 1001 denoland

# USER denoland

COPY deno.* .
COPY *.ts .

RUN deno cache main.ts

CMD ["run", "--watch", "--allow-env=NODE_V8_COVERAGE,V8_COVERAGE,LISTEN_HOST", "--allow-net=0.0.0.0:3000", "--allow-sys=hostname,networkInterfaces", "main.ts"]