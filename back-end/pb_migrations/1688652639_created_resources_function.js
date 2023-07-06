migrate((db) => {
  const collection = new Collection({
    "id": "knsmb4zg6ovlktk",
    "created": "2023-07-06 14:10:39.443Z",
    "updated": "2023-07-06 14:10:39.443Z",
    "name": "resources_function",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("knsmb4zg6ovlktk");

  return dao.deleteCollection(collection);
})
