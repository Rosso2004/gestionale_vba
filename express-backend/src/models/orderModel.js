const db = require('../database/db');

class Order {
    static async getAllOrder() {
        const [results] = await db.query("SELECT orders.id,\n" +
            "\t\t users.id AS uId, CONCAT(users.lastname, ' ', users.firstname) AS uName,\n" +
            "\t\t customers_suppliers.id AS csId, customers_suppliers.name AS csName,\n" +
            "\t\t orders.name,\n" +
            "\t\t orders_status.id AS osId, orders_status.name AS osName,\n" +
            "\t\t orders_types.id otId, orders_types.name AS otName,\n" +
            "\t\t orders.start_date,\n" +
            "\t\t orders.end_date,\n" +
            "\t\t orders.note\n" +
            "FROM orders \n" +
            "INNER JOIN users ON orders.manager = users.id\n" +
            "INNER JOIN customers_suppliers ON orders.customer = customers_suppliers.id\n" +
            "INNER JOIN orders_status ON orders.status = orders_status.id\n" +
            "INNER JOIN orders_types ON orders.type = orders_types.id;");

        const data = results.map((row) => ({
            id: row.id,
            manager: {
                id: row.uId,
                name: row.uName,
            },
            customer: {
                id: row.csId,
                name: row.csName
            },
            name: row.name,
            status: {
                id: row.osId,
                name: row.osName
            },
            type: {
                id: row.otId,
                name: row.otName
            },
            start_date: row.start_date,
            end_date: row.end_date,
            note: row.note
        }));

        return data;
    }


    static async getAllOrderNew() {
        return {pippo: "ciao"}
    }


    static async createOrder(manager, customer, name, status, type, start_date, end_date, note) {
        await db.query('INSERT INTO orders (manager, customer, name, status, type, start_date, end_date, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [manager, customer, name, status, type, start_date, end_date, note]);
        return { status: 200, message: 'La commessa ' + name + ' è stata aggiunta con successo' };
    }

    static async updateOrder(id, manager, customer, name, status, type, start_date, end_date, note) {
        await db.query('UPDATE orders SET manager = ?, customer = ?, name = ?, status = ?, type = ?, start_date = ?, end_date = ?, note = ? WHERE id = ?', [manager, customer, name, status, type, start_date, end_date, note, id]);
        return { status: 200, message: 'Commessa aggiornata con successo' };
    }

    static async deleteOrder(id) {
        const [checkResults] = await db.query('SELECT id FROM orders WHERE id = ?', [id]);

        if (checkResults.length === 0) {
            return { status: 404, message: 'Commessa non trovata' };
        } else if (checkResults.length === 1) {
            await db.query('DELETE FROM orders WHERE id = ?', [id]);
            return { status: 200, message: 'Commessa rimossa con successo' };
        }
    }
}

module.exports = Order;
