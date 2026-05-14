# Multi-stage build để giảm kích thước image cuối cùng

# Stage 1: Builder - cài đặt dependencies
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install tất cả dependencies (bao gồm devDependencies để có thể chạy tests nếu cần)
RUN npm ci

# Copy source code
COPY . .

# Stage 2: Production - image cuối cùng chỉ có production dependencies
FROM node:20-alpine AS production

# Tạo non-root user để chạy app an toàn hơn
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy package files
COPY package*.json ./

# Chỉ install production dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy source code từ builder stage
COPY --from=builder --chown=nodejs:nodejs /app/src ./src

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "src/app.js"]
