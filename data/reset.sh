#!/bin/bash

cat reseed.sql | mysql -u root -h localhost
