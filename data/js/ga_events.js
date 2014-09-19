$(function(){

    function track() {
        var args = Array.prototype.slice.call(arguments, 0);
        return function(e) {
            return _gaq.push(['_trackEvent'].concat(args));
        };
    }


    $('#zip, .zip')
        .focus(track('Landing Page', 'Focus', 'Zip Code', 1, true));

    $('#yearBuilt')
        .change(track('Landing Page', 'Selected', 'Year Built', 1, false));

    $('#quoteMeButton')
        .click(track('Landing Page', 'Click', 'Request Quotes', 1, false));

    $('#quoteMeButton2')
        .click(track('Landing Page', 'Click', 'Request Quotes', 1, false));

    $('.hpSubmit')
        .click(track('Landing Page', 'Click', 'Start Quotes Home', 1, false));

    $('.hpAutoSubmit')
        .click(track('Landing Page', 'Click', 'Start Quotes Auto', 1, false));

    $('.serviceable-customer .submit')
        .click(track('Landing Page', 'Click', 'Lead Submit', 1, false));

    $('.verisign')
        .click(track('Icon', 'Click', 'Verisign', 1, false));

    $('.popup')
        .focus(track('Icon', 'Click', 'Why do we collect this?', 1, false));

    $('#live-help img')
        .click(track('Icon', 'Click', 'Call Now', 1, false));

    $('a[href*="bbb"]')
        .click(track('Icon', 'Click', 'BBB', 1, false));

    $('a[href*="trust"]')
        .click(track('Icon', 'Click', 'BBB', 1, false));

    $('.StreetAddress, .StreeAddress')
        .focus(track('Lead Field', 'Focus', 'Street Address', 1, true));

    $('.City')
        .focus(track('Lead Field', 'Focus', 'City', 1, true));

    $('.State')
        .change(track('Lead Field', 'Selected', 'State', 1, true));

    $('.LeadZip')
        .focus(track('Lead Field', 'Focus', 'Zip Code', 1, true));

    $('.YearBuilt')
        .change(track('Lead Field', 'Selected', 'Year Built', 1, false));

    $('.FirstName')
        .focus(track('Lead Field', 'Focus', 'First Name', 1, true));

    $('.LastName')
        .focus(track('Lead Field', 'Focus', 'Last Name', 1, true));

    $('#phone1, .Phone1')
        .focus(track('Lead Field', 'Focus', 'Phone Number', 1, true));

    $('.Email')
        .focus(track('Lead Field', 'Focus', 'Email', 1, true));

    $('.SquareFootage')
        .change(track('Lead Field', 'Selected', 'Square Footage', 1, true));

    $('.NumStories')
        .change(track('Lead Field', 'Selected', 'Num Stories', 1, true));

    $('#bedrooms')
        .change(track('Lead Field', 'Selected', 'Bedrooms', 1, true));

    $('#bathrooms, .Bathrooms')
        .change(track('Lead Field', 'Selected', 'Bathrooms', 1, true));

    $('#credit-rating, .Credit')
        .change(track('Lead Form', 'Selected', 'Credit Ranking', 1, false));

    $('#HomeValue')
        .change(track('Lead Form', 'Selected', 'Home Value', 1, true));

    $('.life-insurance')
        .click(track('Lead Form', 'Entered', 'Life Insurance Interest', 1, true));

    $('#BirthMonth')
        .change(track('Lead Form', 'Selected', 'Birth Date Month', 1, true));

    $('#BirthYear')
        .change(track('Lead Form', 'Selected', 'Birth Date Year', 1, true));

    $('#BirthDay')
        .change(track('Lead Form', 'Selected', 'Birth Date Day', 1, true));

    $('#TermLength')
        .change(track('Lead Form', 'Selected', 'Term Length', 1, true));

    $('#male, #female')
        .click(track('Lead Form', 'Entered', 'Gender', 1, true));

    $('#Height')
        .focus(track('Lead Form', 'Focus', 'Height', 1, true));

    $('#Weight')
        .focus(track('Lead Form', 'Focus', 'Weight', 1, true));

    $('.smoke-yes, .smoke-no')
        .click(track('Lead Form', 'Entered', 'Smoke', 1, true));

    $('#serviceable-form .submit, .serviceable-form .submit')
        .click(track('Lead Form', 'Click', 'Lead Submit', 1, false));

    $('#dead_bolt, .dead_bolt, .check-button .dead_bolt')
        .click(track('Lead Field', 'Entered', 'Deadbolt', 1, true));

    $('#fire_extinguisher, .fire_extinguisher, .check-button .fire_extinguisher')
        .click(track('Lead Field', 'Entered', 'Fire Extinguisher', 1, true));

    $('#burglar_alarm, .burglar_alarm, .check-button .burglar_alarm')
        .click(track('Lead Field', 'Entered', 'Burglar Alarm', 1, true));

    $('#smoke_detector, .smoke_detector, .check-button .smoke_detector')
        .click(track('Lead Field', 'Entered', 'Smoke Detector', 1, true));

    $('.coverage')
        .change(track('Lead Field', 'Selected', 'Coverage Amount', 1, true));

    $('.deductible')
        .change(track('Lead Field', 'Selected', 'Deductible Amount', 1, true));

    $('.YearLivedIn')
        .change(track('Lead Field', 'Selected', 'Year Lived In', 1, true));

    $('.MonthLivedIn')
        .change(track('Lead Field', 'Selected', 'Month Lived In', 1, true));

    $('.dob-month')
        .change(track('Lead Field', 'Selected', 'DOB Month', 1, true));

    $('.dob-day')
        .change(track('Lead Field', 'Selected', 'DOB Day', 1, true));

    $('.dob-year')
        .change(track('Lead Field', 'Selected', 'DOB Year', 1, true));

    $('#current-carrier')
        .focus(track('Lead Field', 'Selected', 'Current Carrier', 1, true));
});