// Load local modules.
const util = require('../util')

// Load npm modules.
const fsExtra = require('fs-extra')

// Load node modules.
const path = require('path')

/*
nodes_zakon
edges_vybor_zakon_gestorsky
edges_vybor_zakon_navrhnuty
edges_spektrum_zakon_navrhol
edges_zmena_zakon_navrhnuta
edges_poslanec_zakon_navrhol
edges_hlasovanie_zakon_hlasovalo_o
*/

module.exports = async (db) => {
	const nodes = await db.collection('nodes_zakon').find().toArray()

	for (const node of nodes) {
		node._id = node._id.toString()
		try {
			node.datumDorucenia = parseInt(util.dateToTimestamp(node.datumDorucenia), 10)
		} catch (exception) {
			node.datumDorucenia = 0
		}
		delete node.insertTime
	}

	await fsExtra.writeJson(path.join(__dirname, '..', 'data', 'zakon.json'), nodes)

	return nodes
}
