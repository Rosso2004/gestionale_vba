migrate((db) => {
  const collection = new Collection({
    "id": "jzxlmu1g55rxxqz",
    "created": "2023-06-22 07:49:32.328Z",
    "updated": "2023-06-22 07:49:32.328Z",
    "name": "resource",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "j3ergmw5",
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
        "id": "8hu6ccty",
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
        "id": "psgrpmw4",
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
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jzxlmu1g55rxxqz");

  return dao.deleteCollection(collection);
})
