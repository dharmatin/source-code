// @flow
export type Phone = {
	label: string,
	number: string
};

export type Contact = {
	phones: Array<Phone>,
	emails?: Array<string>
};
