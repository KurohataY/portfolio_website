FROM almalinux:latest

WORKDIR /portfolio_website_nuxt3

RUN dnf -y update

RUN dnf -y install epel-release

RUN curl -sL https://rpm.nodesource.com/setup_18.x | bash -
RUN dnf install -y gcc-c++
RUN dnf install -y nodejs

RUN dnf -y clean all
RUN rm -r /var/cache/dnf
RUN dnf -y upgrade
RUN yum groupinstall 'Development Tools' -y

RUN npm install -g yarn
RUN yarn global add  npm-check-updates


ENV HOST 0.0.0.0
