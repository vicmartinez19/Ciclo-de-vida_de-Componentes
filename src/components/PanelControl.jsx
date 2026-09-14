import React, { useState, useEffect, useMemo } from 'react';
import Planeta from './Planeta.jsx';

function PanelControl() {
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [planetas, setPlanetas] = useState([
    { id: 1, nombre: "Kepler-452b", clima: "Templado" },
    { id: 2, nombre: "Proxima Centauri b", clima: "Glacial" }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDistancia(prev => prev + 50);
      setCombustible(prev => Math.max(0, prev - 2));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDespegar = (index) => {
    setPlanetas(planetas.filter((_, i) => i !== index));
  };

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', background: '#090d16', padding: '24px', borderRadius: '12px', color: '#e2e8f0' }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '16px' }}>🚀 Telemetría y Radar de Planetas</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
        {planetas.map((p, idx) => (
          <Planeta key={p.id} nombre={p.nombre} clima={p.clima} index={idx} onDespegar={handleDespegar} />
        ))}
      </div>
    </div>
  );
}

export default PanelControl;