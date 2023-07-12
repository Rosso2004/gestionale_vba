const db = require('../database/db');

class ResourceFunction {
    static async getAllResourceFunction() {
        const [results] = await db.query('SELECT * FROM resources_function');
        return results;
    }

    static async createResourceFunction(name) {
        const [checkResults] = await db.query('SELECT id FROM resources_function WHERE name = ?', [name]);
        if (checkResults.length > 0) {
            return { status: 409, message: 'Il nome specificato è già presente nel sistema' };
        } else if (checkResults.length === 0){
            await db.query('INSERT INTO resources_function (name) VALUES (?)', [name]);
            return { status: 200, message: 'La funzione risorsa ' + name + ' è stata aggiunta con successo' };
        }
    }

    static async updateResourceFunction(id, name) {
        const [checkResults] = await db.query('SELECT id FROM resources_function WHERE name = ? AND id != ?', [name, id]);
        if (checkResults.length > 0) {
            return { status: 409, message: 'Il nome specificato è già presente nel sistema' };
        } else if (checkResults.length === 0) {
            await db.query('UPDATE resources_function SET name = ? WHERE id = ?', [name, id]);
            return { status: 200, message: 'Funzione risorsa aggiornata con successo' };
        }
    }

    static async deleteResourceFunction(id) {
        const [checkPresence] = await db.query('SELECT id FROM customers_suppliers WHERE fnc = ?', [id]);

        if (checkPresence.length > 0) {
            return { status: 409, message: 'Impossibile eliminare la funzione risorsa poichè è utilizzata in una risorsa' };
        } else if (checkPresence.length === 0) {
            const [checkResults] = await db.query('SELECT id FROM resources_function WHERE id = ?', [id]);
            if (checkResults.length === 0) {
                return {status: 404, message: 'Funzione risorsa non trovata'};
            } else if (checkResults.length === 1) {
                await db.query('DELETE FROM resources_function WHERE id = ?', [id]);
                return {status: 200, message: 'Funzione risorsa rimossa con successo'};
            }
        }
    }
}

module.exports = ResourceFunction;
