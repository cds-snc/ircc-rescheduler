# Feature flags 🏁

If you're adding or modifying a feature, it's possible to hide it behind a feature flag.

The `FeatureFlag` component accepts `on` (a matching flag was found) and `off` (no match) properties.

Flags are setup via an environment variable (`RAZZLE_FLAGS`) which is a stringified JSON array of flags.
```
RAZZLE_FLAGS=[{"name":"nextButton","isActive":true},{"name":"noDatesCheckbox", "isActive": true}]
```

**Example:**

Given `hasNewFeature` is set in our `.env` file, the following would output `<SomeNewFeature />`

```javascript
import { FeatureFlag } from '../components/FeatureFlag'

<MyComponent               
  submit={() => {
    return (
      <FeatureFlag
        flags={['hasNewFeature']}
        on={() => (
          <SomeNewFeature />
        )}
        off={() => (
          return null
        )}
      />
    )
  }}
/>
```
