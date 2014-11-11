+++
date = 2014-11-09T21:49:12Z
disqusid = "2014-11-09-hugo-shortcode-syntax-highlighting-with-prismjs"
draft = false
title = "Hugo Shortcode: PrismJS Syntax Highlighter"
description = "Ryan builds a  Hugo shortcode for doing source code syntax highlighting It's easy to create a shortcode for highlighting in Hugo with Prism"
author = "ryan-kimber"
categories = ["gotcha"]
tags = ["hugo", "hugo-shortcode", "prismjs"]
+++
As we've [recently written](/blogs/tech/2014/we-are-technical-we-are-blogging-we-are-using-hugo/), we've used [Hugo](http://www.gohugo.io) to build and maintain this site and we're thrilled with it. 

One of Hugo's features, is custom '[shortcodes](http://gohugo.io/extras/shortcodes/)'. Shortcodes will be familiar to WordPress users; they are custom-templates that we can create and reference in blog post to insert or format content. 

Over the next few paragraphs, we're going to build a shortcode that provides syntax highlighting using the [Prism.js](http://www.prismjs.com) library. We'll use this to replace the highlighting that Hugo supports out of the box. Prism makes it easy for us have line-numbering, load source from external files, highlight specific lines of code and has additional languages support.

First though, a couple of quick things to in preparation: 

<ol>
    <li><a href="http://prismjs.com/download.html">Download a copy of Prism.js</a> with the features you'd like enabled and put it in your hugo/static/js folder. We've selected the options for Line Numbers, AutoLinker and File Highlight.</li>
    <li>Add the CSS we'll need for syntax highlighting. We have a <a href="https://github.com/Launchcode5/launchcode.com/blob/master/hugo/static/css/prism.scss">prism.scss file</a> that gets built into our main.css file, but you could add it as a separate file or just add the styles to your existing CSS.</li>
    <li>Add a reference to the script near the end of your page template (but before the closing &lt;/body&gt; tag) and initialize Prism. We've added the following lines to our footer template since it gets included in all of our compiled blog pages:
    {{% sourceFromFile lineNumbers="true" language="markup" startingLineNumber="1" href="footer.html"  %}} 
    </li>
</ol>

#### The Sourcecode Shortcode

With the tasks above completed, all that remains is to create our shortcode. We're going to create an .html file with the same name that we want to use for our shortcode. In this case, we're creating a file called <a href="https://github.com/Launchcode5/launchcode.com/blob/master/hugo/layouts/shortcode/sourcecode.html">sourcecode.html</a> in my hugo/layouts/shortcodes folder with the following content:
{{% sourceFromFile lineNumbers="true" language="markup" startingLineNumber="1" href="sourcecode.html" %}}

##### What's Happening in the Shortcode

1. We are using three parameters: lineNumbers, language, and startingLineNumber. None of the parameters is required - it will default to rendering markup-highlighted syntax without line numbers. 
2. We are calling {{ .Inner }} inside the shortcode. This provides all of the text passed between our opening and closing shortcode tags when we use it one of our markdown files.

{{% sidenote title="Hugo Version Notes" %}}
There have been some changes between Hugo v0.11, v0.12 and v0.13 that affect how {{ .Inner }} is handled in your shortcodes. 
##### Hugo v0.11
In this version of Hugo, {{ .Inner }} was output as-is in your HTML - so it was basically unprocessed.
##### Hugo v0.12
As of Hugo v0.12, for behavioural consistency, calling {{ .Inner }} returns markdown-processed HTML. This has the effect of wrapping the text in &lt;p&gt; tags. To prevent this try using {{ printf "%v" .Inner }} instead. 

##### Hugo v0.13
Hugo v0.13 will make it possible to specify how you want a shortcode to handle the contents of the tag:
 
- {{% shortcodeName %}} contents {{% /shortcodeName %}} will treat the contents as markdown
- {{&lt;  shortcodeName &gt;}} contents {{&lt; /shortcodeName  &gt;}} will treat it as HTML markup, so this workaround won't be required).
{{% /sidenote %}}

Now that we've got our shortcode in place, as well as the CSS and JavaScript that it relies on, we're able to make use of the shortcode within our markdown. You've seen the output of our shortcode in the three examples above, and over in our article on [Rethinking Filter Use in AngularJS](/blogs/tech/2014/rethinking-filter-use-in-angularjs/#point). As an example of how to use our new shortcode, we've included a snippet of that post below:
{{% sourceFromFile lineNumbers="true" language="javascript" startingLineNumber="31" href="example-usage.html" %}}

#### Bonus - sourceFromFile Shortcode

For our own use, we've also created a [sourceFromFile shortcode](https://github.com/Launchcode5/launchcode.com/blob/master/hugo/layouts/shortcode/sourceFromFile.html) that loads the source from an external file instead of using {{ .Inner }}.

It's even easier to use and keeps your markdown file cleaner:
{{% sourceFromFile lineNumbers="true" language="markup" startingLineNumber="1" href="example-sourcefile-usage.html" %}}

By loading the file source file dynamically this way, we also ensure that Hugo doesn't try to make any modifications to the sourcecode, which is nice, especially if you are displaying code that includes Hugo/Go markup. 

### We’d like to hear from you
If you’ve got a story about using Hugo, shortcodes or any other web design or application topics, we'd love to hear from you. Please leave us a comment or use the contact link at the top of the page to get in touch. 
