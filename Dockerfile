########################  Etapa 1  — Build con Vite  ########################
FROM node:18-alpine AS build

WORKDIR /app

# 1. Dependencias
COPY package*.json ./
RUN npm ci

# 2. Código fuente
COPY . .

# 3. Variables de entorno que Vite necesita en compile-time
ARG VITE_API_URL
ARG VITE_PYGEOAPI_URL
ENV VITE_API_URL=$VITE_API_URL \
    VITE_PYGEOAPI_URL=$VITE_PYGEOAPI_URL

# 4. Build estático (dist/)
RUN npm run build   # genera /app/dist

########################  Etapa 2  — Nginx en runtime  ######################
FROM nginx:stable-alpine

# 5. Puerto que Render inyecta (o 80 en local)
ENV PORT=${PORT:-80}

# 6. Config: templated para escuchar en $PORT y soportar SPA (React Router)
COPY nginx/nginx.conf.template /etc/nginx/templates/default.conf.template

# 7. Archivos estáticos
COPY --from=build /app/dist /usr/share/nginx/html

# 8. Arranque — genera la conf final con el puerto correcto
CMD sh -c "envsubst '\$PORT' < /etc/nginx/templates/default.conf.template \
           > /etc/nginx/conf.d/default.conf && \
           nginx -g 'daemon off;'"
