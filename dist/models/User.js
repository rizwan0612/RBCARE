"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = __importDefault(require("../config/database"));
class UserModel {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.default.query('SELECT * FROM user');
            return rows;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.default.query('SELECT * FROM user WHERE user_id = ?', [id]);
            return rows[0] || null;
        });
    }
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield database_1.default.query('INSERT INTO user (username, password_hash, email,role_id,created_at,updated_at) VALUES (?, ?, ?, ?, ?, ?)', [user.username, user.password_hash, user.email, user.role_id, user.created_at, user.updated_at]);
            // Handle potential null with type assertion
            const createdUser = yield this.findById(result.insertId);
            if (!createdUser) {
                throw new Error('Failed to create task');
            }
            return createdUser;
        });
    }
    static update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE user SET username = ?, password_hash = ?, email = ?, role_id = ?, updated_at = ? WHERE user_id = ?', [user.username, user.password_hash, user.email, user.role_id, user.updated_at, user.id]);
            const updatedUser = yield this.findById(id);
            if (!updatedUser) {
                throw new Error('User not found after update');
            }
            return updatedUser;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM user WHERE user_id = ?', [id]);
        });
    }
}
exports.UserModel = UserModel;
