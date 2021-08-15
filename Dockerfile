FROM centos:8

WORKDIR /portfolio_web_site

RUN dnf -y update

RUN dnf -y install epel-release

RUN curl -sL https://rpm.nodesource.com/setup_15.x | bash -
RUN dnf install -y gcc-c++
RUN dnf install -y nodejs

RUN dnf -y clean all
RUN rm -r /var/cache/dnf
RUN dnf -y upgrade

RUN npm install -g yarn
RUN yarn global add  vue-cli
RUN yarn global add  nuxt
RUN yarn global add  create-nuxt-app
RUN yarn global add  npm-check-updates
RUN yarn


ENV HOST 0.0.0.0

# CMD ["yarn"]
