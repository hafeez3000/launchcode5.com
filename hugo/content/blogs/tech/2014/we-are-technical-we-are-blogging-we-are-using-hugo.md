+++
date = 2014-11-05T00:00:00Z
draft = false
title = "Technical & Blogging? Here's Why We're Using Hugo."
image = "/images/posts/tech/2014/we-use-hugo.jpg"
author = "ryan-kimber"
categories = ["tech"]
tags = ["hugo", "wordpress"]
disqusid = "2014-11-05-we-use-hugo"
description = "Our company is technical. Our bloggers our technical. WordPress isn't meant for us. Hugo is fast, endlessly configurable, it works the way we work. We're Hugo people."
+++

We have been using WordPress for projects for years and appreciate it's huge community, massive number of plugins and the ease of use it can bring to our clients. However, when it's come to building our own site and blog, we chose to use [Hugo](http://www.gohugo.io), an open-source static site generator. The following paragraphs explain why: 

### WordPress isn't meant for Us

As a platform for the maintenance of content by non-technical users, WordPress is pretty great. This makes it an attractive platform for the development of sites that will later be handed over to non-technical users who will maintain the content, create new articles, etc. 

As a tool for a developer building a web site, WordPress is pretty cumbersome. It's slow. It has external dependencies like MySQL and PHP. Developer tooling for it is poor. These things don't much matter to your customer and so the benefits of the ease of content creation and maintenance win out over these concerns when you are building a site for a client. 

But what about when we're building a site *for ourselves*? 

We're a group developers, technical architects and designers: Building web sites and applications is what we do. We don't want a tool that's meant to keep us from hurting ourselves. We want something that frees us to be creative and to try new features. We want something that will encourage us to write more posts. If our blogging tool was a car, we'd want it to be completely customizable and easy to take apart, not a production Toyota with airbags, wheel locks, rain-sensing wipers and a host of factory-installed options. We don't want WordPress at all.

We want a *web publishing tool* that is suited to a 2014 web application developer.
 
### The Expectations of a 2014 Web Application Developer
 
As developers, we've come to expect certain modern comforts from our development tools. These are features like file watching with partial rebuilds, automatic browser refreshing and auto-complete on markup, CSS, JavaScript, etc. We want verison control through GitHub or BitBucket. We want to be able to clone a repository, run a command and have our development environment up and running on any computer **without having to install 15 other tools or packages**. We want to be able to work offline and still see exactly what our site will look like online. WordPress and it's CMS brethren simply aren't meant for that.

To get the features we want, we have to look for a different kind of product. We have to find a [static site generator](https://www.staticgen.com/).

Static site generators typically allow you to write blog posts in Markdown, then take your markdown posts and merge them with template files to generate a static HTML web site for you. This has a tonne of advantages as static HTML sites can be run anywhere, can be deployed anywhere, don't require a database, are inherently secure and fast and are really easy to work with. 

### Why Hugo?

There are a number of static site generators out there these days ([staticgen.com](http://www.staticgen.com) lists 64 of them), but we've specifically chosen [Hugo](http://www.gohugo.io) for a number of reasons.
 
 1. It's really, really fast: It can generate a complex site of thousands of pages in just a couple of seconds. Milliseconds for a smaller site.
 2. It doesn't have any dependencies: Most of the more popular static site generators require setting up a Node.js, Ruby-on-Rails or Python environment. Hugo is a single executable that you can put anywhere in your path. 
 3. It's extremely flexible. We can organize our source, static content and blog posts how we want. We can define templates and custom-tags (called shortcodes) that we can use in our markdown. It's easy to create both generated and static content.
 4. It's simple command-line interface makes it easy to integrate with tools we love (like [SASS](http://sass-lang.com/) and [gulpjs](http://gulpjs.com/)!)
 5. It's open-source, free and has an active, responsive and growing community. 

The site you're looking at now was built with Hugo and was built quickly. Adding new articles/posts is as simple as creating a new markdown file. More importantly though, everything we do to maintain and build our site is 100% familiar to us as web developers. I'm finally home. 

### More to Come
 
In the coming weeks, I'll be adding articles describing how to integrate [gulpjs](http://www.gulpjs.com) with Hugo to add the power and features of the Gulp stream building system, such as single-command deployment, to a Hugo site, as well as some Gotcha/Quick Fix posts on some useful custom tags/shortcodes. I'll keep this section updated with links to new Hugo articles as we add them, but an even better place to check is our [Hugo tag page](/tags/hugo/).