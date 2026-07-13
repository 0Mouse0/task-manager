export function esCorreoValido(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(correo)
}
export function contarTareasPendientes(tareas) {
    return tareas.filter((t) => !t.completada).length
}

// ! Simulación de bug

/* export function esCorreoValido(correo) {
    // BUG: esta regex solo exige un @, pero no exige un dominio con punto
    const regex = /^[^\s@]+@[^\s@]+$/
    return regex.test(correo)
} */
