migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jzxlmu1g55rxxqz")

  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jzxlmu1g55rxxqz")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
