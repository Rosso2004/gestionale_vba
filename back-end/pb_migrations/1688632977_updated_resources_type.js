migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jzxlmu1g55rxxqz")

  collection.listRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jzxlmu1g55rxxqz")

  collection.listRule = ""
  collection.createRule = ""

  return dao.saveCollection(collection)
})
