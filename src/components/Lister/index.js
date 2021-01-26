import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import getPosts from "../../services/posts";
import Post from "./Post";
import CreatePost from "./CreatePost";

const Lister = () => {
    const [loading, setLoading] = useState(true);
    const [allPosts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then((data) => {
            setLoading(false);
            setPosts(data);
        });
    }, []);

    const onDeletePost = (id) => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
    };
    // Using uuid as we can't rely on the server to AI a unique ID as we're only updating state.
    const onCreatePost = (post) => {
        // Double check the values are definitely not empty.
        if (post.title !== "" && post.body !== "" && post.author !== "") {
            setPosts((prev) => [{ ...post, id: uuidv4() }, ...prev]);
        }
    };

    return loading ? (
        <p>Loading...</p>
    ) : (
        <div className="container">
            <div className="postList">
                {allPosts?.length ? (
                    allPosts.map((post) => (
                        <Post key={post.id} {...post} onDelete={onDeletePost} />
                    ))
                ) : (
                    <p>No posts available...</p>
                )}
            </div>
            <CreatePost onCreate={onCreatePost} />
        </div>
    );
};

export default Lister;
