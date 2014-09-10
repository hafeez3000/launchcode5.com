/**
 * Created by ryankimber on 2014-08-26.
 */
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
