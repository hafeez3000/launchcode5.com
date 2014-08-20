+++
date = 2014-08-12T21:49:12Z
draft = false
title = "about"

+++
Some content created in Hugo - testing
--------------------------------------

This is before the highlight

{{% highlight html %}}
<section id="main">
  <div>
   <h1 id="title">{{ .Title }}</h1>
    {{ range .Data.Pages }}
        {{ .Render "summary"}}
    {{ end }}
  </div>
</section>
{{% /highlight %}}

And this is after the highlight.

