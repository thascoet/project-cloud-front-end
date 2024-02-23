# Étape de construction (build)
FROM node:latest AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Installation des dépendances
RUN npm install

# Copier tous les fichiers de l'application
COPY . .

# Build de l'application avec npm
RUN npm run build

# Étape de production
FROM nginx:alpine

# Copier le build de l'application à partir de l'étape précédente
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port 80 pour Nginx
EXPOSE 80

# Commande pour démarrer Nginx dans le conteneur
CMD ["nginx", "-g", "daemon off;"]