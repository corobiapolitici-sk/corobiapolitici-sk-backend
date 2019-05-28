// Load local modules.
const util = require('../util')

// Load npm modules.
const fsExtra = require('fs-extra')

// Load node modules.
const path = require('path')

// nodes_zakon
// edges_vybor_zakon_gestorsky
// edges_vybor_zakon_navrhnuty
/*
edges_spektrum_zakon_navrhol
edges_zmena_zakon_navrhnuta
edges_poslanec_zakon_navrhol
edges_hlasovanie_zakon_hlasovalo_o
*/

module.exports = async (db, vyborItems) => {
	const nodes = await db.collection('nodes_zakon').find().toArray()

	const gestorskyVyborEdges = await db.collection('edges_vybor_zakon_gestorsky').find().toArray()
	const navrhnutyVyborEdges = await db.collection('edges_vybor_zakon_navrhnuty').find().toArray()

	for (const node of nodes) {
		node._id = node._id.toString()
		try {
			node.datumDorucenia = util.dateToTimestamp(node.datumDorucenia)
		} catch (exception) {
			node.datumDorucenia = 'Neznáme'
		}
		delete node.insertTime

		node.gestorskyVyborName = ''
		for (const edge of gestorskyVyborEdges) {
			if (edge.ending_id === node.id) {
				for (const vybor of vyborItems) {
					if (edge.beginning_id === vybor.id) {
						node.gestorskyVyborName = vybor.name
						break
					}
				}
				break
			}
		}

		node.navrhnutyVyboromName = ''
		for (const edge of navrhnutyVyborEdges) {
			if (edge.ending_id === node.id) {
				for (const vybor of vyborItems) {
					if (edge.beginning_id === vybor.id) {
						node.navrhnutyVyboromName = vybor.name
						break
					}
				}
				break
			}
		}

		if (node.druh === 'nullValue') {
			node.druh = 'Iný typ'
		}
	}

	// Druhy zakonov:
	/*
		'Novela zákona',
		'Návrh nového zákona',
		'Ústavný zákon',
		'Iný typ',
		'Správa',
		'Medzinárodná zmluva',
		'Zákon vrátený prezidentom',
		'nullValue',
		'Informácia',
		'Návrh zákona o štátnom rozpočte',
		'Petícia'
	*/
	// Vysledky zakonov:
	/*
		'',
		'Výber právneho poradcu',
		'NZ postúpil do redakcie',
		'Dokument postúpil na rokovanie NR SR',
		'Zápis uznesenia NR SR',
		'NR SR nebude pokračovať v rokovaní o návrhu zákona',
		'Pripravená informácia k NZ',
		'Správa postúpila na rokovanie NR SR',
		'Zákon vyšiel v Zbierke zákonov',
		'NZ vzal navrhovateľ späť',
		'Zápis spoločnej správy výborov',
		'NZ postúpil do II. čítania',
		'NZ nebol schválený',
		'Zákon bol vrátený prezidentom',
		'Zapísané uznesenie výboru'
	*/
	// Stavy zakonov:
	/*
		'Výber poradcov k NZ',
		'Evidencia',
		'Redakcia',
		'Rokovanie NR SR',
		'I. čítanie',
		'Uzavretá úloha',
		'Stanovisko k NZ',
		'Rokovanie výboru',
		'II. čítanie',
		'Rokovanie gestorského výboru'
	*/

	await fsExtra.writeJson(path.join(__dirname, '..', 'data', 'zakon.json'), nodes.reverse().filter((node) => {
		// return true
		return node.vysledok === 'Zákon vyšiel v Zbierke zákonov'
		// return node.stav === 'Uzavretá úloha'
	}))

	return nodes
}
