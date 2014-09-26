+++
date = 2014-09-26T21:49:12Z
draft = true
title = "Don't use Angular Filters to Paginate - do this instead"
author = "ryan-kimber"
categories = ["tech"]
disqusid = "2014-09-26-dont-use-angular-filters-to-paginate"

+++
A frequently encountered task when building an application with AngularJS is to create a paginated view of an array or collection. 

I've encountered a number of places where I've seen developers try to accomplish handling this through the use of a filter and I've made that same mistake myself. I mean, it's so tempting. Take a look at the code snippet below:

{{% plunkr http://embed.plnkr.co/iWxWlCEvd6Uh8erUOyaF/preview %}}

{{% sourcecode javascript %}}// Usage &lt;div ng-repeat="item in collection | paginate:currentPageNumber:itemsPerPage"&gt;{{item}}&lt;/div&gt;
.filter('paginate', function(){
        return function(array, pageNumber, itemsPerPage){
            var begin = ((pageNumber - 1) * itemsPerPage);
            var end = begin + itemsPerPage;
            return array.slice(begin, end);
        };
    })
{{% /sourcecode %}}
