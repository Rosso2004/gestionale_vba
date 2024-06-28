const db = require('../database/db');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');

class User {
    static async getAllUser() {
        const [results] = await db.query('SELECT * FROM users');
        return results;
    }

    static async createUser(lastname, firstname, username, email, phone_number, password) {
        const [checkResults] = await db.query('SELECT id FROM users WHERE email = ? OR username = ?', [email, username]);
        if (checkResults.length > 0) {
            return { status: 409, message: 'Username o Email già presente nel sistema' };
        } else if (checkResults.length === 0){
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query('INSERT INTO users (lastname, firstname, username, email, phone_number, password) VALUES (?, ?, ?, ?, ?, ?)', [lastname, firstname, username, email, phone_number, hashedPassword]);
            return { status: 200, message: 'L\'utente ' + lastname + ' ' + firstname + ' è stato aggiunto con successo' };
        }
    }

    static async updateUser(id, username, lastname, firstname, email, phone_number, password) {
        const [checkEmUs] = await db.query('SELECT id FROM users WHERE (email = ? OR username = ?) AND id != ?', [email, username, id]);
        if (checkEmUs.length > 0) {
            return { status: 409, message: 'Username o Email già presente nel sistema' };
        } else if (checkEmUs.length === 0) {
            const [checkResults] = await db.query('SELECT id, password FROM users WHERE id = ?', [id]);
            if (checkResults.length === 0) {
                return {status: 404, error: 'Utente non trovato'};
            } else if (checkResults.length === 1) {
                const dbPassword = checkResults[0].password;
                const isMatch = await bcrypt.compare(password, dbPassword);
                if (isMatch) {
                    await db.query('UPDATE users SET username = ?, lastname = ?, firstname = ?, email = ?, phone_number = ? WHERE id = ?', [username, lastname, firstname, email, phone_number, id]);
                    return {status: 200, message: 'Utente aggiornato con successo'};
                } else {
                    return {status: 401, message: 'La password per modificare l\'utente non è corretta'};
                }
            }
        }
    }

    static async changeUserPassword(id, password) {
        const [checkResults] = await db.query('SELECT id FROM users WHERE id = ?', [id]);
        if (checkResults.length === 0) {
            return {status: 404, error: 'Utente non trovato'};
        } else if (checkResults.length === 1) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id]);
            return {status: 200, message: 'Password aggiornata con successo'};
        }
    }

    static async verifyUser(email, username, password) {
        const [results] = await db.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username]);

        if (results.length === 0) {
            return { status: 404, message: 'Username o Email non valida' };
        }

        const dbPassword = results[0].password;
        const isMatch = await bcrypt.compare(password, dbPassword);

        if (!isMatch) {
            return { status: 401, message: 'Password non valida' };
        }

        return { status: 200, message: 'Utente autenticato con successo' };
    }

    static async deleteUser(id) {
        const [checkResults] = await db.query('SELECT id FROM orders WHERE manager = ?', [id]);
        if (checkResults.length > 0) {
            return { status: 409, message: 'Impossibile eliminare questo utente poichè è il responsabile in una commessa' };
        } else {
            await db.query('DELETE FROM users WHERE id = ?', [id]);
            return { status: 200, message: 'Utente rimosso con successo' };
        }
    }
}

module.exports = User;
