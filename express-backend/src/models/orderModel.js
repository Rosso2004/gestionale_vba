const db = require('../database/db');

class Order {
    static async getAllOrder() {
        const [results] = await db.query("SELECT orders.id,\n" +
            "\t\t JSON_OBJECT('id', users.id, 'name', CONCAT(users.lastname, ' ', users.firstname)) AS manager,\n" +
            "\t\t JSON_OBJECT('id', customers_suppliers.id, 'name', customers_suppliers.name) AS customer,\n" +
            "\t\t orders.name,\n" +
            "\t\t JSON_OBJECT('id', orders_status.id, 'name', orders_status.name) AS status,\n" +
            "\t\t JSON_OBJECT('id', orders_types.id, 'name', orders_types.name) AS type,\n" +
            "\t\t orders.start_date,\n" +
            "\t\t orders.end_date,\n" +
            "\t\t orders.note\n" +
            "FROM orders \n" +
            "INNER JOIN users ON orders.manager = users.id\n" +
            "INNER JOIN customers_suppliers ON orders.customer = customers_suppliers.id\n" +
            "INNER JOIN orders_status ON orders.status = orders_status.id\n" +
            "INNER JOIN orders_types ON orders.type = orders_types.id;");

        return results.map((row) => {
            return {
                ...row,
                manager: JSON.parse(row.manager),
                customer: JSON.parse(row.customer),
                status: JSON.parse(row.status),
                type: JSON.parse(row.type)
            };
        });
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
