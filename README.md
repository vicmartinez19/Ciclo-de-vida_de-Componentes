# Actividad 4: El Viaje del Explorador Espacial (Ciclo de Vida con Hooks)

## 📌 Descripción del Proyecto
Este taller espacial simula el panel de telemetría de una nave de exploración para comprender a fondo las etapas del ciclo de vida en componentes funcionales de React:
1. **Montaje:** Inicialización de recursos y temporizador `setInterval` con `useEffect(() => {}, [])`.
2. **Actualización:** Monitoreo reactivo de combustible con `useEffect(() => {}, [combustible])`.
3. **Desmontaje y Limpieza (Cleanup):** Detención del intervalo con `clearInterval` y registro de desmontaje en `Planeta.jsx`.
4. **Optimización con `useMemo`:** Cálculo reactivo del estado de los motores.
5. **Reto "Bitácora de Exploración":** Registro interactivo de planetas descubiertos y persistencia en `localStorage`.
