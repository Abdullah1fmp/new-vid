export const jsonToObj = (json: any) => {
	return JSON.parse(JSON.stringify(json));
};

export const generateRandomNumber = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const toFixedNumber = (num: number, decimalPlaces: number): number => {
	const factor = Math.pow(10, decimalPlaces);
	return Math.round(num * factor) / factor;
};
