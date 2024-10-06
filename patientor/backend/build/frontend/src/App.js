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
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
const material_1 = require("@mui/material");
const constants_1 = require("./constants");
const patients_1 = __importDefault(require("./services/patients"));
const PatientListPage_1 = __importDefault(require("./components/PatientListPage"));
const App = () => {
    const [patients, setPatients] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        void axios_1.default.get(`${constants_1.apiBaseUrl}/ping`);
        const fetchPatientList = () => __awaiter(void 0, void 0, void 0, function* () {
            const patients = yield patients_1.default.getAll();
            setPatients(patients);
        });
        void fetchPatientList();
    }, []);
    return (<div className="App">
      <react_router_dom_1.BrowserRouter>
        <material_1.Container>
          <material_1.Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </material_1.Typography>
          <material_1.Button component={react_router_dom_1.Link} to="/" variant="contained" color="primary">
            Home
          </material_1.Button>
          <material_1.Divider hidden/>
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/" element={<PatientListPage_1.default patients={patients} setPatients={setPatients}/>}/>
          </react_router_dom_1.Routes>
        </material_1.Container>
      </react_router_dom_1.BrowserRouter>
    </div>);
};
exports.default = App;
