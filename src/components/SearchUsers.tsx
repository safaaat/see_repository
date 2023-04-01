import styles from "../app.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import type { FormEvent } from "react";
import { callGetUsers } from "../features/counter/getUser";
import { resetLoadingAndSuccess } from "../features/counter/getUser";

const SearchUsers: React.FC = () => {
    const [input, setInput] = useState("");
    const dispatch = useAppDispatch()

    // clear input search users
    const clearInput = (): void => {
        if (input.length > 0) return setInput("")
    }

    // Form submit search username
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        // prevent the browser from reloading on submit
        event.preventDefault()
        // If the input form is not empty, getUserByUsername
        if (input.length > 0) {
            dispatch(resetLoadingAndSuccess())
            return dispatch(callGetUsers(input))
        }
    }

    return (
        <>
            <form onSubmit={event => onSubmit(event)}>
                <div className={styles["parent-input"]}>
                    {/* Icon Close Input */}
                    <IoCloseOutline
                        className={`${input.length === 0 ? styles["icon-input"] : styles["icon-input-active"]}`}
                        onClick={() => clearInput()}
                    />
                    {/* Input Search Users */}
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Enter username"
                        value={input}
                        onChange={(input) => setInput(input.target.value)}
                    />
                </div>
                {/* Button Submit */}
                <button
                    onClick={() => onSubmit}
                    className={`
                        ${styles["button-submit"]}
                        // When the input is entered, the style is active, when the input is empty, the style is hidden 
                        ${input.length !== 0 ? styles.active : styles.hidden}
                    `}
                >
                    Search
                </button>
            </form>
        </>
    )
}

export default SearchUsers