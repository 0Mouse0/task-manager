import "../styles/EmptyState.css"

function EmptyState() {
    return (
        <div className="empty-state">
        <h2>Aún no tienes tareas registradas</h2>
        <p>Agrega alguna para comenzar</p>
        </div>
    );
}

export default EmptyState;