// CLIENT SIDE VALIDATION
export const validateUsername = (username: string): boolean => {
	/* 
		* Username validation rules:
		- Username must be between 3 and 12 characters long
		- Username must not contain spaces
		- Username must only contain letters and numbers
		- Username must not be a number
	 */
	const [min, max] = [3, 12]; // Username length
	const validChars: RegExp = /^[a-zA-Z0-9]+$/; // Only letters and numbers

	if (username.length < min || username.length > max) {
		// Invalid length
		return false;
	}

	if (username.includes(' ')) {
		// Contains spaces
		return false;
	}

	if (!validChars.test(username)) {
		// Contains invalid characters
		return false;
	}

	if (!isNaN(Number(username))) {
		// Is a number
		return false;
	}

	return true;
};
