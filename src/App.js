import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function CycleMap() {
  const [log, setLog] = useState({
    mood: "",
    energy: "",
    stress: "",
    sleep: "",
    motivation: "",
    journal: ""
  });
  const [entries, setEntries] = useState([]);

  const handleChange = (field) => (e) => {
    setLog({ ...log, [field]: e.target.value });
  };

  const handleSubmit = () => {
    const newEntry = {
      ...log,
      timestamp: new Date().toLocaleString(),
      moonPhase: "Waning Gibbous",
      retrograde: "None",
      schumann: "Normal",
      geomagnetic: "Low"
    };
    setEntries([...entries, newEntry]);
    setLog({ mood: "", energy: "", stress: "", sleep: "", motivation: "", journal: "" });
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
        <input placeholder="Mood (1-10)" value={log.mood} onChange={handleChange("mood")} style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }} />
        <input placeholder="Energy (1-10)" value={log.energy} onChange={handleChange("energy")} style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }} />
        <input placeholder="Stress (1-10)" value={log.stress} onChange={handleChange("stress")} style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }} />
        <input placeholder="Sleep Quality (1-10)" value={log.sleep} onChange={handleChange("sleep")} style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }} />
        <input placeholder="Motivation (1-10)" value={log.motivation} onChange={handleChange("motivation")} style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }} />
        <textarea placeholder="Journal notes..." value={log.journal} onChange={handleChange("journal")} style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }} />
        <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>Log Entry</button>
      </div>

      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={entries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" hide={true} />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line type="monotone" dataKey="mood" stroke="#8884d8" name="Mood" />
            <Line type="monotone" dataKey="energy" stroke="#82ca9d" name="Energy" />
            <Line type="monotone" dataKey="stress" stroke="#ff7300" name="Stress" />
            <Line type="monotone" dataKey="sleep" stroke="#00bcd4" name="Sleep" />
            <Line type="monotone" dataKey="motivation" stroke="#ffc658" name="Motivation" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
