import React, { useReducer } from "react";

const CreatePost = ({ onCreate }) => {
    const initialState = {
        title: "",
        body: "",
        author: "",
    };

    // Assumes there will only ever be 2 types.
    const postReducer = (state, { type, ...payload }) => {
        if (type === "update") {
            return { ...state, [payload.key]: payload.value };
        }
        return initialState;
    };

    const [{ title, body, author }, dispatch] = useReducer(
        postReducer,
        initialState
    );

    return (
        <form
            className="createPost"
            aria-label="Create post"
            onSubmit={(e) => {
                // use onSubmit for html5 validation purposes.
                e.preventDefault();
                onCreate({ title, body, author });
                dispatch({ type: "reset" });
            }}
        >
            <fieldset>
                <h3>Add new post</h3>
                <ul>
                    <li>
                        <label htmlFor="title">Title</label>
                        <input
                            required
                            type="text"
                            id="title"
                            value={title}
                            onChange={({ target: { value } }) =>
                                dispatch({
                                    type: "update",
                                    key: "title",
                                    value,
                                })
                            }
                        />
                    </li>
                    <li>
                        <label htmlFor="body">Body</label>
                        <textarea
                            required
                            id="body"
                            value={body}
                            onChange={({ target: { value } }) =>
                                dispatch({ type: "update", key: "body", value })
                            }
                        ></textarea>
                    </li>
                    <li>
                        <label htmlFor="author">Author</label>
                        <input
                            required
                            type="text"
                            id="author"
                            value={author}
                            onChange={({ target: { value } }) =>
                                dispatch({
                                    type: "update",
                                    key: "author",
                                    value,
                                })
                            }
                        />
                    </li>
                </ul>

                <button type="submit">Add post</button>
                <button
                    type="button"
                    onClick={() => dispatch({ type: "reset" })}
                >
                    Reset
                </button>
            </fieldset>
        </form>
    );
};

export default CreatePost;
