import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function CycleMap() {
  const [log, setLog] = useState({
    mood: "",
    moodNotes: "",
    energy: "",
    energyNotes: "",
    stress: "",
    stressNotes: "",
    sleep: "",
    sleepNotes: "",
    motivation: "",
    motivationNotes: "",
    journal: ""
  });

  const [entries, setEntries] = useState([]);

  // Load entries from localStorage on first load
  useEffect(() => {
    const stored = localStorage.getItem("cyclemap-entries");
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cyclemap-entries", JSON.stringify(entries));
  }, [entries]);

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
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    setLog({
      mood: "",
      moodNotes: "",
      energy: "",
      energyNotes: "",
      stress: "",
      stressNotes: "",
      sleep: "",
      sleepNotes: "",
      motivation: "",
      motivationNotes: "",
      journal: ""
    });
  };

  const handleDelete = (timestamp) => {
    const updated = entries.filter(entry => entry.timestamp !== timestamp);
    setEntries(updated);
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
        <input placeholder="Mood (1-10)" value={log.mood} onChange={handleChange("mood")} style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }} />
        <textarea placeholder="Mood notes..." value={log.moodNotes} onChange={handleChange("moodNotes")} style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }} />

        <input placeholder="Energy (1-10)" value={log.energy} onChange={handleChange("energy")} style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }} />
        <textarea placeholder="Energy notes..." value={log.energyNotes} onChange={handleChange("energyNotes")} style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }} />

        <input placeholder="Stress (1-10)" value={log.stress} onChange={handleChange("stress")} style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }} />
        <textarea placeholder="Stress notes..." value={log.stressNotes} onChange={handleChange("stressNotes")} style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }} />

        <input placeholder="Sleep Quality (1-10)" value={log.sleep} onChange={handleChange("sleep")} style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }} />
        <textarea placeholder="Sleep notes..." value={log.sleepNotes} onChange={handleChange("sleepNotes")} style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }} />

        <input placeholder="Motivation (1-10)" value={log.motivation} onChange={handleChange("motivation")} style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }} />
        <textarea placeholder="Motivation notes..." value={log.motivationNotes} onChange={handleChange("motivationNotes")} style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }} />

        <textarea placeholder="General journal notes..." value={log.journal} onChange={handleChange("journal")} style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }} />

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

      <div style={{ marginTop: '2rem' }}>
        <h3>Logged Entries</h3>
        {entries.map((entry, index) => (
          <div key={index} style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>
            <strong>{entry.timestamp}</strong>
            <div>Mood: {entry.mood}, Energy: {entry.energy}, Stress: {entry.stress}, Sleep: {entry.sleep}, Motivation: {entry.motivation}</div>
            <button
              onClick={() => handleDelete(entry.timestamp)}
              style={{ marginTop: '0.5rem', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.25rem 0.5rem' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
