"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPatient = exports.getAllWithoutssn = void 0;
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const id = (0, uuid_1.v1)();
const getAllWithoutssn = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
exports.getAllWithoutssn = getAllWithoutssn;
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ id: id }, entry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
exports.addPatient = addPatient;
