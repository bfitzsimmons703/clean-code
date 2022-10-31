export enum Day {
	Monday,
	Tuesday,
}

const stringToDay = (dayName: string): Day => {
	switch (dayName.toLowerCase()) {
		case 'monday':
			return Day.Monday;
		case 'tuesday':
			return Day.Tuesday;
		default:
			throw new Error('Unknown string day name');
	}
};
