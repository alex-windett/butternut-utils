import { toLocalisedSentence } from '../../src/string/localisedSentance';
import { Language } from '../../src/types/language';

describe('toLocalisedSentence', () => {
	// Single item tests
	test('returns single item for any language', () => {
		const languages: Language[] = ['en', 'nl', 'nl_BE', 'fr', 'de_DE', 'pl', 'pl_PL'];

		languages.forEach((lng) => {
			expect(toLocalisedSentence({ arr: ['One'], lng })).toBe('One');
		});
	});

	// Two items tests
	test('joins two items with correct conjunction for each language', () => {
		const testCases = [
			{ lng: 'en', expected: 'One and Two' },
			{ lng: 'nl', expected: 'One en Two' },
			{ lng: 'nl_BE', expected: 'One en Two' },
			{ lng: 'pl', expected: 'One i Two' },
			{ lng: 'pl_PL', expected: 'One i Two' },
			{ lng: 'fr', expected: 'One et Two' },
			{ lng: 'de_DE', expected: 'One und Two' },
		];

		testCases.forEach(({ lng, expected }) => {
			expect(toLocalisedSentence({ arr: ['One', 'Two'], lng: lng as Language })).toBe(expected);
		});
	});

	// Multiple items tests
	test('joins multiple items correctly for each language', () => {
		const testCases = [
			{ lng: 'en', expected: 'One, Two and Three' },
			{ lng: 'nl', expected: 'One, Two en Three' },
			{ lng: 'nl_BE', expected: 'One, Two en Three' },
			{ lng: 'pl', expected: 'One, Two i Three' },
			{ lng: 'pl_PL', expected: 'One, Two i Three' },
			{ lng: 'fr', expected: 'One, Two et Three' },
			{ lng: 'de_DE', expected: 'One, Two und Three' },
		];

		testCases.forEach(({ lng, expected }) => {
			expect(
				toLocalisedSentence({
					arr: ['One', 'Two', 'Three'],
					lng: lng as Language,
				})
			).toBe(expected);
		});
	});

	// Oxford comma tests
	test('handles oxford comma correctly', () => {
		expect(
			toLocalisedSentence({
				arr: ['One', 'Two', 'Three'],
				lng: 'en',
				oxfordComma: true,
			})
		).toBe('One, Two, and Three');

		expect(
			toLocalisedSentence({
				arr: ['One', 'Two', 'Three'],
				lng: 'en',
				oxfordComma: false,
			})
		).toBe('One, Two and Three');
	});

	// Error cases
	test('throws error for empty array', () => {
		expect(() => toLocalisedSentence({ arr: [], lng: 'en' })).toThrow(
			'Invalid array to toSentence - empty'
		);
	});

	test('throws error for unsupported language string', () => {
		expect(() =>
			toLocalisedSentence({
				arr: ['One', 'Two'],
				lng: 'xx' as Language,
			})
		).toThrow('Cannot run lngStringToLngType for xx');
	});
});

// Testing the internal lngStringToLngType function
// Note: Since it's not exported, we're testing it indirectly through toLocalisedSentence
describe('language string conversion (through toLocalisedSentence)', () => {
	test('handles various language string formats', () => {
		const testCases = [
			{ input: 'nl-BE', expected: 'One en Two' },
			{ input: 'nl_BE', expected: 'One en Two' },
			{ input: 'pl-PL', expected: 'One i Two' },
			{ input: 'pl_PL', expected: 'One i Two' },
			{ input: 'de-DE', expected: 'One und Two' },
			{ input: 'de_DE', expected: 'One und Two' },
		];

		testCases.forEach(({ input, expected }) => {
			expect(
				toLocalisedSentence({
					arr: ['One', 'Two'],
					lng: input as any,
				})
			).toBe(expected);
		});
	});
});
