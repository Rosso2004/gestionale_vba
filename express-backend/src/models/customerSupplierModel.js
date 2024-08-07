const db = require('../database/db');

class CustomerSupplier {
    static async getAllCustomerSupplier() {
        const [results] = await db.query("SELECT customers_suppliers.id,\n" +
            "\t\t resources_type.id AS rtId, resources_type.name AS rtName, resources_type.description AS rtDescription, resources_type.note AS rtNote,\n" +
            "\t\t resources_function.id AS rfId, resources_function.name AS rfName,\n" +
            "\t\t customers_suppliers.name,\n" +
            "\t\t customers_suppliers.city,\n" +
            "\t\t customers_suppliers.address,\n" +
            "\t\t customers_suppliers.cap,\n" +
            "\t\t customers_suppliers.phone_number,\n" +
            "\t\t customers_suppliers.email,\n" +
            "\t\t customers_suppliers.piva,\n" +
            "\t\t customers_suppliers.iban       \n" +
            "FROM customers_suppliers\n" +
            "INNER JOIN resources_type ON customers_suppliers.type = resources_type.id\n" +
            "INNER JOIN resources_function ON customers_suppliers.fnc = resources_function.id;");

        const data = results.map((row) => ({
            id: row.id,
            type: {
                id: row.rtId,
                name: row.rtName,
                description: row.rtDescription,
                note: row.rtNote
            },
            fnc: {
              id: row.rfId,
              name: row.rfName
            },
            name: row.name,
            city: row.city,
            address: row.address,
            cap: row.cap,
            phone_number: row.phone_number,
            email: row.email,
            piva: row.piva,
            iban: row.iban
        }));

        return data;
    }

    static async createCustomerSupplier(type, fnc, name, city, address, cap, phone_number, email, piva, iban) {
        const [checkResults] = await db.query('SELECT id FROM customers_suppliers WHERE name = ?', [name]);
        if (checkResults.length > 0) {
            return { status: 409, message: 'Il nome specificato è già presente nel sistema' };
        } else if (checkResults.length === 0){
            await db.query('INSERT INTO customers_suppliers (type, fnc, name, city, address, cap, phone_number, email, piva, iban) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [type, fnc, name, city, address, cap, phone_number, email, piva, iban]);
            return { status: 200, message: 'La risorsa ' + name + ' è stata aggiunta con successo' };
        }
    }

    static async updateCustomerSupplier(id, type, fnc, name, city, address, cap, phone_number, email, piva, iban) {
        const [checkResults] = await db.query('SELECT id FROM customers_suppliers WHERE name = ? AND id != ?', [name, id]);
        if (checkResults.length > 0) {
            return { status: 409, message: 'Il nome specificato è già presente nel sistema' };
        } else if (checkResults.length === 0) {
            await db.query('UPDATE customers_suppliers SET type = ?, fnc = ?, name = ?, city = ?, address = ?, cap = ?, phone_number = ?, email = ?, piva = ?, iban = ? WHERE id = ?', [type, fnc, name, city, address, cap, phone_number, email, piva, iban, id]);
            return { status: 200, message: 'Risorsa aggiornata con successo' };
        }
    }

    static async deleteCustomerSupplier(id) {
        const [checkResults] = await db.query('SELECT id FROM orders WHERE customer = ?', [id]);
        if (checkResults.length > 0) {
            return { status: 409, message: 'Impossibile eliminare questo cliente / fornitore poichè è utilizzato in una commessa' };
        } else {
            await db.query('DELETE FROM customers_suppliers WHERE id = ?', [id]);
            return { status: 200, message: 'Cliente / Fornitore rimosso con successo' };
        }
    }
}

module.exports = CustomerSupplier;
