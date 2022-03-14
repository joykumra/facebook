import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  VideoCameraIcon,
  CameraIcon,
  EmojiHappyIcon,
} from "@heroicons/react/solid";
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";

function InputBox() {
  const { data: session } = useSession();
  const inpuRef = useRef(null);
  const imageRef = useRef(null);

  const [imageToPost, setImageToPost] = useState(null);

  const postSubmitHandler = async (e) => {
    e.preventDefault();

    if (!inpuRef.current.value) return;

    // AUTHENTICATION DATA TO BE STORED IN FIREBASE DB
    const data = {
      message: inpuRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: serverTimestamp(),
    };

    // ADD DOCUMENT TO COLLECTION AND STORING DATA IN DB
    const docRef = await addDoc(collection(db, "data"), data);

    // STORING IMAGES IN FIREBASE STORAGE
    if (imageToPost) {
      const storageRef = ref(storage, `posts/${docRef.id}`);

      // STORE IMAGE IN STORAGE AS DATA_URL
      await uploadString(storageRef, imageToPost, "data_url");

      removeImageHandler();

      // GET IMAGE URL FROM FIREBASE STORAGE
      const url = await getDownloadURL(storageRef, (err) => console.log(err));

      // PUSH STORED IMAGE IN FIREBASE DB
      await setDoc(
        doc(db, "data", docRef.id),
        {
          postImage: url,
        },
        { merge: true }
      );
    }

    inpuRef.current.value = "";
  };

  const addImageToPostHandler = (e) => {
    const reader = new FileReader();

    // READ IMAGE AS URL
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    // STORE IMAGE AS URL
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImageHandler = () => {
    setImageToPost(null);
  };

  return (
    <div className="p-2 mt-6 rounded-2xl font-medium text-gray-500 bg-white shadow-md">
      <div className="flex items-center space-x-4 p-4">
        <Image
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        ></Image>
        <form className="flex flex-1">
          <input
            className="flex-grow rounded-full h-12 px-5 bg-gray-100 focus:outline-none"
            type="text"
            placeholder={`What's on your mind, ${session.user.name}`}
            ref={inpuRef}
          ></input>
          <button hidden type="submit" onClick={postSubmitHandler}>
            Submit
          </button>
        </form>

        {imageToPost && (
          <div
            onClick={removeImageHandler}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img
              className="h-10 object-contain"
              src={imageToPost}
              alt="post"
            ></img>
          </div>
        )}
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500"></VideoCameraIcon>
          <p className="text-xs sm:text-sm xl:text-base whitespace-nowrap">
            Live Video
          </p>
        </div>
        <div onClick={() => imageRef.current.click()} className="inputIcon">
          <CameraIcon className="h-7 text-green-400"></CameraIcon>
          <p className="text-xs sm:text-sm xl:text-base whitespace-nowrap">
            Photo/Video
          </p>
          <input
            hidden
            type="file"
            onChange={addImageToPostHandler}
            ref={imageRef}
          ></input>
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300"></EmojiHappyIcon>
          <p className="text-xs sm:text-sm xl:text-base whitespace-nowrap">
            Feeling/Activity
          </p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
