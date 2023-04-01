import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import EnterUsername from "../assets/images/image-enter-username.svg";
import styles from "../app.module.css";
import Loading from "./Loading";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import EmptyRepo from "../assets/images/emptyRepo.svg";
import { resetUsers } from "../features/counter/getUser";

interface RepoProps {
    data: any,
    css: string
}
export interface idUsersProps {
    idUsers(id: number): void
}

const Repositories: React.FC<RepoProps> = ({ data, css }) => {
    return (
        <>
            {data.repositorie.length !== 0
                ? (
                    <div className={`${styles["parent-repo"]}`}>
                        <div className={`${styles["parent-repo"]} ${styles[`${css}`]}`}>
                            {data.repositorie?.map((repo: any) => (
                                <div
                                    key={repo.id}
                                    className={styles.repo}
                                >

                                    <div className={styles["parent-text-repo"]}>
                                        <h4 className={styles["judul-repo"]}>{repo.name}</h4>
                                        <p className={styles["des-repo"]}>
                                            {`${!repo.description ? "No description" : repo.description}`}
                                        </p>
                                    </div>

                                    <div className={styles.star}>
                                        <span>{repo.stargazers_count}</span>
                                        <AiFillStar />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
                : (
                    <div className={`${styles["parent-repo"]}`}>
                        <div className={styles[`${css}`]}>
                            <div className={styles["empty-repo"]}>
                                <p className={styles["text-img-empty"]}>The {data.users} repository is empty</p>
                                <img src={EmptyRepo} alt="empty-repo" className={styles["img-repo"]} />
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

const Display: React.FC<idUsersProps> = ({ idUsers }) => {
    const { users } = useAppSelector(state => state.users);
    const [activeRepo, setActiveRepo] = useState(0);
    const [styleCss, setStyleCss] = useState("slide-in-top");

    const updateActive = (value: number) => {
        if (activeRepo === value) {
            setStyleCss("slide-out-top");
            setTimeout(() => {
                setActiveRepo(0)
                idUsers(0)
                return setStyleCss("slide-in-top");
            }, 300);
        }

        if (activeRepo === 0) {
            setActiveRepo(value);
            return idUsers(value);
        }

        if (activeRepo !== value) {
            setStyleCss("slide-out-top");
            setTimeout(() => {
                setActiveRepo(value);
                idUsers(value);
                return setStyleCss("slide-in-top");
            }, 300);
        }
    }

    return (
        <div className={styles["parent-user"]}>
            {users?.map((data) => (
                <div key={data.id}>
                    <div
                        className={styles["user-display"]}
                        onClick={() => updateActive(data.id)}
                    >
                        <p className={styles["username"]}>{data.users}</p>
                        {activeRepo === data.id
                            ? <MdOutlineArrowDropUp className={styles["icon-arrow"]} />
                            : <MdOutlineArrowDropDown className={styles["icon-arrow"]} />
                        }
                    </div>

                    {activeRepo === data.id && (
                        <Repositories data={data} css={styleCss} />
                    )}
                </div>
            ))}
        </div>
    )
}

const DisplayUsers: React.FC<idUsersProps> = ({ idUsers }) => {
    const { users, isLoading, error } = useAppSelector(state => state.users);
    const [onOffLoading, setOnOffLoading] = useState(false);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => {
                return setOnOffLoading(isLoading);
            }, 600);
        }
        if (isLoading) return setOnOffLoading(isLoading);

        // Check jika error
        if (error.status === 404 || error.status === 403) {
            dispatch(resetUsers())
        }
    }, [isLoading, error.status, dispatch])

    return (
        <>
            {/* Error 403 limited Api's  */}
            {error.status === 403 && (
                <div className={styles.error}>
                    <h1 className={styles["judul-error"]}>{error.status}</h1>
                    <p className={styles["text-error"]}>{error.data.message}</p>
                </div>
            )}
            {/* Error 404, Users not found */}
            {error.status === 404 && (
                <div className={styles.error}>
                    <h1 className={styles["judul-error"]}>{error.status}</h1>
                    <p className={styles["text-error"]}>User not found</p>
                </div>
            )}

            {/* display when users is empty */}
            {users?.length === 0 && error.status !== 404 && error.status !== 403 && (
                <div className={styles["parent-img-users"]}>
                    <img src={EnterUsername} alt="Enter_Username" className={styles["image-svg-display-users"]} />
                </div>
            )}

            {/* Display Users Search */}
            {users?.length !== 0 && (
                <Display idUsers={idUsers} />
            )}

            {/* Loading */}
            {onOffLoading && (
                <Loading />
            )}
        </>
    )
}

export default DisplayUsers