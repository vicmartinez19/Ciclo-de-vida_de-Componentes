import React from 'react';
import PanelControl from './components/PanelControl.jsx'

function App() {
  return (
    <div style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'inline-block', padding: '6px 14px', background: '#a855f7', color: '#fff', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '12px' }}>
          MÓDULO 4: ACTIVIDAD 4
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px' }}>
          Ciclo de Vida de Componentes en React
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '650px' }}>
          Exploración visual del <strong>Montaje</strong>, <strong>Actualización</strong> y <strong>Desmontaje (Cleanup)</strong> utilizando <code>useEffect</code> y <code>useMemo</code>.
        </p>
      </header>

      <PanelControl />

      <footer style={{ marginTop: '50px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
        React + Vite + GitHub Pages | Explorador Espacial y Bitácora
      </footer>
    </div>
  );
}

export default App;
```