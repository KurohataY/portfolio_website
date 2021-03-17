FROM centos:8

WORKDIR /portfolio_web_site

RUN yum -y update

RUN yum -y install epel-release
RUN yum -y install http://rpms.remirepo.net/enterprise/remi-release-8.rpm

RUN yum -y upgrade
RUN yum -y install nginx

RUN curl -sL https://rpm.nodesource.com/setup_15.x | bash -
RUN yum install -y gcc-c++
RUN yum install -y nodejs


RUN npm install -g vue-cli
RUN npm install -g nuxt
RUN npm install -g create-nuxt-app


ENV HOST 0.0.0.0



# CMD ["nginx", "-g", "daemon off;"]
