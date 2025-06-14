FROM nginx:alpine

# Copy the static files to nginx
COPY . /usr/share/nginx/html

# Expose port 8080 (Cloud Run requirement)
EXPOSE 8080

# Update nginx configuration to listen on port 8080
RUN sed -i 's/80/8080/g' /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
