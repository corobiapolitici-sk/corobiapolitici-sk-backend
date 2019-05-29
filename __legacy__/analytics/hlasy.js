const fs = require('fs')

const data = JSON.parse(fs.readFileSync('hlasy.json', 'utf-8'))

const result = {}

for (const [klub, obj] of Object.entries(data.opozicia)) {
	result[klub] = { 'opozícia': obj }
}
for (const [klub, obj] of Object.entries(data.koalicia)) {
	result[klub]['koalícia'] = obj
}

fs.writeFileSync('klub_typ_zakona_hlasovanie.json', JSON.stringify(result), 'utf-8')
