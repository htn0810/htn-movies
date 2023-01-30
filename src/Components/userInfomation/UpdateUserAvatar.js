import { doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../Contexts/AuthenContext";
import { db } from "../../Firebase/firebaseConfig";

const UpdateUserAvatar = ({ userData, setUserData }) => {
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  let { userAccount, setUserAccount } = useAuth();

  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setIsLoading(true);
        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused");
            break;
          case "running":
            // console.log("Upload is running");
            break;
          default:
            throw new Error("Not found files");
        }
      },
      (error) => {
        // console.log(error);
        setImage("");
        toast.warning("Something went wrong!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
        toast.success("Update info successfull!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setIsLoading(false);
      }
    );
  };

  const handleDeleteImage = () => {
    const storage = getStorage();
    const imageRef = ref(storage, "images/" + userData?.imageName);
    deleteObject(imageRef)
      .then(() => {
        // console.log("File deleted successfully");
        setImage("");
      })
      .catch((error) => {
        // console.log("Uh-oh, an error occurred!");
        setImage("");
      });
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (userData?.imageName) {
      handleDeleteImage(userData?.imageName);
    }
    setImageName(file.name);
    handleUploadImage(file);
  };

  useEffect(() => {
    async function updateAvatar(img, name) {
      const docRef = doc(db, "users", userData?.id);
      await updateDoc(docRef, {
        ...userData,
        avatar: img,
        imageName: name,
      });
      setUserData({ ...userData, avatar: img, imageName: name });
      setUserAccount({ ...userAccount, avatar: img });
    }
    updateAvatar(image, imageName);
  }, [image, imageName, setUserAccount, setUserData, userAccount, userData]);
  return (
    <Fragment>
      <div className="lg:w-[200px] lg:h-[200px] sm:w-[180px] sm:h-[180px] xs:w-[150px] xs:h-[150px]  bg-black rounded-full mb-10 ">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full rounded-full">
            <div className="w-[30px] h-[30px] border-4 border-hoverColorText border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <img
            className="object-cover w-full h-full rounded-full"
            src={userData?.avatar || `avatar-user-isAuthen.svg`}
            alt="avatar"
          />
        )}
      </div>
      <label className="relative">
        <div
          className={`relative flex items-center justify-center md:px-5 xs:px-3 py-3  text-center rounded-lg ${
            isLoading ? "cursor-none" : "cursor-pointer"
          } bg-hoverColorBg`}
        >
          <i className="mr-5 bx bx-cloud-upload"></i>
          <span className="font-semibold md:text-xl xs:text-lg">
            Upload new avatar
          </span>
          <input
            type="file"
            className="absolute w-[1px] h-[1px] overflow-hidden"
            onChange={handleSelectImage}
          />
        </div>
      </label>
    </Fragment>
  );
};

export default UpdateUserAvatar;
