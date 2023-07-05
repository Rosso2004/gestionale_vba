migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jzxlmu1g55rxxqz")

  collection.name = "resources"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jzxlmu1g55rxxqz")

  collection.name = "resource"

  return dao.saveCollection(collection)
})
