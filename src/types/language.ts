export type Language = 'nl' | 'en' | 'nl_BE' | 'fr' | 'de_DE' | 'pl' | 'pl_PL';

export type toLocalisedSentenceParams = {
	arr: string[];
	lng: Language;
	oxfordComma?: boolean;
};
