migrate((db) => {
  const collection = new Collection({
    "id": "com4zel3ndcamad",
    "created": "2023-06-19 13:51:14.122Z",
    "updated": "2023-06-19 13:51:14.122Z",
    "name": "users",
    "type": "base",
    "system": false,
    "schema": [
      {
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
  const collection = dao.findCollectionByNameOrId("com4zel3ndcamad");

  return dao.deleteCollection(collection);
})
