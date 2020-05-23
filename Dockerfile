FROM nginx

COPY dist/library-client-angular/  /usr/share/nginx/html/
COPY docker/nginx.conf /etc/nginx/conf.d/library-client.conf

EXPOSE 80
