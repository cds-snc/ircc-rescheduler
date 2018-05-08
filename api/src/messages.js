module.exports.default = {
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        types: {
          mailerResponse: {
            description: `A response from IRCC.`,
          },
          rescheduleForm: {
            description: `An input representing the details needed to reschedule a language test.`,
            fields: {
              fullName: 'The full name used on the citizenship application',
              explanation:
                "an explanation for why the proposed date doesn't work",
              reasons: "a short reason for why the proposed date doesn't work",
              paperFileNumber: 'The number at the top of the invitation email',
            },
          },
        },
        mutation: {
          fields: {
            decline: {
              description: `Notify Immigration, Refugees and Citizenship Canada that the person with the given UCI can't make the proposed ceremony date.`,
              args: {
                uci: `The users account number with Immigration, Refugees and Citizenship Canada.`,
                reason: `The reason the proposed date isn't workable for the user.`,
              },
            },
          },
        },
      },
    },
    fr: {
      translation: {
        types: {
          mailerResponse: {
            description: `A response from Immigration, Réfugiés et Citoyenneté Canada.`,
          },
          rescheduleForm: {
            description: `Une entrée représentant les détails nécessaires pour reprogrammer un test linguistique.`,
            fields: {
              fullName: 'Le nom complet utilisé sur la demande de citoyenneté',
              explanation:
                "Une explication des raisons pour lesquelles la date proposée ne marche pas",
              reasons: "une courte raison pour laquelle la date proposée ne marche pas.",
              paperFileNumber: "Le numéro en haut de l'email d'invitation",
            },
          },
        },
        mutation: {
          fields: {
            decline: {
              description: `Avertir Immigration, Réfugiés et Citoyenneté Canada que la personne avec l'UCI donnée ne peut pas faire la date de cérémonie proposée.`,
              args: {
                uci: `Le numéro de compte de l'utilisateur auprès d'Immigration, Réfugiés et Citoyenneté Canada.`,
                reason: `La raison pour laquelle la date proposée n'est pas réalisable pour l'utilisateur.`,
              },
            },
          },
        },
      },
    },
  },
}
