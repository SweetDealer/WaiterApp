import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import styles from './NavBar.module.css'

const NavBar = () => {
    return <Nav className={styles.NavBar}>
        <span className={styles.NavBarLogo}>Waiter.app</span>
        <Nav.Link className={styles.NavBarLink} as={NavLink} to="/">Home</Nav.Link>
    </Nav>
}

export default NavBar;