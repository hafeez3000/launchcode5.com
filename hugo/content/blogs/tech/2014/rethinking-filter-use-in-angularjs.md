+++
date = 2014-09-29T21:49:12Z
draft = false
title = "AngularJS 1.3: Time to Rethink Filter Use"
author = "ryan-kimber"
categories = ["tech"]
tags = ["AngularJS", "JavaScript"]
disqusid = "2014-09-29-rethinking-filter-use-in-angularjs"
description = "Ryan discusses the changes to Angular filters that may make them suitable for tasks they failed at in the past."

+++
### The Backstory  <span style="font-size: 10pt"><a href="javascript:scrollToId('point');">Skip to the point</a>

When I first started reading about AngularJS, one of the things that got me excited (after <a href="https://docs.angularjs.org/guide/databinding" target="_new">two-way data binding</a> and <a href="https://docs.angularjs.org/guide/templates">templates</a>, of course), was the concept of filters. They seemed like an elegant solution to a number of the challenges we all encounter in building a user interface: sorting, filtering, internationalization, and  more. 

Unfortunately, those early versions of Angular weren't very well optimized for filters, the documentation was poort and understanding of good vs poor filter use cases was not widespread. Developers that made extensive use of filters frequently found themselves with pages that were slow to render. This may be because developers used filters in ways that the Angular team didn't initially anticipate, or it may simply be because in creating and optimizing a framework like Angular, there are a lot of things to fix and improve in the early days and filters weren't on the top of that list.

Either way, articles started appearing such as Ben Nadel's "<a target="_new" href="http://www.bennadel.com/blog/2489-how-often-do-filters-execute-in-angularjs.htm">How Often do Filters Execute in AngularJS</a>" and some of the developers I was working with started shying away from them. Filtering datasets passed to ng-repeat directives proved especially easy for developers to get wrong and especially expensive at render time.

An organization I was working with undertook a major effort to improve rendering times and "we stopped using filters" was the short explanation I heard developers giving their peers on other teams to explain how they were able to achieve major performance improvements (the longer version would have mentioned html2js template compiling, minification of resources, pre-fetching of appropriate data, code-restructuring and the general replacement of ng-hide/ng-show directives with ng-if). For those that didn't hear the long explanation, the belief came to be that filters were nothing but trouble.

### Angular 1.3 to the Rescue
In the time since Angular 1.0, filters have become a more functional and optimized part of Angular, the places that are appropriate to use them have increased and the impact of misusing them has been minimized. They are now assumed to be stateless unless they are <a href="https://github.com/angular/angular.js/blob/master/CHANGELOG.md#breaking-changes-1">declared otherwise</a>, and so the results of a call to a filter can be cached by Angular as long as the parameters passed stay the same, meaning that aren't called nearly as often. Additionally, passing parameters to filters has been made easy, and being able to easily pass multiple parameters to a filter makes them a bit more useful and should completely remove any need for state (if you're trying to write a stateful filter, you're almost certainly trying to do something that would be better accomplished through a directive or a controller).
 
"You shouldn't paginate with a filter": That was a firmly held belief supported by my own experience and what I'd read/heard in the community: 

1. I'd seen proof in projects I'd worked on or helped out with; replacing filter-based pagination on medium-sized (1000's of rows) data sets with directive or controller-based pagination provided a significant improvement. 
2. <a href="https://twitter.com/briantford" target="_new">Brian Ford</a>, a member of the AngularJS Team wrote <a href="http://stackoverflow.com/questions/10816073/how-to-do-paging-in-angularjs" target="_new">"I'd avoid using a filter to separate the pages"</a> in reply to a StackOverflow question on paginating data with Angular
3. The previously mentioned <a href="http://www.bennadel.com/blog/2489-how-often-do-filters-execute-in-angularjs.htm" target="_new">Ben Nadel article</a> and <a href="https://www.google.ca/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#safe=off&q=improving+angularjs+performance+filter" target="_new">many AngularJS performance optimization threads or blogs</a> that tackle filters or incorrect use of them as a chokepoint. 

<span id="point"></span>With all of the improvements since 1.1 though, it's time to wonder if "you shouldn't paginate with a filter" is still true, so I decided to take put together a minimalistic pagination filter. The filter takes 3 arguments (the data array/collection, the current page number and the number of items to display in a page). Since all the data it could need is passed in the arguments, it's stateless. In total, it runs all of 5 lines of code including the Angular declaration:

### Simple Paginating Filter

{{% sourcecode javascript %}}// Usage &lt;div ng-repeat="item in collection | paginate:currentPageNumber:itemsPerPage"&gt;{{item}}&lt;/div&gt;
.filter('paginate', function(){
        return function(array, pageNumber, itemsPerPage){
            var begin = ((pageNumber - 1) * itemsPerPage);
            var end = begin + itemsPerPage;
            return array.slice(begin, end);
        };
    })
{{% /sourcecode %}}


I've also put together an example on Plunkr. Check it out and play with the number of data elements (line 13 of app.js):


{{% plunkr http://embed.plnkr.co/iWxWlCEvd6Uh8erUOyaF/preview %}}

<br />
Although this example is quite trivial, once the data array is initialized, there doesn't seem to be any noticeable performance hit in moving from page to page within the data, regardless of the number of rows. Certainly, decorating the table with editors or putting watches on the source data would have an effect on the overall performance of the page, but, in theory at least, this wouldn't be affected at all by the use of a filter for the pagination vs. any other mechanism. 

### In Summary

To sum up, the combined filter-related features and performance improvements in Angular 1.2 and now 1.3 should eliminate or mitigate many of the filter-related performance issues that developers experienced in previous versions of Angular. This is very encouraging and I expect to start making better use of filters in our projects. At the same time, I'd like to see some benchmarks and best-practices documentation surface before I get too carried away. For now, I'll be paying extra close attention to the conversation around filters and to how they are used in libraries like Angular-Bootstrap as AngularJS 1.3 becomes the stable release.

### I'd like to hear from you
If you've got a story of a great triumph or disaster with Angular filters, if you find a factual or technical error in the work on this site, or if you'd just like to share your thoughts, we'd love to hear from you. Please use the comments thread below, or click the contact link at the top of the page to get in touch.
