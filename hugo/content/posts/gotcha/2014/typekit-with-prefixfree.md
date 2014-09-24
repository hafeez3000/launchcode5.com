+++
date = 2014-09-23T21:49:12Z
disqusid = "2014-09-22-typekit-and-prefixfree"
draft = false
title = "Typekit with Prefixfree.js"
description = "Using typekit and prefixfree together can lead to Cross-Origin/XHR Warnings."
author = "ryan-kimber"
categories = ["gotcha"]
+++
Adobe's [Typekit](https://typekit.com) service is a fantastic way to bring personality to a web site through the use of appropriate type faces.

[Prefixfree.js](http://leaverou.github.io/prefixfree/) is a JavaScript library that rescues a web designer from having to add browser-specific CSS properties to their stylesheets - it automatically adds the appropriate browser-specific CSS properties on the fly based on the current browser being used and the standard CSS properties in your stylesheet. Simply fantastic.

Unfortunately, when you bring these two tools together, you may find yourself running into "No 'Access-Controll-Allow-Origin' header present..." warnings or other cross-site-scripting warnings in your console.

The image below illustrates what happens in Google Chrome:

{{% figure src="/images/posts/gotcha/2014/typekit-with-prefixfree-error.png" title="Chrome Console Screen Capture" %}}

While this doesn't affect the display of the page, it certainly is annoying and isn't something we want users to see. Once you understand what's happening though, it is pretty easy to fix.

So, here's what's happening:

 1. TypeKit dynamically adds a stylesheet declaration to the head of the document, which is how we're able use the TypeKit fonts without having to declare the font-faces ourselves.
 2. Prefixfree.js walks the document looking for any linked CSS files and inline styles, it reads through those files to figure out what browser-specific properties it needs to add in.
 3. Prefixfree.js encounters that dynamically added TypeKit CSS and tries to load it.
 4. The browser blocks this action and logs it's warning to the console.
    
Normally, you can prevent prefixfree.js from parsing a particular stylesheet by adding data-noprefix="true" as an attribute in the &lt;link ...&gt; tag, but in this case, the &lt;link ...&gt; is being added dynamically, so we aren't able to do that.
 
Instead, what will work is making a small modification to the JavaScript where we are loading TypeKit to add this attribute when TypeKit loads. Assuming you have jQuery available, the solution looks like this:

{{% sourcecode html %}}
<script>
(function(d) {
    var config = {
                kitId: 'irq3kqa',
                scriptTimeout: 3000
            },
            h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);
        try{
            Typekit.load(config);
            //Fix to prevent CORS error/collision with prefixfree.js
            jQuery('head').find('link[rel=stylesheet]:last').attr('data-noprefix', true);
        }
        catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);
</script>
{{% /sourcecode %}}

...and now that I know that, hopefully we won't be running into that anymore. =)
