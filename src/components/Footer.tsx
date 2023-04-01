import styles from "../app.module.css";
import { NavLink } from "react-router-dom"

interface dimensiHeightProps {
    height: number
}

const Footer: React.FC<dimensiHeightProps> = ({ height }) => {
    return (
        <>
            <div className={`${height >= 543 ? "" : styles["container-fixed"]}`}>
                <footer className={styles["container-footer"]}>
                    <div className={styles["parent-footer"]}>
                        <p>© 2023,</p>
                        <NavLink to={"https://safaaat.github.io/"} className={styles["link-footer"]}>
                            Muhammad Safaat
                        </NavLink>
                    </div>
                </footer>
            </div >
        </>
    )
}

export default Footer