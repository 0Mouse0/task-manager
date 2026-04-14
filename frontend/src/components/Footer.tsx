import "../styles/Footer.css"

function Footer() {
    return (
        <footer className="footer">
        <p>Task Manager - Mauricio © {new Date().getFullYear()}</p>
        </footer>
    );
}

export default Footer;