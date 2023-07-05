migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("com4zel3ndcamad")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hgmc81tw",
    "name": "email",
    "type": "email",
    "required": true,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("com4zel3ndcamad")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hgmc81tw",
    "name": "email",
    "type": "email",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
})
