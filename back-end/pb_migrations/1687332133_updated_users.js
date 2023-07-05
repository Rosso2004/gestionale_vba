migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vquql9z58q88ntf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kvbiwmjf",
    "name": "firstname",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dhpyeiep",
    "name": "lastname",
    "type": "text",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("vquql9z58q88ntf")

  // remove
  collection.schema.removeField("kvbiwmjf")

  // remove
  collection.schema.removeField("dhpyeiep")

  return dao.saveCollection(collection)
})
