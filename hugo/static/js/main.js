/**
 * Created by ryankimber on 2014-08-26.
 */

function noArticles(event)
{
    alert("We're still drafting articles for this new section.\r\nSubscribe to our RSS feed, follow us on Twitter, or come back soon for new posts.");
    event.preventDefault();
    return false;
}

function scrollToId(id)
{
    jQuery('html, body').animate({
        scrollTop: jQuery('#' + id).offset().top
    }, 500);
}


function tweet(event, text, url) {

    //Prepare to call bit.ly for a shortened version of the URL
    var defaults = {
        version:    '2.0.1',
        login:      'launchcode5',
        apiKey:     'R_bf991e5a80084f478eb91419aa1956f0',
        history:    '0'
    };

    // Build the URL to query
    var daurl = "http://api.bit.ly/shorten?"
        +"version="+defaults.version
        +"&longUrl="+ encodeURIComponent(url)
        +"&login="+defaults.login
        +"&apiKey="+defaults.apiKey
        +"&history="+defaults.history
        +"&format=json&callback=?";

    //Once we've synchronously called bit.ly, we open a popup for twitter.
    //We do this synchronously so that we're opening the popup within the trusted event context (so we don't get blocked by a popup blocker)
    var successFn = function(data) {
        // Make a good use of short URL
        var shortUrl = data.results[url].shortUrl;
        var width  = 575,
            height = 400,
            left   = ($(window).width()  - width)  / 2,
            top    = ($(window).height() - height) / 2,
            opts   = 'status=1' +
                ',width='  + width  +
                ',height=' + height +
                ',top='    + top    +
                ',left='   + left,
            queryString = 'text=' + encodeURIComponent('Checkout this article: ' + text) +
                '&via=launchcode5' +
                '&via=launchcode5' +
                '&url=' + encodeURIComponent(shortUrl);

        window.open('https://twitter.com/share?' + queryString, 'twitter', opts);
    };

    // Utilize the bit.ly API
    //$.getJSON(daurl, function(data){
    jQuery.ajax({
        dataType: "json",
        url: daurl,
        asynch: false,
        success: successFn});

    event.preventDefault();
    return false;
}

function sendContactMail()
{
    //collect values from the UI.
    var fullname = jQuery('#contactFullname').val();
    var emailAddress = jQuery('#contactEmail').val();
    var phone = jQuery('#contactPhone').val();
    var subject = jQuery('#contactSubject').val();
    var message = jQuery('#contactText').val();

    var mandrillMessage = {
        'key': 'aCWt44WwNLjZsspYAlrvFw',
        'template_name': 'wychwood-contact',
        'template_content': [
            {
                'contactFullname' : fullname,
                'contactEmail' : emailAddress,
                'contactPhone' : phone,
                'contactSubject' : subject,
                'contactText' : message
            }
        ],
        'message': {
            'from_email': emailAddress,
            'from_name': fullname,
            'headers': {
                'Reply-To': emailAddress
            },
            'subject': 'Wychwood Contact Form Submission',
            'text': message,
            'to': [
                {
                    'email': 'info@wychwoodsoft.com',
                    'name': 'Wychwood Software Studios - Info',
                    'type': 'to'
                }],
            'merge': true,
            'global_merge_vars': [
                {
                    "name": "merge1",
                    "content": "merge1 content"
                }
            ],
            'merge_vars': [
                {
                    'rcpt': 'info@wychwoodsoft.com',
                    'vars': [
                        { 'name': 'contactFullname', 'content': fullname },
                        { 'name' : 'contactEmail', 'content' : emailAddress },
                        { 'name' : 'contactPhone', 'content' : phone },
                        { 'name' : 'contactSubject', 'content' : subject },
                        { 'name' : 'contactText', 'content' : message }
                    ]
                }
            ]
        }
    };

    console.log("Mandrill Message: ", mandrillMessage);

    jQuery.ajax(
        {
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send-template.json",
            data: mandrillMessage
        })
        .done(function(response) {
            alert('Your message has been sent. Thank you!'); // show success message
            console.log("Response:", response);
            jQuery("#contactFullname").val(''); // reset field after successful submission
            jQuery("#contactEmail").val('');
            jQuery("#contactPhone").val('');
            jQuery('#contactSubject').val('');
            jQuery('#contactText').val('');
            jQuery('#contactClose').click();
        })
        .fail(function(response) {
            alert('Error sending message.');
            console.log("Error response: ", response);
        });
    return false; // prevent page refresh
}
