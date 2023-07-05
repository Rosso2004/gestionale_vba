migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("com4zel3ndcamad")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("com4zel3ndcamad")

  collection.listRule = null

  return dao.saveCollection(collection)
})
