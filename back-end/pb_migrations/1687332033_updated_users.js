migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vquql9z58q88ntf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y4rlu7nh",
    "name": "phone_number",
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
  const collection = dao.findCollectionByNameOrId("vquql9z58q88ntf")

  // remove
  collection.schema.removeField("y4rlu7nh")

  return dao.saveCollection(collection)
})
