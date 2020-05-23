#!/bin/bash

echo "start ngigx...."
docker run --rm -p 4200:80 -v dist/library-client-angular:/usr/share/nginx/html/ -d nginx
echo "ngigx started"


# docker run -p 80:80 --name mynginx -v $PWD/www:/www -v 