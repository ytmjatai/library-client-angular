FROM nginx

# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/library-client-angular/  /usr/share/nginx/html/

EXPOSE 80 443 3000
