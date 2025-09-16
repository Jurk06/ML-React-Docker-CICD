# Frontend Dockerfile
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the project
RUN npm run build

# ------------------------
# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install "serve" only in production image
RUN npm install -g serve

# Copy built files from build stage
COPY --from=build /app/dist ./dist

EXPOSE 3000

# Run production server
CMD ["serve", "-s", "dist", "-l", "3000"]
