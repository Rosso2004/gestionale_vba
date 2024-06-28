const db = require('../database/db');

class ResourceType {
    static async getAllResourceType() {
        const [results] = await db.query('SELECT * FROM resources_type');
        return results;
    }

    static async createResourceType(name, description, note) {
        const [checkResults] = await db.query('SELECT id FROM resources_type WHERE name = ?', [name]);
        if (checkResults.length > 0) {
            return { status: 409, message: 'Il nome specificato è già presente nel sistema' };
        } else if (checkResults.length === 0){
            await db.query('INSERT INTO resources_type (name, description, note) VALUES (?, ?, ?)', [name, description, note]);
            return { status: 200, message: 'Il tipo risorsa ' + name + ' è stato aggiunto con successo' };
        }
    }

    static async updateResourceType(id, name, description, note) {
        const [checkResults] = await db.query('SELECT id FROM resources_type WHERE name = ? AND id != ?', [name, id]);
        if (checkResults.length > 0) {
            return { status: 409, message: 'Il nome specificato è già presente nel sistema' };
        } else if (checkResults.length === 0) {
            await db.query('UPDATE resources_type SET name = ?, description = ?, note = ? WHERE id = ?', [name, description, note, id]);
            return { status: 200, message: 'Tipo risorsa aggiornata con successo' };
        }
    }

    static async deleteResourceType(id) {
        const [checkPresence] = await db.query('SELECT id FROM customers_suppliers WHERE type = ?', [id]);

        if (checkPresence.length > 0) {
            return { status: 409, message: 'Impossibile eliminare questo tipo risorsa poichè è utilizzato in un Cliente / Fornitore' };
        } else if (checkPresence.length === 0) {
            const [checkResults] = await db.query('SELECT id FROM resources_type WHERE id = ?', [id]);
            if (checkResults.length === 0) {
                return { status: 404, message: 'Tipo risorsa non trovata' };
            } else if (checkResults.length === 1) {
                await db.query('DELETE FROM resources_type WHERE id = ?', [id]);
                return { status: 200, message: 'Tipo risorsa rimossa con successo' };
            }
        }
    }
}

module.exports = ResourceType;
