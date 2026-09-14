import React, { useState, useEffect, useMemo } from 'react';
import Planeta from './Planeta.jsx'
import Bitacora from './Bitacora.jsx'
import './Explorador.css';

const planetasPredeterminados = [
  { nombre: "Tierra", clima: "Templado", descripcion: "Planeta natal" },
  { nombre: "Marte", clima: "Rocoso", descripcion: "Planeta rojo" }
];

function PanelControl() {
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En órbita");
  const [volando, setVolando] = useState(false);
  const [planetasVisitados, setPlanetasVisitados] = useState(() => {
    const local = localStorage.getItem("bitacora_espacial_react");
    return local ? JSON.parse(local) : planetasPredeterminados;
  });
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 19)]);
  };

  // 1. CICLO DE VIDA: Montaje y Desmontaje del Panel
  useEffect(() => {
    console.log("🚀 [MONTAJE] ¡El panel de control está listo!");
    addLog("Sistemas encendidos: ¡El panel de control está listo!");

    return () => {
      console.log("🛑 [DESMONTAJE] El panel de control se ha apagado.");
    };
  }, []);

  // 2. CICLO DE VIDA: Simulación de Vuelo con Intervalo y Cleanup
  useEffect(() => {
    let intervalo = null;

    if (volando && combustible > 0) {
      setEstadoNave("Navegando a hipervelocidad");
      intervalo = setInterval(() => {
        setDistancia((d) => d + 250);
        setCombustible((c) => {
          if (c <= 5) {
            setVolando(false);
            setEstadoNave("Sin combustible");
            addLog("ALERTA CRÍTICA: ¡Combustible agotado! Nave detenida.");
            return 0;
          }
          return c - 5;
        });
      }, 1000);
    }

    return () => {
      if (intervalo) {
        clearInterval(intervalo);
        console.log("⏱️ [CLEANUP] Intervalo de vuelo limpiado correctamente.");
      }
    };
  }, [volando, combustible]);

  // 3. CICLO DE VIDA: Actualización de Combustible
  useEffect(() => {
    console.log(`⛽ [ACTUALIZACIÓN] Nivel de combustible: ${combustible}%`);
    if (combustible > 0 && combustible <= 20) {
      addLog(`⚠️ ALERTA: Combustible bajo (${combustible}%). Considera recargar.`);
    }
  }, [combustible]);

  // 4. Persistencia en LocalStorage
  useEffect(() => {
    localStorage.setItem("bitacora_espacial_react", JSON.stringify(planetasVisitados));
  }, [planetasVisitados]);

  // 5. useMemo: Mensaje de Estado optimizado
  const mensajeEstado = useMemo(() => {
    console.log("⚡ [useMemo] Calculando mensaje de estado de la nave...");
    if (combustible === 0) return "⚠️ EMERGENCIA: NAVE VARADA";
    if (estadoNave.includes("hipervelocidad")) return "🛸 PROPULSORES ACTIVOS AL 100%";
    if (estadoNave === "Aterrizado") return "🌍 ANCLAJE PLANETARIO SEGURO";
    return "🛰️ SISTEMAS EN ESPERA - ÓRBITA ESTABLE";
  }, [estadoNave, combustible]);

  const toggleVuelo = () => {
    if (combustible <= 0) {
      alert("No hay combustible disponible. Por favor recarga.");
      return;
    }
    const nuevoEstado = !volando;
    setVolando(nuevoEstado);
    if (nuevoEstado) {
      addLog("Motores de curvatura activados.");
    } else {
      setEstadoNave("En órbita");
      addLog("Motores apagados. Regresando a órbita estable.");
    }
  };

  const recargarCombustible = () => {
    setCombustible(100);
    setEstadoNave("En órbita");
    addLog("Tanque de deuterio recargado al 100%.");
  };

  const registrarPlaneta = (nuevoPlaneta) => {
    setPlanetasVisitados([...planetasVisitados, nuevoPlaneta]);
    setVolando(false);
    setEstadoNave("Aterrizado");
    addLog(`Aterrizaje exitoso en ${nuevoPlaneta.nombre}.`);
  };

  const descolarPlaneta = (index) => {
    const planetaEliminado = planetasVisitados[index];
    setPlanetasVisitados(planetasVisitados.filter((_, i) => i !== index));
    addLog(`Despegando y dejando atrás el planeta ${planetaEliminado.nombre}.`);
  };

  const fuelColor = combustible > 50 ? '#22c55e' : combustible > 20 ? '#eab308' : '#ef4444';

  return (
    <div className="espacio-panel">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#38bdf8', fontSize: '1.8rem', letterSpacing: '1px' }}>
          🚀 PANEL DE TELEMETRÍA ESPACIAL
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
          Simulación del Ciclo de Vida: Montaje, Actualización y Desmontaje con Hooks
        </p>
      </div>

      <div className="telemetria-grid">
        <div className="telemetria-box">
          <div className="telemetria-val">{distancia.toLocaleString()} km</div>
          <div className="telemetria-label">Distancia Recorrida</div>
        </div>

        <div className="telemetria-box">
          <div className="telemetria-val" style={{ color: fuelColor }}>
            {combustible}%
          </div>
          <div className="telemetria-label">Combustible Restante</div>
          <div className="fuel-gauge">
            <div
              className="fuel-fill"
              style={{ width: `${combustible}%`, backgroundColor: fuelColor }}
            />
          </div>
        </div>

        <div className="telemetria-box">
          <div className="telemetria-val" style={{ fontSize: '1.2rem', color: '#a855f7' }}>
            {estadoNave}
          </div>
          <div className="telemetria-label">Estado de Nave</div>
        </div>
      </div>

      <div style={{
        background: '#0284c715',
        border: '1px solid #0284c740',
        borderRadius: '8px',
        padding: '10px 16px',
        marginBottom: '20px',
        textAlign: 'center',
        color: '#7dd3fc',
        fontSize: '0.9rem',
        fontWeight: 600
      }}>
        📡 {mensajeEstado}
      </div>

      <div className="panel-controls">
        <button
          onClick={toggleVuelo}
          className={`btn-nave ${volando ? 'btn-aterrizar' : 'btn-vuelo'}`}
        >
          {volando ? "⏸️ Detener Vuelo" : "🚀 Iniciar Vuelo"}
        </button>

        <button onClick={recargarCombustible} className="btn-nave btn-recargar">
          ⚡ Recargar Combustible
        </button>
      </div>

      <h3 style={{ color: '#f8fafc', fontSize: '1.1rem', marginTop: '30px' }}>
        🪐 Planetas Descubiertos en el Radar ({planetasVisitados.length})
      </h3>

      <div className="planetas-grid">
        {planetasVisitados.map((p, idx) => (
          <Planeta
            key={`${p.nombre}-${idx}`}
            nombre={p.nombre}
            clima={p.clima}
            index={idx}
            onDespegar={descolarPlaneta}
          />
        ))}
      </div>

      <Bitacora onRegistrarPlaneta={registrarPlaneta} />

      <div style={{ marginTop: '24px' }}>
        <h4 style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>
          📟 REGISTRO DE EVENTOS DEL SISTEMA:
        </h4>
        <div className="log-consola">
          {logs.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PanelControl;