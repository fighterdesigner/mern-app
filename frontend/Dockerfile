FROM node:14.18.1

RUN rm /usr/share/nginx/html/*

COPY ./build/* ./usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
