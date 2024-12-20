import { Language, toLocalisedSentenceParams } from 'src/types/language';

const lngStringToLngType = (lng: string): Language => {
	const languages: { [key: string]: Language } = {
		en: 'en',
		nl: 'nl',
		'nl-BE': 'nl_BE',
		nl_BE: 'nl_BE',
		pl: 'pl',
		'pl-PL': 'pl_PL',
		pl_PL: 'pl_PL',
		fr: 'fr',
		'de-DE': 'de_DE',
		de_DE: 'de_DE',
	};

	if (languages[lng as keyof typeof languages]) return languages[lng as keyof typeof languages];

	throw new Error(`Cannot run lngStringToLngType for ${lng}`);
};

const toLocalisedSentence = (params: toLocalisedSentenceParams): string => {
	const { arr, lng } = params;

	const oxfordComma = params.oxfordComma === undefined ? false : params.oxfordComma;

	const language = lng ? lngStringToLngType(lng) : 'en';

	if (arr.length === 0) {
		throw new Error('Invalid array to toSentence - empty');
	}

	if (arr.length === 1) {
		return arr[0];
	} else if (arr.length === 2) {
		switch (language) {
			case 'en':
				return arr.join(' and ');
			case 'nl':
			case 'nl_BE':
				return arr.join(' en ');
			case 'pl':
			case 'pl_PL':
				return arr.join(' i ');
			case 'fr':
				return arr.join(' et ');
			case 'de_DE':
				return arr.join(' und ');
			default: {
				throw new Error(`language ${language} is not supported.`);
			}
		}
	} else {
		const lastName = arr[arr.length - 1];
		const allButLastName = arr.slice(0, -1);
		switch (language) {
			case 'en':
				return `${allButLastName.join(', ')}${oxfordComma ? ',' : ''} and ${lastName}`;
			case 'nl':
			case 'nl_BE':
				return `${allButLastName.join(', ')}${oxfordComma ? ',' : ''} en ${lastName}`;
			case 'pl':
			case 'pl_PL':
				return `${allButLastName.join(', ')}${oxfordComma ? ',' : ''} i ${lastName}`;
			case 'fr':
				return `${allButLastName.join(', ')}${oxfordComma ? ',' : ''} et ${lastName}`;
			case 'de_DE':
				return `${allButLastName.join(', ')}${oxfordComma ? ',' : ''} und ${lastName}`;
			default: {
				throw new Error(`language ${language} is not supported.`);
			}
		}
	}
};

export { toLocalisedSentence };
