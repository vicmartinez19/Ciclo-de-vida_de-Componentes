import React, { useState } from 'react';

function Bitacora({ onRegistrarPlaneta }) {
  const [nombrePlaneta, setNombrePlaneta] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [clima, setClima] = useState('Rocoso');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombrePlaneta.trim()) return;

    onRegistrarPlaneta({
      nombre: nombrePlaneta.trim(),
      descripcion: descripcion.trim() || 'Sin descripción detallada.',
      clima
    });

    setNombrePlaneta('');
    setDescripcion('');
  };

  return (
    <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', marginTop: '24px', border: '1px solid #334155' }}>
      <h3 style={{ color: '#38bdf8', fontSize: '1.1rem', marginBottom: '12px' }}>
        📝 Reto: Bitácora de Exploración Espacial
      </h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Nombre del nuevo planeta (ej. Kepler-452b)"
            value={nombrePlaneta}
            onChange={(e) => setNombrePlaneta(e.target.value)}
            style={{ flex: 2, minWidth: '180px' }}
          />
          <select value={clima} onChange={(e) => setClima(e.target.value)} style={{ flex: 1 }}>
            <option value="Rocoso">🪨 Rocoso</option>
            <option value="Gaseoso">🌪️ Gaseoso</option>
            <option value="Oceánico">🌊 Oceánico</option>
            <option value="Helado">❄️ Helado</option>
            <option value="Volcánico">🌋 Volcánico</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Descripción y notas de exploración"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button
          type="submit"
          style={{ background: '#10b981', color: 'white', padding: '10px', fontWeight: 700 }}
        >
          + Registrar en Bitácora y Aterrizar
        </button>
      </form>
    </div>
  );
}

export default Bitacora;