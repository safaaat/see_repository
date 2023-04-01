import SearchUsers from "../components/SearchUsers";
import styles from "../app.module.css";
import DisplayUsers from "../components/DisplayUsers";
import { useRef, useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";

interface dimensiHeightProps {
    addHeight(height: number): void
}

const Home: React.FC<dimensiHeightProps> = ({ addHeight }) => {
    const [idUsersActive, setIdUsersActive] = useState(0)
    const { isLoading } = useAppSelector(state => state.users);
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let height: any = ref.current?.clientHeight;
        addHeight(height)
        if (ref.current !== null || isLoading === false) {
            addHeight(height)
        }
    }, [addHeight, isLoading, ref.current?.clientHeight, idUsersActive])

    return (
        <>
            <div className={styles.container} ref={ref}>
                {/* Fiture Search Users */}
                <SearchUsers />
                <hr className={styles.line} />
                {/* Display Users */}
                <DisplayUsers idUsers={setIdUsersActive} />
            </div>
        </>
    )
}

export default Home