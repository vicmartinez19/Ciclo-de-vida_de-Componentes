import React, { useState, useEffect, useMemo } from 'react';

function PanelControl() {
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setDistancia(prev => prev + 50);
      setCombustible(prev => Math.max(0, prev - 2));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // FASE DE ACTUALIZACIÓN: Vigilancia reactiva de combustible
  useEffect(() => {
    if (combustible === 20) {
      console.warn("⚠️ [ACTUALIZACIÓN] Nivel de combustible crítico: 20%");
    } else if (combustible === 0) {
      console.error("🚨 [ACTUALIZACIÓN] Tanque vacío. Motores en inercia.");
    }
  }, [combustible]);

  // useMemo para calcular reactivamente el estado de los motores
  const estadoMotores = useMemo(() => {
    if (combustible > 50) return { texto: "Sistemas Nominales", color: "#4ade80" };
    if (combustible > 20) return { texto: "Consumo Moderado", color: "#facc15" };
    if (combustible > 0) return { texto: "Alerta de Reserva", color: "#f87171" };
    return { texto: "Inercia Espacial", color: "#64748b" };
  }, [combustible]);

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', background: '#090d16', padding: '24px', borderRadius: '12px', color: '#e2e8f0', border: '1px solid #1e293b' }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '16px' }}>🚀 Telemetría de Vuelo Espacial</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div style={{ background: '#1e293b', padding: '14px', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Distancia Recorrida</div>
          <div style={{ fontSize: '1.6rem', color: '#38bdf8', fontWeight: 700 }}>{distancia} AL</div>
        </div>
        <div style={{ background: '#1e293b', padding: '14px', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Combustible ({estadoMotores.texto})</div>
          <div style={{ fontSize: '1.6rem', color: estadoMotores.color, fontWeight: 700 }}>{combustible}%</div>
        </div>
      </div>
    </div>
  );
}

export default PanelControl;