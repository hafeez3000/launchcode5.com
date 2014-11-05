+++
date = 2014-11-04T00:00:00Z
draft = true
title = "We're technical. We're Blogging. We are using Hugo."
image = "/images/posts/tech/2014/we-use-hugo.jpg"
author = "ryan-kimber"
categories = ["tech"]
tags = ["hugo", "wordpress"]
disqusid = "2014-09-29-we-use-hugo"
description = "Our company is technical. Our bloggers our technical. WordPress is not meant for us. Hugo is fast, endlessly configurable, it let's you into the code. We're Hugo people."
+++
I've tried to like WordPress. I really have. I see tremendous value in it and we will continue to use it when building sites for clients who need to be able to manage their own content. 75+ million sites are a testament to it's greatness (according to [managewp.com](http://managewp.com/14-surprising-statisics-about-wordpress-usage)).

It isn't, however, really great for us.

We're developers, technical architects and designers: Building web sites and applications is what we do. So when it comes to building a blog, we don't want a tool that's meant to keep us from hurting ourselves. We want something that frees us to be creative and to try new features. We want something that will encourage us to write more posts. If our blogging tool was a car, we'd want it to be an assembled kit car, not a production Toyota with airbags, wheel locks and rain-sensing wipers. In fact, we don't want a 'blogging tool'. 

We want a web publishing tool that suits a 2014 web application developer.
 
### The Expectations of a 2014 Web Application Developer
 
As developers, we've come to expect 2014 features from our 2014 development tools. The content management systems of the world simply aren't meant for that.

We need something different. We need something that's truly flexible. We need something that works the way we work. Something that we can run anywhere and produce a web site that we can deploy 
We've ditched WordPress. We've switched to Hugo and we won't be going back. 

Before we get into why though, let me put it out there that WordPress is an amazing tool that's been remarkably successful. It has revolutionized the creation of blogs and corporate web sites. It is being used for over 76 million sites including 48% of the world's top 100 blogs ([ManageWP](http://managewp.com/14-surprising-statisics-about-wordpress-usage)).

If fact, if we're building a site for a client and they need to be able to maintain their own content, we'll definitely consider WordPress.

But this switch isn't about our clients. In fact, it's not even about any sort of limitations of WordPress. It's about the audience. It's about us.

### We're Developers and we have Modern Developer Expectations for our CMS

We have a lot of expectations. Expectations that CMS systems like WordPress are having a hard time keeping up with. We've become accustomed to the tools of modern web development and we want the same tools and paradigms to work for our blog and site. At the very least, we want our site and articles to be versioned as we go, tagged and saved in GitHub or BitBucket. We want to be able to edit and view our changes even when we're offline. We want complete separation of production and development so that we can't accidentally publish an article or change early.  

We also have a bunch of things we don't want. For example, I don't want to have to run a database on my laptop in order to view/edit my articles. We don't want to have to run a development or staging server to be able to test our updates and changes. We don't want to have to do database extracts and restores to move things from one environment to another.

It turns out that what we want isn't a CMS at all: We want a (static site generator)[https://www.staticgen.com/]. Static site generators have been gaining popularity in recent years and there are lots of them out there, but the one we've selected is [Hugo](http://www.gohugo.io).

Like many other static site generators, Hugo allows us to define a series of template files in HTML. It allows us to define partial files that can be reused in our different templates. It allows us to create 'shortcodes', which are essentially custom tags that we can use to define functionality we'd like to be able to re-use in different posts, like syntax highlighting, or maps, or whatever else we may think of. Like the other static site generators, Hugo lets us write blog posts in plain-text Markdown files and then generates static, deployable HTML by merging our templates, shortcodes and markdown into HTML files. 

Hugo has some major advantages over the other static site generators that are out there and they principally come down to these three things:

- Speed - Hugo is really, really fast. It can generate complete sites from your markdown and templates in a fraction of a second
- No Dependencies - Hugo ships as an executable - no setting up a web framework like Ruby on Rails - just download the file, put it somewhere you can execute it, and you're good to go. 
- Compatible with many of the development tools we're used to like Node, Bower and Gulp, making it easy for us to extend it's functionality. 

What we want, is a static site generator. 

- Complete separation of development and production
- Automatic partial rebuilds of only affected files when we change anything
- Automatic browser refresh to pick up the changes to code, markup or style with every save
- Auto-complete in our development environment for CSS, JavaScript, HTML and any other tools we're using
- Customizable source structure/organization
- 100% transparency - inputs and outputs of tools should be clear every step of the way
- Easy scalability
- CDN-ready - we should be able to CDN-ize our whole site to have it served at high speed anywhere in the world
- Source Version Control - every change to blog posts, source code, style, etc, should all be versioned 


And here's what we don't want:

- A dependency on a database (browser-server only)
- 
- We want complete separation of our working and production environments
- We don't want to have a 3-tier architecture on our laptops to work offline
- We want changes we make to files to instantly trigger partial rebuilds of only the files affected by the change
- We want our browsers to automatically refresh to see changes we've made to code, markup or style as we're making the changes.
- We want auto-complete for our CSS, JavaScript, HTML and other files.
- We want our tools to be 100% transparent - we should easily be able to look at all the inputs and outputs every step of the way
- We want to be able to quickly make customizations without fighting the tool
- We want our site to be really fast (we mean it - really, really fast)
- We want our site to get better over time, so we want it to be easy to tweak without breaking anything
- We want to be able to take advantage of CDNs for all our content - not just images, 3rd-party libraries and CSS
- We want our production site to be reliable, with as few dependencies as possible
- We want backups and switching between versions of the site to be instantaneous and easy
- We want our work persisted to GitHub or BitBucket - every version of every part of the site, articles included, should be tracked every step of the way.


Monolithic CSS files will not do any more. Multiple includes of CSS files won't do. In fact, we don't want to use CSS. We want to use SASS. And when we make a change to our SASS, we want the browser to instantly update with the generated CSS.

Developer tooling has changed tremendously in the past couple of years and for many types of development has eliminated regular calls to build scripts & constant browser refreshes. We've reached a new paradigm on code organization  to eliminate. While a couple of years ago we would have all been amazed if we were shown a change to a CSS file instantly pushed to a  Our team expects to be able to make changes to an SASS source file and instantly see the change to the web page their working on without refreshing their browser.

A lot of us developer types these days want our tools to do incredible things for us, but we want transparency, we want the tools to be nearly invisible as they do their jobs. 
 
We've been building a lot lately with Node.js, AngularJS & Gulp.js. 

WordPress is great if you aren't particularly technica. It's great if you aren't trying to make it bend to do things it wasn't particularly meant to do. WordPress is like a lot of great tools: By making it really easy to do particular things, it makes it Great if you don't want to mix in a bunch of different JavaScript libraries. Perfect if you're willing to use one of their basic templates or willing to pay have something that looks okay. It's just that, it's not perfect for me.

We're all highly technical here, and so we've got our own wants for our website:



A large number of those 76 million sites are actually corporate web sites and that's where WordPress really shines - it allows a designer to create an initial web-site and then hand over the reigns to less technical users who can then maintain the content, post new articles, etc, without developer/designer intervention.

In the past few years, a number of (static site generators)[https://www.staticgen.com/] have sprung up that allow you to write your blog posts in Markdown or a similar format, and generate HTML, CSS and other static files that can then be deployed to a web server to comprise your web site.

This really appeals to me for a number of reasons: 
    
    - Reliability - deploying static files means there's no MySQL, PHP or other infrastructure to run (any simple web server will do)
    - Speed - instead of contacting the database, reading the templates and the page content and building a response when the browser has made a request, the web server just returns that requested file. Tough to get much faster than that.
    - 
I'm a techie - I've been designing & developing web-based solutions for years. I don't really want all the help that WordPress gives me. I want something that I, as a developer, find easy to use. I want something that's reliable, that costs virtually nothing to run, that I can work on offline and without dependencies like MySQL. Since this is starting to look like a list, what I want is a tool that: 

    - I can run on my laptop or desktop
    - Has zero production dependencies - no database server - just static files
    Is two-tiered - browser and file/web server: I don't want to install or depend on a database server
    - Has little learning curve (beyond knowing HTML/CSS/JavaScript)
    - Gives me full control over look and feel using HTML & CSS
    - Costs nothing/nearly nothing to host