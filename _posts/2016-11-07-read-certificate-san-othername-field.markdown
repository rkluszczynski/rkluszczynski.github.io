---
layout: default
title:  "Read certificate SAN field using OpenSSL"
date:   2016-11-07 20:00:00
categories: main
---

## Read X.509 certificate SAN's othername field using OpenSSL

Public Key Infrastrucutre (PKI) is commonly used for HTTPS. It's basic idea states that we have private and public key, where private is only known by its owner. Public key is available for everyone to download. In case of secure websites we talk about certificates. 

~~~ bash
# openssl x509 -text -noout -in certificate.pem
~~~


TODO

http://serverfault.com/questions/587662/openssl-always-shows-unsupported-for-all-subjectaltname-othername-utf8-value

https://www.mail-archive.com/openssl-users@openssl.org/msg30828.html

openssl asn1parse -in cert.pem

openssl asn1parse -in cert.pem -strparse 768
