---
layout: default
title:  "Read certificate SAN field using OpenSSL"
date:   2016-11-07 20:00:00
categories: main
---

## Read X.509 certificate SAN's othername field using OpenSSL

Public Key Infrastrucutre (PKI) is commonly used for HTTPS. It's basic idea states that we have private and public key, 
where private is only known by its owner. In case of secure websites public keys are known as certificates. 
Having certificate in PEM format and using *openssl* command we can show its data: 

~~~ bash
# openssl x509 -text -noout -in certificate.pem
~~~

Unfortunatelly, not everything is shown by default. Certificates may have encoded extensions like
[X509v3 Subject Alternative Name](https://tools.ietf.org/html/rfc5280#section-4.2.1.6).
One of the extension types is *otherName* is not decoded with above command. 
The only output we will see looks like this.

~~~
  ...
    X509v3 Subject Alternative Name: 
      othername:<unsupported>, othername:<unsupported>
  ...
~~~

As it states [here](https://archive.is/KZYqh) it is because the format may be totally arbitrary.

Fortunatelly, there is a way to decode it using *asn1parse* subcommand. First, lets see output 
of the command:

~~~ bash
# openssl asn1parse -in certificate.pem
~~~

Of course, it may differ based on certificate, but you should see something like that.

~~~
...
  700:d=4  hl=2 l= 109 cons: SEQUENCE          
  702:d=5  hl=2 l=   3 prim: OBJECT            :X509v3 Subject Alternative Name
  707:d=5  hl=2 l= 100 prim: OCTET STRING      [HEX DUMP]:0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF01234567
  907:d=1  hl=2 l=  13 cons: SEQUENCE   
...
~~~

OpenSSLs *asn1parse* always prints certificate's extensions like this, because there are encoded as OCTET STRINGs.
To see what is inside use *-strparse* option and an offset read from the begining of the output's line (here it is **707**). 

~~~ bash
# openssl asn1parse -in certificate.pem -strparse 707

    0:d=0  hl=2 l= 100 cons: SEQUENCE          
    2:d=1  hl=2 l=  47 prim: cont [ 2 ]        
   51:d=1  hl=2 l=   4 prim: cont [ 7 ]        
   57:d=1  hl=2 l=  29 cons: cont [ 0 ]        
   59:d=2  hl=2 l=   3 prim: OBJECT            :1.2.3.4
   64:d=2  hl=2 l=  22 cons: cont [ 0 ]        
   66:d=3  hl=2 l=  20 prim: UTF8STRING        :some-testing-value-1
   88:d=1  hl=2 l=  12 cons: cont [ 0 ]        
   90:d=2  hl=2 l=   3 prim: OBJECT            :1.2.3.5
   95:d=2  hl=2 l=   5 cons: cont [ 0 ]        
   97:d=3  hl=2 l=  13 prim: UTF8STRING        :other-value-2
~~~

Finally, some human readable form which is much nicer.
