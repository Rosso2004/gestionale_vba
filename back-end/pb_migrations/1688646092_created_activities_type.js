migrate((db) => {
  const collection = new Collection({
    "id": "i1cxpqqvzwu2n7r",
    "created": "2023-07-06 12:21:32.220Z",
    "updated": "2023-07-06 12:21:32.220Z",
    "name": "activities_type",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gdafbffs",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "y3jrh3g3",
        "name": "description",
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
        "id": "rwuglkqr",
        "name": "note",
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
  const collection = dao.findCollectionByNameOrId("i1cxpqqvzwu2n7r");

  return dao.deleteCollection(collection);
})
