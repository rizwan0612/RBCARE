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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../models/User");
class UserController {
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.UserModel.findAll();
                res.json(users);
            }
            catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.UserModel.findById(parseInt(req.params.id));
                if (!user)
                    return res.status(404).json({ message: 'User not found' });
                res.json(user);
            }
            catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password_hash, email, role_id, created_at, updated_at } = req.body;
                if (!username || !password_hash) {
                    return res.status(400).json({ message: 'username and password are required' });
                }
                const newUser = yield User_1.UserModel.create({
                    username,
                    password_hash,
                    email,
                    role_id,
                    created_at,
                    updated_at
                });
                res.status(201).json(newUser);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to create user';
                res.status(500).json({ message });
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield User_1.UserModel.update(parseInt(req.params.id), req.body);
                res.json(updatedUser);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to update user';
                res.status(404).json({ message });
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield User_1.UserModel.findById(parseInt(req.params.id));
                if (!task)
                    return res.status(404).json({ message: 'User not found' });
                yield User_1.UserModel.delete(parseInt(req.params.id));
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
}
exports.UserController = UserController;
