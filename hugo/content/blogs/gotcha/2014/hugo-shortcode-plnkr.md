+++
date = 2014-11-10T21:49:12Z
disqusid = "2014-11-10-hugo-shortcode-plnkr"
draft = false
title = "Hugo Shortcode: Plnkr"
description = "Ryan builds a Hugo shortcode for including a Plnkr inline in an article or blogpost"
author = "ryan-kimber"
categories = ["gotcha"]
tags = ["hugo", "hugo-shortcode", "plnkr"]
+++
We're in the process of adding several new features to this website and as we do, we're planning on sharing those that might be useful to others using [Hugo](http://www.gohugo.io) as a web-publishing tool. 

In this brief post, we'll create and demonstrate a Hugo shortcode for embedding a Plunkr in a post/page/article.
 
If you haven't created a Hugo shortcode before, check out our more detailed post on [building a custom Hugo shortcode for syntax highlighting](/blogs/gotcha/2014/hugo-shortcode-syntax-highlighting/). This post won't go into that level of detail.

For those that haven't used [Plnkr](http://plnkr.co) before, perhaps you've used a similar online code editor like [Bootply](http://www.bootply.com) or [CodePen](http://www.codepen.io). Plnkr (sometimes called Plunkr) is a an excellent way of demonstrating code, either working or broken, online in a sand-boxed environment. 

It is becoming common-place for open-source projects to:

 - include Plnkr or CodePen examples in their documentation
 - require a Plnkr or CodePen example that demonstrates a bug before accepting a bug report 

For our use, a Plnkr is a great way to share a bit of JavaScript, HTML or CSS with our team and readers. 

#### The Plnkr Shortcode

Embedding a Plnkr in your page is as simple as embedding an iframe, so our shortcode markup is going to be pretty small:
{{% sourceFromFile language="markup" lineNumbers="true" startingLineNumber="1" href="source.html" %}}

In this shortcode, where we expect only one argument (the ID of the Plnkr), we've foregone the key="value" syntax. Instead, we are using {{ .Get 0 }} to get the first argument and use that as our Plnkr Id. The rest of the shortcode is just HTML markup and inline-styling (which belongs in a .css file).

With our completed shortcode in place, we need only include a line like the following in our article: 
{{% sourceFromFile language="markup" lineNumbers="true" startingLineNumber="1" href="plnkr.html" %}}

...and we get an inline Plnkr that we can play with:
 
{{% plunkr iWxWlCEvd6Uh8erUOyaF %}}


