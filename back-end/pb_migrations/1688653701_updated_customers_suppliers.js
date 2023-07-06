migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ghh9mayss04tlfy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0k0ylqxp",
    "name": "type",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "jzxlmu1g55rxxqz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fm0f8x3j",
    "name": "function",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "knsmb4zg6ovlktk",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hsi7gekf",
    "name": "name",
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
  const collection = dao.findCollectionByNameOrId("ghh9mayss04tlfy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0k0ylqxp",
    "name": "type",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "jzxlmu1g55rxxqz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fm0f8x3j",
    "name": "function",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "knsmb4zg6ovlktk",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hsi7gekf",
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
})
