
const padStringLeft = (value, length, padding) => {
	let newValue = value
	while (newValue.length < length) {
		newValue = padding + newValue
	}
	return newValue
}

const dateToTimestamp = (value) => {
	return [
		padStringLeft(value.getDate().toString(), 2, '0'),
		padStringLeft((value.getMonth() + 1).toString(), 2, '0'),
		value.getFullYear().toString(),
	].join('.')
}

module.exports = {
	padString: padStringLeft,
	dateToTimestamp,
}
