const db = require('../database/db');

class CustomerSupplier {
    static async getAllCustomerSupplier() {
        const [results] = await db.query("SELECT customers_suppliers.id,\n" +
            "\t\t JSON_OBJECT('id', resources_type.id, 'name', resources_type.name, 'description', resources_type.description, 'note', resources_type.note) AS type,\n" +
            "\t\t JSON_OBJECT('id', resources_function.id, 'name', resources_function.name) AS fnc,\n" +
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

        const parsedResults = results.map(result => {
            const parsedType = JSON.parse(result.type);
            const parsedFnc = JSON.parse(result.fnc);
            return {
                id: result.id,
                type: {
                    id: parsedType.id,
                    name: parsedType.name,
                    description: parsedType.description,
                    note: parsedType.note
                },
                fnc: {
                    id: parsedFnc.id,
                    name: parsedFnc.name
                },
                name: result.name,
                city: result.city,
                address: result.address,
                cap: result.cap,
                phone_number: result.phone_number,
                email: result.email,
                piva: result.piva,
                iban: result.iban
            };
        });

        return parsedResults;
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
        const [checkResults] = await db.query('SELECT id FROM customers_suppliers WHERE id = ?', [id]);

        if (checkResults.length === 0) {
            return { status: 404, message: 'Risorsa non trovata' };
        } else if (checkResults.length === 1) {
            await db.query('DELETE FROM customers_suppliers WHERE id = ?', [id]);
            return { status: 200, message: 'Risorsa rimossa con successo' };
        }
    }
}

module.exports = CustomerSupplier;
