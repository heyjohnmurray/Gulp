#!/bin/bash

brew install node
brew install mysql
mysql_install_db --verbose --user=`whoami` --basedir="$(brew --prefix mysql)" --datadir=/usr/local/var/mysql --tmpdir=/tmp
mysql.server start
cat default.sql | mysql -u root -h localhost
reset.sh

npm install
