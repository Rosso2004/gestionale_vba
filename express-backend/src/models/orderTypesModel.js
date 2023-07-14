const db = require('../database/db');

class OrderTypes {
    static async getAllOrderTypes() {
        const [results] = await db.query('SELECT * FROM orders_types');
        return results;
    }

    static async createOrderTypes(name) {
        const [checkResults] = await db.query('SELECT id FROM orders_types WHERE name = ?', [name]);
        if (checkResults.length > 0) {
            return { status: 409, message: 'Il nome specificato è già presente nel sistema' };
        } else if (checkResults.length === 0){
            await db.query('INSERT INTO orders_types (name) VALUES (?)', [name]);
            return { status: 200, message: 'Il tipo ' + name + ' è stato aggiunto con successo' };
        }
    }

    static async updateOrderTypes(id, name) {
        const [checkResults] = await db.query('SELECT id FROM orders_types WHERE name = ? AND id != ?', [name, id]);
        if (checkResults.length > 0) {
            return { status: 409, message: 'Il nome specificato è già presente nel sistema' };
        } else if (checkResults.length === 0) {
            await db.query('UPDATE orders_types SET name = ? WHERE id = ?', [name, id]);
            return { status: 200, message: 'Il tipo commessa è stato aggiornato con successo' };
        }
    }

    static async deleteOrderTypes(id) {
        const [checkPresence] = await db.query('SELECT id FROM orders WHERE type = ?', [id]);

        if (checkPresence.length > 0) {
            return { status: 409, message: 'Impossibile eliminare questo tipo commessa poichè è utilizzato in una commessa' };
        } else if (checkPresence.length === 0) {
            const [checkResults] = await db.query('SELECT id FROM orders_types WHERE id = ?', [id]);
            if (checkResults.length === 0) {
                return { status: 404, message: 'Tipo non trovata' };
            } else if (checkResults.length === 1) {
                await db.query('DELETE FROM orders_types WHERE id = ?', [id]);
                return { status: 200, message: 'Tipo commessa rimosso con successo' };
            }
        }
    }
}

module.exports = OrderTypes;
