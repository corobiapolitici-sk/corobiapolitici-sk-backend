/* eslint-disable no-console */

const path = require('path')
const fsExtra = require('fs-extra')

const zakony = fsExtra.readJsonSync(path.join(__dirname, '..', 'data', 'zakon.json'))

const druhSet = new Set()
const vysledokSet = new Set()
const stavSet = new Set()
const navrhnutyVyboromNameSet = new Set()

for (const zakon of zakony) {
	druhSet.add(zakon.druh)
	vysledokSet.add(zakon.vysledok)
	stavSet.add(zakon.stav)
	navrhnutyVyboromNameSet.add(zakon.navrhnutyVyboromName)
}

console.log('druhy:', [...druhSet])
console.log('vysledky', [...vysledokSet])
console.log('stavy', [...stavSet])
console.log('navrholVybor', [...navrhnutyVyboromNameSet])
