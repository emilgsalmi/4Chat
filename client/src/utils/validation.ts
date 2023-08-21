export const validateUsername = (username: string): boolean => {
	const [min, max] = [3, 12];
	const validChars: RegExp = /^[a-zA-Z0-9]+$/; // Only letters and numbers
	// const min: number = 3;
	// const max: number = 12;

	if (username.length < min || username.length > max) {
		return false;
	}

	if (username.includes(' ')) {
		return false;
	}

	if (!validChars.test(username)) {
		return false;
	}

	if (!isNaN(Number(username))) {
		return false;
	}

	return true;
};
