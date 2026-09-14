import React, { useEffect } from 'react';

/**
 * Componente Planeta
 * Diseñado explícitamente para ilustrar el Ciclo de Vida:
 * 1. MONTAJE: useEffect con [] ejecuta el console.log inicial al aparecer en el DOM.
 * 2. DESMONTAJE: La función de retorno (cleanup) se ejecuta justo antes de retirarlo del DOM.
 */
function Planeta({ nombre, clima = "Templado", index, onDespegar }) {
  useEffect(() => {
    console.log(`🪐 [MONTAJE] ¡El planeta ${nombre} ha aparecido en el radar!`);

    return () => {
      console.log(`🚀 [DESMONTAJE] ¡La nave ha despegado y el planeta ${nombre} ha desaparecido!`);
    };
  }, [nombre]);

  return (
    <div className="planeta-card">
      <div style={{ fontSize: '2rem', marginBottom: '6px' }}>🪐</div>
      <h4 style={{ color: '#38bdf8', fontSize: '1rem', marginBottom: '4px' }}>{nombre}</h4>
      <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Clima: {clima}</p>
      <button
        onClick={() => onDespegar(index)}
        style={{
          marginTop: '10px',
          background: 'rgba(239, 68, 68, 0.2)',
          color: '#f87171',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          padding: '4px 10px',
          fontSize: '0.72rem'
        }}
      >
        Despegar / Salir
      </button>
    </div>
  );
}

export default Planeta;