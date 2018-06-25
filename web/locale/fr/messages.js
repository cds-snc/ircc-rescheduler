module.exports = {
  l: {
    p: function(n, ord) {
      if (ord) return n == 1 ? 'one' : 'other'
      return n >= 0 && n < 2 ? 'one' : 'other'
    },
  },
  m: {
    'Remove date': 'Supprimer la date',
    'You have already selected the maximum number of dates!':
      'Vous avez d\xE9j\xE0 s\xE9lectionn\xE9 le nombre maximum de dates!',
    'Language Selection': 'S\xE9lection de la langue',
    'This is a new service we are constantly deploying.':
      "C'est un nouveau service que nous d\xE9ployons constamment.",
    'Request a new Canadian Citizenship appointment':
      'Demander un nouveau rendez-vous pour la citoyennet\xE9 canadienne',
    'No dates selected': 'Aucune date s\xE9lectionn\xE9e',
    Change: 'Changement',
    'Full name': 'Nom complet',
    Email: 'Email',
    'Paper file number': 'Num\xE9ro de fichier papier',
    Reason: 'Raison',
    Explanation: 'Explication',
    Availability: 'Disponibilit\xE9',
    Travel: 'Voyage',
    January: 'janvier',
    February: 'f\xE9vrier',
    March: 'mars',
    April: 'avril',
    Calendar: 'Calendrier',
    'Sorry, there was a problem with the information you submitted.':
      'D\xE9sol\xE9, il y a eu un probl\xE8me avec les informations que vous avez envoy\xE9es.',
    'Go Back': 'Retourner',
    'Citizenship appointments are scheduled on <0>Tuesdays</0> and <1>Fridays</1>.':
      'Les nominations \xE0 la citoyennet\xE9 sont pr\xE9vues les mardis et vendredi.',
    '<0>Select 3 days</0> you\u2019re available between July and September:':
      'S\xE9lectionnez 3 jours vous \xEAtes disponible entre juillet et septembre:',
    'Make sure you stay available on all of the days you select.':
      'Assurez-vous de rester disponible tous les jours que vous s\xE9lectionnez.',
    'Review request': 'Demande de r\xE9vision',
    'Cancel request': "Demande d'annulation",
    'Thank you! Your request has been received.':
      'Je vous remercie! Votre demande a \xE9t\xE9 re\xE7ue.',
    'What happens next?': "Qu'est-ce qui se passe ensuite?",
    'By July 6, 2018, your local <0>IRCC</0> office will send you a new appointment, or email you to ask for more information.':
      "D'ici le 6 juillet 2018, votre bureau local IRCC vous enverra un nouveau rendez-vous ou vous enverra un courriel pour demander plus de renseignements.",
    'If you have any questions, please contact:':
      'Si vous avez des questions, veuillez contacter:',
    'Were you satisfied with this service?':
      'Etiez-vous satisfait de ce service?',
    'Your feedback helps us improve.':
      'Vos commentaires nous aident \xE0 nous am\xE9liorer.',
    "We're sorry, something went wrong.":
      "Nous sommes d\xE9sol\xE9s, Quelque chose n'a pas fonctionn\xE9.",
    'Our team has been notified, but click <0>here</0> to fill out an error report.':
      "Notre \xE9quipe a \xE9t\xE9 notifi\xE9e, mais cliquez ici pour remplir un rapport d'erreur.",
    'Report a bug': 'Signaler un bug',
    'Please contact <0>IRCC</0> directly to reschedule your appointment':
      'Veuillez contacter IRCC directement pour reporter votre rendez-vous',
    Home: 'Accueil',
    'Page not found': 'Page non trouv\xE9e',
    'Sorry, the page you are looking for doesn\u2019t exist.':
      "D\xE9sol\xE9, la page que vous recherchez n'existe pas.",
    'Return to the home page to reschedule your appointment.':
      "Retournez \xE0 la page d'accueil pour reporter votre rendez-vous.",
    "Tell IRCC you can't attend your Citizenship appointment, and request a new one.":
      'Dites \xE0 IRCC que vous ne pouvez pas assister \xE0 votre rendez-vous de citoyennet\xE9 et en demander un nouveau.',
    'You will need:': 'Tu auras besoin de:',
    'Your <0>paper file number</0>': 'Votre num\xE9ro de fichier papier',
    'To describe your reason for rescheduling':
      'Pour d\xE9crire la raison de votre r\xE9\xE9chelonnement',
    'Then you\u2019ll select <0>3 days</0> when you\u2019re available for an appointment in the future.':
      'Ensuite, vous s\xE9lectionnez 3 jours lorsque vous \xEAtes disponible pour un rendez-vous dans le futur.',
    'Requesting a new appointment will cancel your current one.<0> Do not attend your old appointment</0> after you complete this request. It can take up to 9 weeks for us to reschedule you.':
      "Demander un nouveau rendez-vous annulera votre rendez-vous actuel. N'assistez pas \xE0 votre ancien rendez-vous apr\xE8s avoir r\xE9pondu \xE0 cette demande. Cela peut prendre jusqu'\xE0 neuf semaines pour que nous vous r\xE9\xE9chelonnions.",
    'Start Now': 'Commencez maintenant',
    'Email address': 'Adresse e-mail',
    'Why are you rescheduling?':
      'Pourquoi faites-vous un r\xE9\xE9chelonnement?',
    'Describe why you can\u2019t attend your test':
      'D\xE9crivez pourquoi vous ne pouvez pas assister \xE0 votre test',
    'You need to tell us your name so we know who is requesting a new appointment.':
      'Vous devez nous indiquer votre nom afin que nous sachions qui demande un nouveau rendez-vous.',
    'You need to provide an email address so we can send you a confirmation message.':
      'Vous devez fournir une adresse e-mail afin que nous puissions vous envoyer un message de confirmation.',
    'You need to tell us your paper file number so we can confirm your identity.':
      'Vous devez nous indiquer votre num\xE9ro de dossier papier afin que nous puissions confirmer votre identit\xE9.',
    'Please tell us why you need to reschedule your test. If none of the options fit your situation, choose \u2018Other\u2019.':
      'Veuillez nous indiquer pourquoi vous devez reporter votre test. Si aucune des options ne correspond \xE0 votre situation, choisissez "Autre".',
    'Please tell us a bit more about why you need to reschedule your test.':
      'Veuillez nous en dire un peu plus sur les raisons pour lesquelles vous devez reporter votre test.',
    'Some information is missing.': 'Certaines informations sont manquantes.',
    'This is the full name you used on your citizenship application.':
      "C'est le nom complet que vous avez utilis\xE9 pour votre demande de citoyennet\xE9.",
    'We will send a confirmation message to this email address.':
      'Nous enverrons un message de confirmation \xE0 cette adresse email.',
    'This number is at the top of the email we sent you.':
      "Ce num\xE9ro figure en haut de l'e-mail que nous vous avons envoy\xE9.",
    Medical: 'M\xE9dical',
    'Work or School': 'Travail ou \xE9cole',
    Family: 'Famille',
    Other: 'Autre',
    'Describe why you cannot attend your test':
      'D\xE9crivez pourquoi vous ne pouvez pas assister \xE0 votre test',
    'Provide enough detail so that staff can understand your situation.':
      'Fournissez suffisamment de d\xE9tails pour que le personnel puisse comprendre votre situation.',
    Continue: 'Continuer',
    'Review your request': 'Passez en revue votre demande',
    'Sending this request will cancel your current appointment.<0> Do not attend your old appointment</0> after you send this request.':
      "Si vous envoyez cette demande, votre rendez-vous actuel sera annul\xE9. N'assistez pas \xE0 votre ancien rendez-vous apr\xE8s avoir envoy\xE9 cette demande.",
    'Send Request': 'Envoyer une demande',
    'This is a new service we are constantly improving.':
      "C'est un nouveau service que nous am\xE9liorons constamment.",
    'Citizenship Tests are scheduled on <0>Tuesdays</0> and <1>Fridays</1>.':
      'Les tests de citoyennet\xE9 sont programm\xE9s les mardi et vendredi.',
    '<0>Select three (3) days you are available</0> between July and September':
      'S\xE9lectionnez trois (3) jours de disponibilit\xE9 entre juillet et septembre',
    Review: 'La revue',
    Cancel: 'Annuler',
    'Within six (6) weeks, your local <0>IRCC</0> office will send you a new appointment, or email you to ask for more information.':
      "Dans un d\xE9lai de six (6) semaines, votre bureau local IRCC vous enverra un nouveau rendez-vous ou vous enverra un email pour demander plus d'informations.",
    'Use this service to notify Immigration, Refugees and Citizenship Canada that you cannot attend your Citizenship test, and you need a new appointment.':
      "Utilisez ce service pour aviser Immigration, R\xE9fugi\xE9s et Citoyennet\xE9 Canada que vous ne pouvez pas participer \xE0 votre test de citoyennet\xE9 et que vous avez besoin d'un nouveau rendez-vous.",
    'This is found at the top of your test notice email.':
      'Cela se trouve en haut de votre e-mail de notification de test.',
    'Your full name': 'Ton nom complet',
    'This should match the name on your application.':
      'Cela devrait correspondre au nom de votre application.',
    'For more information on rescheduling, <0>read the guidelines</0>.':
      "Pour plus d'informations sur le r\xE9-ordonnancement, lisez les instructions.",
    'After that, you will select <0>three (3) days</0> when you\u2019re available for an appointment in the future.':
      'Apr\xE8s cela, vous s\xE9lectionnez trois (3) jours lorsque vous \xEAtes disponible pour un rendez-vous dans le futur.',
    'By sending this request to reschedule, you will be <0>cancelling your current appointment</0>. After you complete this process, it could take up to six (6) weeks for IRCC to schedule your new appointment.':
      "En envoyant cette demande pour replanifier, vous annulez votre rendez-vous actuel. Une fois ce processus termin\xE9, il pourrait falloir jusqu'\xE0 six (6) semaines \xE0 IRCC pour planifier votre nouveau rendez-vous.",
    'Full Name': 'Nom complet',
    'Paper File Number': 'Num\xE9ro de fichier papier',
    'Reason for rescheduling': 'Raison du r\xE9\xE9chelonnement',
    'If you\u2019re not sure if you can reschedule,':
      "Si vous n'\xEAtes pas s\xFBr de pouvoir reporter,",
    'read the guidelines for rescheduling':
      'lire les lignes directrices pour le r\xE9\xE9chelonnement',
    'Review your request before sending it':
      "Passez en revue votre demande avant de l'envoyer",
    'By sending this request, you are <0>cancelling your current appointment.</0>':
      'En envoyant cette demande, vous annulez votre rendez-vous actuel.',
    May: 'mai',
    June: 'juin',
    July: 'juillet',
    August: 'ao\xFBt',
    September: 'septembre',
    October: 'octobre',
    November: 'novembre',
    December: 'd\xE9cembre',
    Saturday: 'samedi',
    Monday: 'lundi',
    Tuesday: 'mardi',
    Wednesday: 'mercredi',
    Thursday: 'jeudi',
    Friday: 'vendredi',
    Sunday: 'Dimanche',
    Sat: 'sam',
    Mo: 'lu',
    Tu: 'ma',
    We: 'me',
    Thu: 'jeu',
    Fri: 'ven',
    Su: 'di',
  },
}
