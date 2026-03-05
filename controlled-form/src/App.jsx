import { useState } from "react";
import "./App.css";

function App() {
  const initialState = {
    firstName: "",
    lastName: "",
    state: "",
    skills: [],
    gender: "",
    address: "",
    dob: ""
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    let skills = [...formData.skills];
    checked ? skills.push(value) : skills = skills.filter(s => s !== value);
    setFormData({ ...formData, skills });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName.trim()) return alert("Enter First Name");
    if (!formData.lastName.trim()) return alert("Enter Last Name");
    if (!formData.state) return alert("Select State");
    if (formData.skills.length === 0) return alert("Select at least one Skill");
    if (!formData.gender) return alert("Select Gender");
    if (!formData.address.trim()) return alert("Enter Address");
    if (!formData.dob) return alert("Select Date of Birth");

    const today = new Date();
    const dobDate = new Date(formData.dob);
    if (dobDate > today) return alert("DOB cannot be in the future");

    alert("Form submitted successfully!");
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Student Registration</h1>
        <p className="subtitle">All fields are mandatory</p>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          </div>

          <select name="state" value={formData.state} onChange={handleChange}>
            <option value="">Select State</option>
            <option>Tamil Nadu</option>
            <option>Kerala</option>
            <option>Karnataka</option>
            <option>Andhra Pradesh</option>
          </select>

          <div className="group">
            <label>Skills</label>
            <div className="chip-group">
              {["HTML","CSS","JavaScript","React"].map(skill => (
                <label className="chip" key={skill}>
                  <input
                    type="checkbox"
                    value={skill}
                    checked={formData.skills.includes(skill)}
                    onChange={handleSkillChange}
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="group">
            <label>Gender</label>
            <div className="radio-group">
              {["Male","Female","Other"].map(g => (
                <label key={g}>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />

          <div className="btn-row">
            <button type="submit">Submit</button>
            <button type="button" className="reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;