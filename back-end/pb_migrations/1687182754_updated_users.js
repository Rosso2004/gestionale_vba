migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("com4zel3ndcamad")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dttkc7wg",
    "name": "password",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("com4zel3ndcamad")

  // remove
  collection.schema.removeField("dttkc7wg")

  return dao.saveCollection(collection)
})
