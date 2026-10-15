FROM nginx:alpine

# Copiar los archivos estáticos a la carpeta pública de Nginx
COPY dist/ /usr/share/nginx/html/

# Exponer el puerto estándar HTTP
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
