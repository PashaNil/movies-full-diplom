import "./FilterCheckbox.css";

function FilterCheckbox({ handleCheckBox, checkBoxStatus }) {

  return (
    <div className="filterCheckbox">
      <input type="checkbox" id="cbx" style={{ display: "none" }} onChange={handleCheckBox} checked={checkBoxStatus} />
      <label htmlFor="cbx" className="toggle"><span></span></label>
    </div>
  )
}

export default FilterCheckbox;
