### Updating Package Dependencies

![upgrade-interactive screenshot](upgrade-packages.png)

## The upgrade process

1. Run

```bash
yarn upgrade-interactive --latest
```

> Follow the on-screen instuctions for selecting packages.

2. Select and apply all the Patch updates (**green**)

3. Run the tests

```bash
yarn test
yarn ci:dev
```

4. If the test all pass proceed to update Minor updates (**yellow**) -> Run tests -> Major updates (**red**) -> Run tests

5. Submit a Pull Request with the updates

Note: Ensure the --latest flag is passed or the updates will not be saved to the package.json file