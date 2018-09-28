# Translations 🇨🇦

Translations are managed by [jsLingui](https://lingui.js.org/tutorials/react.html).
At the time of writing, we are using the latest released Lingui version so the documentation provided by lingui is the best source for further information.

```javascript
import { Trans } from '@lingui/react'

const SomeComponent = () => {
    return <Trans>Your text</Trans>
}

```

To update the locale files use:

- `yarn extract` (creates new `messages.json` files)
- make changes to `locale/fr/messages.json`

```json
"Your text": {
    "translation": "Votre texte",
    "origin": [
      [
        "src/components/SomeComponent.js",
        22
      ]
    ]
  },
```

- `yarn compile`

*Note: CircleCI runs `yarn compile --strict` on all open pull requests, which will fail the build if any translations are missing*
