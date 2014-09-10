+++
date = 2014-09-22T21:49:12Z
draft = true
title = "Leadership in Tough Times"

+++
Leadership in tough times
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

And this is some stuff I added to trigger a build. Now a second time.

