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
