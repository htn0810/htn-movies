import React, { useState, useEffect, Fragment } from "react";
import { HeaderUrl } from "../../constant";
import SliderCategory from "../mainSlider/SliderCategory";

import PropTypes from "prop-types";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";
import { useAuth } from "../../Contexts/AuthenContext";
import { toast } from "react-toastify";

const DetailsBanner = ({ data, kind }) => {
  const [marked, setMarked] = useState(false);
  const [markedUpdate, setMarkedUpdate] = useState(false);
  const { userAccount } = useAuth();

  const handleSetMarked = () => {
    if (userAccount) {
      setMarkedUpdate(true);
      toast.success("Marked successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.warning("You need to login!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    async function handleUpdateMarked() {
      const colRef = collection(db, "marks");
      if (markedUpdate) {
        await addDoc(colRef, {
          ...data,
          account: userAccount?.email,
          kind: kind,
        });
      }
    }
    handleUpdateMarked();
  }, [data, kind, markedUpdate, userAccount?.email]);
  useEffect(() => {
    if (data && userAccount) {
      const colRef = collection(db, "marks");
      const q = query(
        colRef,
        where("id", "==", data?.id),
        where("account", "==", userAccount?.email)
      );
      // console.log(q);
      onSnapshot(q, (snapshot) => {
        let marks = [];
        snapshot.docs.forEach((doc) => {
          marks.push({
            id: doc.id,
            account: userAccount?.email,
            ...doc.data(),
          });
        });
        if (marks.length > 0) {
          setMarked(true);
          setMarkedUpdate(false);
        } else {
          setMarked(false);
        }
      });
    }
  }, [data, kind, userAccount]);

  return (
    <Fragment>
      <img
        className="object-cover w-full h-full rounded-lg"
        src={`${HeaderUrl}${data?.backdrop_path}`}
        alt=""
      />
      <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-t from-[rgba(0,0,0,0.85)] to-[rgba(0,0,0,0.1)] rounded-lg"></div>
      <div className="absolute md:w-[90%] xs:w-full flex md:justify-start md:items-start md:flex-row xs:flex-col xs:items-center xs:justify-center rounded-lg md:left-[48%] md:bottom-[37%] md:-translate-y-full md:-translate-x-1/2 xs:left-1/2 xs:top-1/2 xs:-translate-x-1/2">
        <img
          className="object-cover md:w-[200px] md:h-[250px] sm:w-[180px] sm:h-[230px] xs:w-[150px] xs:h-[200px] rounded-lg shadow-2xl xs:shadow-slate-700 md:shadow-none"
          src={`${HeaderUrl}${data?.poster_path}`}
          alt=""
        />
        <div className="flex flex-col md:py-5 xs:py-2 md:ml-7 xs:ml-0">
          <h1 className="lg:text-[40px] lg:leading-[50px] md:text-[34px] md:leading-[44px] md:text-left xs:text-center xs:text-[30px] xs:leading-[40px]  font-semibold text-hoverColorText">
            {data?.original_name || data?.original_title}
          </h1>
          <div className="w-full md:mt-5 xs:mt-2 md:flex-none md:justify-start xs:flex xs:justify-center">
            <SliderCategory dataId={data?.id}></SliderCategory>
          </div>
          <div className="w-full lg:text-[30px] md:text-[24px] xs:text-[20px] text-mainColor leading-[38px] flex items-center xs:justify-center md:justify-start md:mt-5 xs:mt-2">
            <i className="mr-5 cursor-pointer bx bx-heart"></i>
            {!marked ? (
              <i
                onClick={handleSetMarked}
                className="mr-5 cursor-pointer bx bx-bookmark"
              ></i>
            ) : (
              <i className="mr-5 cursor-pointer bx text-hoverColorText bxs-bookmark"></i>
            )}
            <i className="mr-5 cursor-pointer bx bx-share-alt"></i>
            <div className="font-medium lg:text-[30px] md:text-[24px] xs:text-[20px] items-center flex leading-[38px] md:mr-5 xs:mr-0">
              <i className="mr-[10px] bx bxs-star text-[#F0CB35]"></i>
              <span className="mr-1 text-mainColor">
                {data?.vote_average.toFixed(1)}
              </span>
              <span className="mr-1 text-[20px] leading-[30px] font-medium text-grayDarkText">
                |
              </span>
              <span className="lg:text-[20px] md:text-[18px] xs:text-[16px] leading-[30px] font-medium text-grayDarkText">
                {data?.vote_count}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

DetailsBanner.propTypes = {
  data: PropTypes.object,
  kind: PropTypes.string,
};

export default DetailsBanner;
