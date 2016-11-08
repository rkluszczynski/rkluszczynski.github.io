---
layout: default
title:  "Force HTTPS with haproxy"
date:   2016-11-06 23:00:00
categories: main
---

## Force HTTPS with haproxy

TODO

~~~ 
frontend  main *:80
    redirect scheme https code 301 if !{ ssl_fc }
~~~


~~~ 
frontend  main *:80
    redirect code 301 location https://rkluszczynski.github.io/portal if !{ ssl_fc }
~~~

