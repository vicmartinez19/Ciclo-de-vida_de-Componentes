import React, { useState, useEffect } from 'react';

function PanelControl() {
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);

  // Fase de MONTAJE y DESMONTAJE con función de limpieza (Cleanup)
  useEffect(() => {
    console.log("🚀 [MONTAJE] Motores hiperlumínicos encendidos. Intervalo iniciado.");

    const timer = setInterval(() => {
      setDistancia(prev => prev + 50);
      setCombustible(prev => Math.max(0, prev - 2));
    }, 1000);

    return () => {
      console.log("🛑 [DESMONTAJE] Limpiando intervalo de vuelo para prevenir fugas de memoria.");
      clearInterval(timer);
    };
  }, []);

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', background: '#090d16', padding: '24px', borderRadius: '12px', color: '#e2e8f0', border: '1px solid #1e293b' }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '16px' }}>🚀 Telemetría de Vuelo Espacial</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div style={{ background: '#1e293b', padding: '14px', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Distancia Recorrida</div>
          <div style={{ fontSize: '1.6rem', color: '#38bdf8', fontWeight: 700 }}>{distancia} AL</div>
        </div>
        <div style={{ background: '#1e293b', padding: '14px', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Nivel de Combustible</div>
          <div style={{ fontSize: '1.6rem', color: combustible > 20 ? '#4ade80' : '#f87171', fontWeight: 700 }}>{combustible}%</div>
        </div>
      </div>
    </div>
  );
}

export default PanelControl;