// Load local modules.
const vyborScript = require('./script/vybor')
const zakonScript = require('./script/zakon')

// Load npm modules.
const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017'

;(async () => {
	const client = await MongoClient.connect(url, { useNewUrlParser: true })

	try {
		const db = client.db('corobiapolitici')

		const vyborItems = await vyborScript(db)
		await zakonScript(db, vyborItems)
	} catch (exception) {
		throw exception
	} finally {
		await client.close()
	}
})()

// edges_hlasovanie_zakon_hlasovalo_o
// edges_hlasovanie_zmena_hlasovalo_o
// edges_klub_spektrum_clen
// edges_poslanec_delegacia_clen
// edges_poslanec_hlasovanie_hlasoval
// edges_poslanec_klub_bol_clenom
// edges_poslanec_klub_clen
// edges_poslanec_rozprava_vystupil
// // edges_poslanec_vybor_clen
// // edges_poslanec_zakon_navrhol
// edges_poslanec_zmena_navrhol
// edges_poslanec_zmena_podpisal
// edges_rozprava_zakon_tykala_sa
// // edges_spektrum_zakon_navrhol
// // edges_zmena_zakon_navrhnuta
// nodes_delegacia
// nodes_hlasovanie
// nodes_klub
// nodes_poslanec
// nodes_rozprava
// nodes_spektrum
// nodes_zmena
