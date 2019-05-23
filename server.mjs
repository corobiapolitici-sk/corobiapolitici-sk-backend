// Load npm modules.
const { ApolloServer } = require('apollo-server')
const { v1 : neo4j } = require('neo4j-driver')
const { makeAugmentedSchema } = require('neo4j-graphql-js')

const typeDefs = `
type Poslanec {
  id: Int!
  titul: String
  priezvisko: String!
  email: String
  bydlisko: String
  fotografia: String!
  kandidovalZa: String!
  kraj: String
  url: String!
  meno: String!
  klub: Klub @relation(name:"Clen", direction:OUT)
  navrhnuteZmeny: [Zmena] @relation(name:"Navrhol", direction:OUT)
  navrhnuteZakony: [Zakon] @relation(name:"Navrhol", direction:OUT)
  vybor: Vybor @relation(name:"Clen", direction:OUT)
  vystupil: [Rozprava] @relation(name:"Vystupil", direction:OUT)
  hlasovania: [Hlasovanie] @relation(name:"Hlasoval", direction:OUT)
  delegacie: [Delegacia] @relation(name:"Clen", direction:OUT)
}

type Klub {
  id: ID
  pocetPoslancov: Int
  poslanci: [Poslanec] @relation(name:"Clen", direction:IN)
  byvaliPoslanci: [Poslanec] @relation(name:"BolClenom", direction:IN)
  spektrum: [Spektrum] @relation(name:"Clen", direction:OUT)
}

type Zmena {
  id: ID
  dokument: String
  datumPodania: DateTime
  nazov: String
  url: String
  cisloObdobia: Int
  cisloSchodze: Int
  zakon: Zakon @relation(name:"Navrhnuta", direction:OUT)
  navrhliPoslanci: [Poslanec] @relation(name:"Navrhol", direction:IN)
  hlasovania: [Hlasovanie] @relation(name:"HlasovaloO", direction:OUT)
}

type Hlasovanie {
  id: ID
  idZakZbor: Int
  nazovHlasovania: String
  suhrnHlasujucich: Int
  suhrnNehlasovalo: Int
  suhrnNepritomni: Int
  suhrnProti: Int
  suhrnPritomni: Int
  suhrnZa: Int
  suhrnZdrzalo: Int
  url: String
  vysledokHlasovania: String
  casHlasovania: DateTime
  cisloHlasovania: Int
  cisloObdobia: Int
  cisloSchodze: Int
  zmena: Zmena @relation(name:"HlasovaloO", direction:IN)
  poslanci: [Poslanec] @relation(name:"Hlasoval", direction:IN)
  zakon: Zakon @relation(name:"HlasovaloO", direction:OUT)
}

type Rozprava {
  id: ID
  text: String
  typVystupenia: String
  url: String
  zaznamRokovania: String
  zaznamVystupenia: String
  casKoniec: DateTime
  casZaciatok: DateTime
  castDnaSchodze: String
  cisloSchodze: Int
  denSchodze: Int
  poslanec: [Poslanec] @relation(name:"Vystupil", direction:IN)
  zakon: Zakon @relation(name:"TykalaSa", direction:OUT)
}

type Spektrum {
  id: ID
  kluby: [Klub] @relation(name:"Clen", direction:IN)
  zakony: [Zakon] @relation(name:"Navrhol", direction:OUT)
}

type Vybor {
  id: ID
  navrhnuteZakony: [Zakon] @relation(name:"Navrhnuty", direction:OUT)
  gestorovaneZakony: [Zakon] @relation(name:"Gestorsky", direction:OUT)
  poslanci: [Poslanec] @relation(name:"Clen", direction:IN)
}

type Zakon {
  id: ID
  druh: String
  datumDorucenia: DateTime
  nazov: String
  stav: String
  url: String
  vysledok: String
  rozpravy: [Rozprava] @relation(name:"TykalaSa", direction:IN)
  vyboryNavrhol: [Vybor] @relation(name:"Navrhnuty", direction:IN)
  vyboryGestorsky: [Vybor] @relation(name:"Gestorsky", direction:IN)
  navrhliPoslanci: [Poslanec] @relation(name:"Navrhol", direction:IN)
  podpisaliPoslanci: [Poslanec] @relation(name:"Podpisal", direction:IN)
  hlasovania: [Hlasovanie] @relation(name:"HlasovaloO", direction:IN)
  spektrum: Spektrum @relation(name:"Navrhol", direction:IN)
}

type Delegacia {
  id: ID
  poslanci: [Poslanec] @relation(name:"Clen", direction:IN)
}
`

const driver = neo4j.driver(
  'bolt://localhost:11001', // TODO SETUP: 'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'skuska'), // TODO SETUP: neo4j.auth.basic('neo4j', 'h6u4%kr')
)

const server = new ApolloServer({
	schema: makeAugmentedSchema({ typeDefs }),
	context: { driver },
})

server.listen(3003).then(({ url }) => { // TODO SETUP: server.listen(3003, '157.230.123.68')
	console.log(`GraphQL API ready at ${url}`)
})
