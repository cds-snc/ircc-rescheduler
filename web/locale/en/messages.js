module.exports = {
  l: {
    p: function(n, ord) {
      var s = String(n).split('.'),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2)
      if (ord)
        return n10 == 1 && n100 != 11
          ? 'one'
          : n10 == 2 && n100 != 12
            ? 'two'
            : n10 == 3 && n100 != 13
              ? 'few'
              : 'other'
      return n == 1 && v0 ? 'one' : 'other'
    },
  },
  m: {
    'Remove date': 'Remove date',
    'You have already selected the maximum number of dates!':
      'You have already selected the maximum number of dates!',
    'Language Selection': 'Language Selection',
    'This is a new service we are constantly deploying.':
      'This is a new service we are constantly deploying.',
    'Request a new Canadian Citizenship appointment':
      'Request a new Canadian Citizenship appointment',
    'No dates selected': 'No dates selected',
    Change: 'Change',
    'Full name': 'Full name',
    Email: 'Email',
    'Paper file number': 'Paper file number',
    Reason: 'Reason',
    Explanation: 'Explanation',
    Availability: 'Availability',
    Travel: 'Travel',
    January: 'January',
    February: 'February',
    March: 'March',
    April: 'April',
    Calendar: 'Calendar',
    'Sorry, there was a problem with the information you submitted.':
      'Sorry, there was a problem with the information you submitted.',
    'Go Back': 'Go Back',
    'Citizenship appointments are scheduled on <0>Tuesdays</0> and <1>Fridays</1>.':
      'Citizenship appointments are scheduled on <0>Tuesdays</0> and <1>Fridays</1>.',
    '<0>Select 3 days</0> you\u2019re available between July and September:':
      '<0>Select 3 days</0> you\u2019re available between July and September:',
    'Make sure you stay available on all of the days you select.':
      'Make sure you stay available on all of the days you select.',
    'Review request': 'Review request',
    'Cancel request': 'Cancel request',
    'Thank you! Your request has been received.':
      'Thank you! Your request has been received.',
    'What happens next?': 'What happens next?',
    'By July 6, 2018, your local <0>IRCC</0> office will send you a new appointment, or email you to ask for more information.':
      'By July 6, 2018, your local <0>IRCC</0> office will send you a new appointment, or email you to ask for more information.',
    'If you have any questions, please contact:':
      'If you have any questions, please contact:',
    'Were you satisfied with this service?':
      'Were you satisfied with this service?',
    'Your feedback helps us improve.': 'Your feedback helps us improve.',
    "We're sorry, something went wrong.": "We're sorry, something went wrong.",
    'Our team has been notified, but click <0>here</0> to fill out an error report.':
      'Our team has been notified, but click <0>here</0> to fill out an error report.',
    'Report a bug': 'Report a bug',
    'Please contact <0>IRCC</0> directly to reschedule your appointment':
      'Please contact <0>IRCC</0> directly to reschedule your appointment',
    Home: 'Home',
    'Page not found': 'Page not found',
    'Sorry, the page you are looking for doesn\u2019t exist.':
      'Sorry, the page you are looking for doesn\u2019t exist.',
    'Return to the home page to reschedule your appointment.':
      'Return to the home page to reschedule your appointment.',
    "Tell IRCC you can't attend your Citizenship appointment, and request a new one.":
      "Tell IRCC you can't attend your Citizenship appointment, and request a new one.",
    'You will need:': 'You will need:',
    'Your <0>paper file number</0>': 'Your <0>paper file number</0>',
    'To describe your reason for rescheduling':
      'To describe your reason for rescheduling',
    'Then you\u2019ll select <0>3 days</0> when you\u2019re available for an appointment in the future.':
      'Then you\u2019ll select <0>3 days</0> when you\u2019re available for an appointment in the future.',
    'Requesting a new appointment will cancel your current one.<0> Do not attend your old appointment</0> after you complete this request. It can take up to 9 weeks for us to reschedule you.':
      'Requesting a new appointment will cancel your current one.<0> Do not attend your old appointment</0> after you complete this request. It can take up to 9 weeks for us to reschedule you.',
    'Start Now': 'Start Now',
    'Email address': 'Email address',
    'Why are you rescheduling?': 'Why are you rescheduling?',
    'Describe why you can\u2019t attend your test':
      'Describe why you can\u2019t attend your test',
    'You need to tell us your name so we know who is requesting a new appointment.':
      'You need to tell us your name so we know who is requesting a new appointment.',
    'You need to provide an email address so we can send you a confirmation message.':
      'You need to provide an email address so we can send you a confirmation message.',
    'You need to tell us your paper file number so we can confirm your identity.':
      'You need to tell us your paper file number so we can confirm your identity.',
    'Please tell us why you need to reschedule your test. If none of the options fit your situation, choose \u2018Other\u2019.':
      'Please tell us why you need to reschedule your test. If none of the options fit your situation, choose \u2018Other\u2019.',
    'Please tell us a bit more about why you need to reschedule your test.':
      'Please tell us a bit more about why you need to reschedule your test.',
    'Some information is missing.': 'Some information is missing.',
    'This is the full name you used on your citizenship application.':
      'This is the full name you used on your citizenship application.',
    'We will send a confirmation message to this email address.':
      'We will send a confirmation message to this email address.',
    'This number is at the top of the email we sent you.':
      'This number is at the top of the email we sent you.',
    Medical: 'Medical',
    'Work or School': 'Work or School',
    Family: 'Family',
    Other: 'Other',
    'Describe why you cannot attend your test':
      'Describe why you cannot attend your test',
    'Provide enough detail so that staff can understand your situation.':
      'Provide enough detail so that staff can understand your situation.',
    Continue: 'Continue',
    'Review your request': 'Review your request',
    'Sending this request will cancel your current appointment.<0> Do not attend your old appointment</0> after you send this request.':
      'Sending this request will cancel your current appointment.<0> Do not attend your old appointment</0> after you send this request.',
    'Send Request': 'Send Request',
    'This is a new service we are constantly improving.':
      'This is a new service we are constantly improving.',
    'Citizenship Tests are scheduled on <0>Tuesdays</0> and <1>Fridays</1>.':
      'Citizenship Tests are scheduled on <0>Tuesdays</0> and <1>Fridays</1>.',
    '<0>Select three (3) days you are available</0> between July and September':
      '<0>Select three (3) days you are available</0> between July and September',
    Review: 'Review',
    Cancel: 'Cancel',
    'Within six (6) weeks, your local <0>IRCC</0> office will send you a new appointment, or email you to ask for more information.':
      'Within six (6) weeks, your local <0>IRCC</0> office will send you a new appointment, or email you to ask for more information.',
    'Use this service to notify Immigration, Refugees and Citizenship Canada that you cannot attend your Citizenship test, and you need a new appointment.':
      'Use this service to notify Immigration, Refugees and Citizenship Canada that you cannot attend your Citizenship test, and you need a new appointment.',
    'This is found at the top of your test notice email.':
      'This is found at the top of your test notice email.',
    'Your full name': 'Your full name',
    'This should match the name on your application.':
      'This should match the name on your application.',
    'For more information on rescheduling, <0>read the guidelines</0>.':
      'For more information on rescheduling, <0>read the guidelines</0>.',
    'After that, you will select <0>three (3) days</0> when you\u2019re available for an appointment in the future.':
      'After that, you will select <0>three (3) days</0> when you\u2019re available for an appointment in the future.',
    'By sending this request to reschedule, you will be <0>cancelling your current appointment</0>. After you complete this process, it could take up to six (6) weeks for IRCC to schedule your new appointment.':
      'By sending this request to reschedule, you will be <0>cancelling your current appointment</0>. After you complete this process, it could take up to six (6) weeks for IRCC to schedule your new appointment.',
    'Full Name': 'Full Name',
    'Paper File Number': 'Paper File Number',
    'Reason for rescheduling': 'Reason for rescheduling',
    'If you\u2019re not sure if you can reschedule,':
      'If you\u2019re not sure if you can reschedule,',
    'read the guidelines for rescheduling':
      'read the guidelines for rescheduling',
    'Review your request before sending it':
      'Review your request before sending it',
    'By sending this request, you are <0>cancelling your current appointment.</0>':
      'By sending this request, you are <0>cancelling your current appointment.</0>',
    May: 'May',
    June: 'June',
    July: 'July',
    August: 'August',
    September: 'September',
    October: 'October',
    November: 'November',
    December: 'December',
    Saturday: 'Saturday',
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Sunday: 'Sunday',
    Sat: 'Sat',
    Mo: 'Mo',
    Tu: 'Tu',
    We: 'We',
    Thu: 'Thu',
    Fri: 'Fri',
    Su: 'Su',
    Sa: 'Sa',
  },
}
