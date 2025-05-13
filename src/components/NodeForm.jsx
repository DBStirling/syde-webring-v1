import { useState } from 'react';

const NodeForm = ({ onNewNode }) => {
const [formData, setFormData] = useState({
    id: '',
    year: '',
    portfolio: '',
    skills: { primary: '', secondary: '', tertiary: '' }
});

const handleChange = (e) => {
    const { name, value } = e.target;
    if (['primary', 'secondary', 'tertiary'].includes(name)) {
    setFormData({ ...formData, skills: { ...formData.skills, [name]: value } });
    } else {
    setFormData({ ...formData, [name]: value });
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    onNewNode(formData);
    setFormData({ id: '', year: '', portfolio: '', skills: { primary: '', secondary: '', tertiary: '' } });
};

return (
    <form className="node-form" onSubmit={handleSubmit}>
    <input name="id" placeholder="Name" value={formData.id} onChange={handleChange} required />
    <input name="year" placeholder="Year" type="number" value={formData.year} onChange={handleChange} required />
    <input name="portfolio" placeholder="Portfolio URL" value={formData.portfolio} onChange={handleChange} />
    <input name="primary" placeholder="Primary Skill" value={formData.skills.primary} onChange={handleChange} />
    <input name="secondary" placeholder="Secondary Skill" value={formData.skills.secondary} onChange={handleChange} />
    <input name="tertiary" placeholder="Tertiary Skill" value={formData.skills.tertiary} onChange={handleChange} />
    <button type="submit">Add Node</button>
    </form>
);
};

export default NodeForm;
