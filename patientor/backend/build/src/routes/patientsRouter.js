"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = require("../services/patientsService");
const utils_1 = require("../utils");
const zod_1 = require("zod");
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send((0, patientsService_1.getAllWithoutssn)());
});
router.post("/", (req, res) => {
    const body = req.body;
    try {
        const newPatient = (0, utils_1.toNewPatient)(body);
        const addedPatient = (0, patientsService_1.addPatient)(newPatient);
        console.log(addedPatient);
        res.json(addedPatient);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).send({ error: error.issues });
        }
        else {
            res.status(400).send({ error: "unknown error" });
        }
    }
});
exports.default = router;
