const fs = require('fs')

const result = {}

const data = fs.readFileSync('suhrn_cas.csv', 'utf-8')
	.split('\n')
	.slice(1, -1)
	.map((line) => {
		const fields = line.split(',')

		const item = {
			meno: fields[3],
			klub: fields[4],
			cas: parseInt(fields[6], 10)
		}
		switch (item.klub) {
			case '(OĽANO)':
				item.klub = '(OĽaNO)'
				break
			case '(ĽSNS)':
				item.klub = '(ĽS Naše Slovensko)'
				break
			case '(MOST-HÍD)':
				item.klub = '(MOST - HÍD)'
				break
			case '':
				item.klub = '(-)'
				break
		}
		item.klub = item.klub.substring(1, item.klub.length - 1)
		if (item.klub === '-') {
			for (const [klub, names] of Object.entries(result)) {
				if (new Set(Object.keys(names)).has(item.meno)) {
					item.klub = klub
					break
				}
			}
		}
		if (item.klub !== '-') {
			// item.klub = '- nezaradení -'
			if (result[item.klub] === undefined) {
				result[item.klub] = {}
			}
			if (result[item.klub][item.meno] === undefined) {
				result[item.klub][item.meno] = 0
			}
			result[item.klub][item.meno] += item.cas

			// result[item.klub].add(item.meno)
		}

		return item
	})

console.log(data.length)
console.log(data[0])
console.log(data[data.length - 1])
console.log(result)

fs.writeFileSync('klub_poslanec_cas.json', JSON.stringify(result), 'utf-8')
