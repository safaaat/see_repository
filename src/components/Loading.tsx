import styles from "../app.module.css";
import { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "../app/hooks";

const Loading: React.FC = () => {
    const { isLoading } = useAppSelector(state => state.users);
    const [loading, setLoading] = useState(0);

    const loopLoading = useCallback(() => {
        setTimeout(() => {
            setLoading(loading + 1)
        }, 50)

    }, [loading])

    useEffect(() => {
        if (!isLoading) return setLoading(100);
        if (loading < 90) return loopLoading();
    }, [loopLoading, loading, isLoading])

    return (
        <div className={styles["parent-loading"]}>
            <div className={styles["bg-loading"]}>
                <p className={styles["text-loading"]}>{`Loading ${loading}%`}</p>
                <div
                    className={styles["loading"]}
                    style={{ width: `${loading}%` }}
                >
                </div>
            </div>
        </div>
    )
}

export default Loading