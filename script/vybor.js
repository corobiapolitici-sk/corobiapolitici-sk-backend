// Load npm modules.
const fsExtra = require('fs-extra')

// Load node modules.
const path = require('path')

const dataMapFilePath = path.join(__dirname, 'vybor.json')
const imageDirectoryPath = path.join(__dirname, '..', 'image', 'vybor')

/*
nodes_vybor
edges_vybor_zakon_gestorsky
edges_vybor_zakon_navrhnuty
edges_poslanec_vybor_clen
*/

module.exports = async (db) => {
	const nodes = await db.collection('nodes_vybor').find().toArray()

	const dataMap = new Map([...Object.entries(await fsExtra.readJson(dataMapFilePath))])

	for (const node of nodes) {
		node._id = node._id.toString()
		node.name = node.id
		node.imageUrl = '/preprocessed/image/vybor/default.png'
		delete node.insertTime
		node.tag = ''

		if (dataMap.has(node.id)) {
			const {
				name,
				tag,
			} = dataMap.get(node.id)

			node.name = name
			node.tag = tag

			if (await fsExtra.exists(path.join(imageDirectoryPath, `${tag}.png`))) {
				node.imageUrl = `/preprocessed/image/vybor/${tag}.png`
			}
		}
	}

	await fsExtra.writeJson(path.join(__dirname, '..', 'data', 'vybor.json'), nodes)

	return nodes
}
