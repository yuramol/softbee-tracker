map $http_upgrade $connection_upgrade {
    default         upgrade;
    ''              close;
}
server {   
  server_name dev.track.softbee.io www.dev.track.softbee.io;
       
  location / {
    # Backend nodejs server
    proxy_pass         http://127.0.0.1:5000;
    proxy_http_version  1.1;
    proxy_set_header    Upgrade     $http_upgrade;
    proxy_set_header    Connection  $connection_upgrade;
  }

  listen [::]:443 ssl ipv6only=on; # managed by Certbot
  listen 443 ssl; # managed by Certbot
  ssl_certificate /etc/letsencrypt/live/dev.track.softbee.io/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/dev.track.softbee.io/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
server {
  if ($host = www.dev.track.softbee.io) {
    return 301 https://$host$request_uri;
  } # managed by Certbot

  if ($host = dev.track.softbee.io) {
    return 301 https://$host$request_uri;
  } # managed by Certbot

  listen 80;
  listen [::]:80;

  server_name dev.track.softbee.io www.dev.track.softbee.io;
  return 404; # managed by Certbot
}