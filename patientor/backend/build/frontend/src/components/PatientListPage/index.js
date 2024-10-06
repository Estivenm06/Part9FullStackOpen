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
const react_1 = require("react");
const material_1 = require("@mui/material");
const axios_1 = __importDefault(require("axios"));
const AddPatientModal_1 = __importDefault(require("../AddPatientModal"));
const HealthRatingBar_1 = __importDefault(require("../HealthRatingBar"));
const patients_1 = __importDefault(require("../../services/patients"));
const PatientListPage = ({ patients, setPatients }) => {
    const [modalOpen, setModalOpen] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)();
    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        setError(undefined);
    };
    const submitNewPatient = (values) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const patient = yield patients_1.default.create(values);
            setPatients(patients.concat(patient));
            setModalOpen(false);
        }
        catch (e) {
            if (axios_1.default.isAxiosError(e)) {
                if (((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) && typeof ((_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.data) === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                }
                else {
                    setError("Unrecognized axios error");
                }
            }
            else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    });
    return (<div className="App">
      <material_1.Box>
        <material_1.Typography align="center" variant="h6">
          Patient list
        </material_1.Typography>
      </material_1.Box>
      <material_1.Table style={{ marginBottom: "1em" }}>
        <material_1.TableHead>
          <material_1.TableRow>
            <material_1.TableCell>Name</material_1.TableCell>
            <material_1.TableCell>Gender</material_1.TableCell>
            <material_1.TableCell>Occupation</material_1.TableCell>
            <material_1.TableCell>Health Rating</material_1.TableCell>
          </material_1.TableRow>
        </material_1.TableHead>
        <material_1.TableBody>
          {Object.values(patients).map((patient) => (<material_1.TableRow key={patient.id}>
              <material_1.TableCell>{patient.name}</material_1.TableCell>
              <material_1.TableCell>{patient.gender}</material_1.TableCell>
              <material_1.TableCell>{patient.occupation}</material_1.TableCell>
              <material_1.TableCell>
                <HealthRatingBar_1.default showText={false} rating={1}/>
              </material_1.TableCell>
            </material_1.TableRow>))}
        </material_1.TableBody>
      </material_1.Table>
      <AddPatientModal_1.default modalOpen={modalOpen} onSubmit={submitNewPatient} error={error} onClose={closeModal}/>
      <material_1.Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </material_1.Button>
    </div>);
};
exports.default = PatientListPage;
