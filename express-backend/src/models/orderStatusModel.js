const db = require('../database/db');

class OrderStatus {
    static async getAllOrderStatus() {
        const [results] = await db.query('SELECT * FROM orders_status');
        return results;
    }

    static async createOrderStatus(name) {
        const [checkResults] = await db.query('SELECT id FROM orders_status WHERE name = ?', [name]);
        if (checkResults.length > 0) {
            return { status: 409, message: 'Il nome specificato è già presente nel sistema' };
        } else if (checkResults.length === 0){
            await db.query('INSERT INTO orders_status (name) VALUES (?)', [name]);
            return { status: 200, message: 'Lo stato ' + name + ' è stato aggiunto con successo' };
        }
    }

    static async updateOrderStatus(id, name) {
        const [checkResults] = await db.query('SELECT id FROM orders_status WHERE name = ? AND id != ?', [name, id]);
        if (checkResults.length > 0) {
            return { status: 409, message: 'Il nome specificato è già presente nel sistema' };
        } else if (checkResults.length === 0) {
            await db.query('UPDATE orders_status SET name = ? WHERE id = ?', [name, id]);
            return { status: 200, message: 'Lo stato è stato aggiornato con successo' };
        }
    }

    static async deleteOrderStatus(id) {
        const [checkPresence] = await db.query('SELECT id FROM orders WHERE status = ?', [id]);

        if (checkPresence.length > 0) {
            return { status: 409, message: 'Impossibile eliminare questo stato poichè è utilizzato in una commessa' };
        } else if (checkPresence.length === 0) {
            const [checkResults] = await db.query('SELECT id FROM orders_status WHERE id = ?', [id]);
            if (checkResults.length === 0) {
                return { status: 404, message: 'Stato non trovata' };
            } else if (checkResults.length === 1) {
                await db.query('DELETE FROM orders_status WHERE id = ?', [id]);
                return { status: 200, message: 'Stato rimosso con successo' };
            }
        }
    }
}

module.exports = OrderStatus;
