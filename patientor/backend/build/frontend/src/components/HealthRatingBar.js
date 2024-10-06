"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const styles_1 = require("@mui/material/styles");
const StyledRating = (0, styles_1.styled)(material_1.Rating)({
    iconFilled: {
        color: "#ff6d75",
    },
    iconHover: {
        color: "#ff3d47",
    }
});
const HEALTHBAR_TEXTS = [
    "The patient is in great shape",
    "The patient has a low risk of getting sick",
    "The patient has a high risk of getting sick",
    "The patient has a diagnosed condition",
];
const HealthRatingBar = ({ rating, showText }) => {
    return (<div className="health-bar">
      <StyledRating readOnly value={4 - rating} max={4} icon={<icons_material_1.Favorite fontSize="inherit"/>}/>

      {showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : null}
    </div>);
};
exports.default = HealthRatingBar;
