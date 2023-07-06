migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("knsmb4zg6ovlktk")

  collection.indexes = []

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("knsmb4zg6ovlktk")

  collection.indexes = [
    "CREATE INDEX `idx_zKlnr8w` ON `resources_function` (`label`)"
  ]

  return dao.saveCollection(collection)
})
