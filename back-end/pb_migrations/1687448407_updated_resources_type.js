migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jzxlmu1g55rxxqz")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jzxlmu1g55rxxqz")

  collection.listRule = null

  return dao.saveCollection(collection)
})
