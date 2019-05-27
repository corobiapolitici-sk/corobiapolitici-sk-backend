
const padStringLeft = (value, length, padding) => {
	let newValue = value
	while (newValue.length < length) {
		newValue = padding + newValue
	}
	return newValue
}

const dateToTimestamp = (value) => {
	return [
		value.getFullYear().toString(),
		padStringLeft((value.getMonth() + 1).toString(), 2, '0'),
		padStringLeft(value.getDate().toString(), 2, '0'),
	].join('')
}

module.exports = {
	padString: padStringLeft,
	dateToTimestamp,
}
