# Butternut utils

Butternut utils is a library of utility functions for Web and Mobile apps.

## Consuming

A full breakdown of functiosn can be found here.

You will need to have a GitHub token in an `.npmrc` file in the root of your project or have it exported in you bash or zsh profile.

`yarn install @butternut-utils`

```ts
import { toLocalisedSentence } from '@butternut-utils';
// or
import toLocalisedSentence from '@butternut-utils/string/localisedSentance';

import { toLocalisedSentenceParams } from '@butternut-utils/types/language';

const params: toLocalisedSentenceParams = {
	arr: ['Hello', 'World'],
	lng: 'en',
};

const sentence = toLocalisedSentence(params);
```

## Adding utils

1. Create or update a file in the `src` folder.
2. Add the file to the `index.ts` file in the same folder.
3. Add the file to the `rollup.config.js` file in the root of the project.

Do the above for each type definition file.

Finally, if you have created a new directory, add an export object to the package.json file in the root of the project.

### Building locally

`yarn build`

### Testing locally

`yarn test`

## Publishing

This is handled by `semantic-release`, GitHub actions and git messaging.

[Follow the messaging conventions on how version numbers are created](https://github.com/semantic-release/semantic-release?tab=readme-ov-file#commit-message-format)

No manual steps are required.
