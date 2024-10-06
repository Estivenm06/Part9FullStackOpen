"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const material_1 = require("@mui/material");
const types_1 = require("../../types");
const genderOptions = Object.values(types_1.Gender).map(v => ({
    value: v, label: v.toString()
}));
const AddPatientForm = ({ onCancel, onSubmit }) => {
    const [name, setName] = (0, react_1.useState)('');
    const [occupation, setOccupation] = (0, react_1.useState)('');
    const [ssn, setSsn] = (0, react_1.useState)('');
    const [dateOfBirth, setDateOfBirth] = (0, react_1.useState)('');
    const [gender, setGender] = (0, react_1.useState)(types_1.Gender.Other);
    const onGenderChange = (event) => {
        event.preventDefault();
        if (typeof event.target.value === "string") {
            const value = event.target.value;
            const gender = Object.values(types_1.Gender).find(g => g.toString() === value);
            if (gender) {
                setGender(gender);
            }
        }
    };
    const addPatient = (event) => {
        event.preventDefault();
        onSubmit({
            name,
            occupation,
            ssn,
            dateOfBirth,
            gender
        });
    };
    return (<div>
      <form onSubmit={addPatient}>
        <material_1.TextField label="Name" fullWidth value={name} onChange={({ target }) => setName(target.value)}/>
        <material_1.TextField label="Social security number" fullWidth value={ssn} onChange={({ target }) => setSsn(target.value)}/>
        <material_1.TextField label="Date of birth" placeholder="YYYY-MM-DD" fullWidth value={dateOfBirth} onChange={({ target }) => setDateOfBirth(target.value)}/>
        <material_1.TextField label="Occupation" fullWidth value={occupation} onChange={({ target }) => setOccupation(target.value)}/>

        <material_1.InputLabel style={{ marginTop: 20 }}>Gender</material_1.InputLabel>
        <material_1.Select label="Gender" fullWidth value={gender} onChange={onGenderChange}>
        {genderOptions.map(option => <material_1.MenuItem key={option.label} value={option.value}>
            {option.label}</material_1.MenuItem>)}
        </material_1.Select>

        <material_1.Grid>
          <material_1.Grid item>
            <material_1.Button color="secondary" variant="contained" style={{ float: "left" }} type="button" onClick={onCancel}>
              Cancel
            </material_1.Button>
          </material_1.Grid>
          <material_1.Grid item>
            <material_1.Button style={{
            float: "right",
        }} type="submit" variant="contained">
              Add
            </material_1.Button>
          </material_1.Grid>
        </material_1.Grid>
      </form>
    </div>);
};
exports.default = AddPatientForm;
