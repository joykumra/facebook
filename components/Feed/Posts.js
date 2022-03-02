import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { collection } from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";
import Post from "./Post";

function Posts() {
  const [value, loading, error] = useCollection(
    query(collection(db, "data"), orderBy("timestamp", "desc"))
  );

  return (
    <div>
      {value &&
        value.docs.map((post) => (
          <Post
            key={post.id}
            name={post.data().name}
            email={post.data().email}
            message={post.data().message}
            image={post.data().image}
            timestamp={post.data().timestamp}
            postImage={post.data().postImage}
          ></Post>
        ))}
    </div>
  );
}

export default Posts;
