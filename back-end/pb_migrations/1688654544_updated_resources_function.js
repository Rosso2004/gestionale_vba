migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("knsmb4zg6ovlktk")

  // remove
  collection.schema.removeField("ek8ke56w")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xsgwrh4h",
    "name": "name",
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
  const collection = dao.findCollectionByNameOrId("knsmb4zg6ovlktk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ek8ke56w",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xsgwrh4h",
    "name": "label",
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
})
