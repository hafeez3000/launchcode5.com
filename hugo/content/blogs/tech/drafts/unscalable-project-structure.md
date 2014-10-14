+++
date = 2014-08-12T21:49:12Z
draft = true
title = "Scalable Project Structure"
author = "ryan-kimber"
categories = ["tech"]
disqusid = "2014-10-22-twitter-and-yahoo-oauth"
tags = ["drafts"]
+++

Countless tutorials and books encourage us to adopt a file structure that has been in place since time immemorrial: Group code by function type - ie. business entities in a folder, view-related code in a folder, entity-manipulating logic in a folder, utilities in another folder.

This makes a lot of sense in the world of building trivial tutorials and applications. It looks nice, it demonstrates that the author put some thought to structure, etc, etc.

The truth, however, is that this type of code organization is difficult to scale, creates a steep learning curve for new staff members, makes the protection of intellectual property difficult in a project that relies on out-sourcing, etc, etc.

There do seem to be some advocates for change in this area and I count myself among them. After having to initiate many new team members into existing projects and watching them struggle as the try to find the elements they should be touching in a large code base to implement a small feature, I am convinced that sourcecode, as much as is possible, should be organized by feature.