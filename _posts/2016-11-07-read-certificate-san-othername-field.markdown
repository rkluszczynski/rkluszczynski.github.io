---
layout: default
title:  "Read certificate SAN field using OpenSSL"
date:   2016-11-07 20:00:00
categories: main
---

## Read X.509 certificate SAN's othername field using OpenSSL

TODO

http://serverfault.com/questions/587662/openssl-always-shows-unsupported-for-all-subjectaltname-othername-utf8-value

https://www.mail-archive.com/openssl-users@openssl.org/msg30828.html

openssl asn1parse -in cert.pem

openssl asn1parse -in cert.pem -strparse 768
