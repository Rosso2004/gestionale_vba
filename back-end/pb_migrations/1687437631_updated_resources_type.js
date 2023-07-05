migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jzxlmu1g55rxxqz")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_uBOGGVQ` ON `resources_type` (`id5`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jq3ufuhp",
    "name": "id5",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jzxlmu1g55rxxqz")

  collection.indexes = []

  // remove
  collection.schema.removeField("jq3ufuhp")

  return dao.saveCollection(collection)
})
