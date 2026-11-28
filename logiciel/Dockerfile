# UNIVERSNORMES QHSE — image du serveur multi-utilisateurs
#   docker build -t universnormes-qhse .
#   docker run -d -p 3000:3000 -v qhse-donnees:/data --env-file serveur/.env universnormes-qhse
FROM node:22-alpine
WORKDIR /app
COPY . .
RUN cd serveur && npm ci --omit=dev
ENV NODE_ENV=production DATA_DIR=/data PORT=3000 TZ=Africa/Abidjan
VOLUME /data
EXPOSE 3000
CMD ["node", "serveur/server.js"]
