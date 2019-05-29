// Load npm modules.
const fsExtra = require('fs-extra')

// Load node modules.
const path = require('path')

module.exports = async () => {
	await fsExtra.ensureDir(path.join(__dirname, '..', 'data', 'statistics'))

	const voteClubLaw = await fsExtra.readJson(path.join(__dirname, 'statistics', 'vis_1_klub_typ_zakona_hlasovanie.json'))
	const topTimeSpeakClubLaw = await fsExtra.readJson(path.join(__dirname, 'statistics', 'vis_2_klub_zakon_rozprava.json'))
	const timeSpeakClub = await fsExtra.readJson(path.join(__dirname, 'statistics', 'vis_3_klub_poslanec_cas.json'))

	await fsExtra.writeJson(path.join(__dirname, '..', 'data', 'statistics', 'klub_typ_zakona_hlasovanie.json'), voteClubLaw)
	await fsExtra.writeJson(path.join(__dirname, '..', 'data', 'statistics', 'klub_zakon_rozprava.json'), topTimeSpeakClubLaw)
	await fsExtra.writeJson(path.join(__dirname, '..', 'data', 'statistics', 'klub_poslanec_cas.json'), timeSpeakClub)
}
