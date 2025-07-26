import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const sessionData = [
  {
    id: 1,
    date: '2025-07-25',
    sport: 'Bike',
    duration: 116,
    distance: 46.6,
    avgSpeed: 24.4,
    avgHR: 141,
    elevation: 242,
    notes: 'Very solid endurance ride. Maintained aero for extended period, good HR control.'
  },
  {
    id: 2,
    date: '2025-07-26',
    sport: 'Bike',
    duration: 76,
    distance: 26,
    avgSpeed: 20.4,
    avgHR: 141,
    elevation: 145,
    notes: 'Recovery ride with cousin. Easy overall but included sprints, still beneficial.'
  }
];

export default function TriLogHome() {
  const [selectedSport, setSelectedSport] = useState(null);
  const sportEmojis = { Bike: '🚴‍♂️', Run: '🏃‍♂️', Swim: '🏊‍♂️' };

  const sportSessions = sessionData.filter((s) => s.sport === selectedSport);

  if (!selectedSport) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
        {['Bike', 'Run', 'Swim'].map((sport) => (
          <button
            key={sport}
            onClick={() => setSelectedSport(sport)}
            style={{ fontSize: '3rem', width: '100%', padding: '2rem' }}
          >
            {sportEmojis[sport]} {sport}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={() => setSelectedSport(null)} style={{ marginBottom: '1rem' }}>⬅️ Back to Home</button>

      <h2>{selectedSport} Speed (km/h)</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={sportSessions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avgSpeed" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <h2 style={{ marginTop: '2rem' }}>{selectedSport} Heart Rate (bpm)</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={sportSessions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avgHR" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      {sportSessions.map((session) => (
        <div key={session.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginTop: '1rem' }}>
          <h3>{session.date}</h3>
          <p><strong>Sport:</strong> {session.sport}</p>
          <p><strong>Duration:</strong> {session.duration} minutes</p>
          <p><strong>Distance:</strong> {session.distance} km</p>
          <p><strong>Average Speed:</strong> {session.avgSpeed} km/h</p>
          <p><strong>Average HR:</strong> {session.avgHR} bpm</p>
          <p><strong>Elevation Gain:</strong> {session.elevation} m</p>
          <p><strong>Coach Notes:</strong> {session.notes}</p>
        </div>
      ))}
    </div>
  );
}
