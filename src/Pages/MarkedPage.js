import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { HeaderUrl } from "../constant";
import { useAuth } from "../Contexts/AuthenContext";
import { useSidebarCategory } from "../Contexts/SidebarCategoryContext";
import { db } from "../Firebase/firebaseConfig";

const MarkedPage = () => {
  let idNumber = 1;
  const [dataMarks, setDataMarks] = useState();
  const { userAccount } = useAuth();
  const navigate = useNavigate();
  const { setFocusOneCategory } = useSidebarCategory();

  const handleDeleteMark = async (idMark) => {
    const docRef = doc(db, "marks", idMark);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    setFocusOneCategory([1, 1, 1, 0]);
  }, [setFocusOneCategory]);
  useEffect(() => {
    const colRef = collection(db, "marks");
    const q = query(colRef, where("account", "==", userAccount?.email || ""));
    onSnapshot(q, (snapshot) => {
      let datas = [];
      snapshot.docs.forEach((doc) => {
        datas.push({ idMark: doc.id, ...doc.data() });
      });
      setDataMarks(datas);
    });
  }, [userAccount]);

  return (
    <div className="min-h-screen text-mainColor">
      {userAccount ? (
        <Fragment>
          {dataMarks?.length <= 0 && (
            <h1 className="text-2xl font-semibold text-hoverColorText">
              You have not marked movies or tv shows
            </h1>
          )}

          <table className="w-full mt-10 md:text-xl xs:text-lg">
            <thead>
              <tr>
                <th className="align-middle w-[10%]">Id</th>
                <th className="align-middle w-[20%]">Kind</th>
                <th className="align-middle w-[50%]">Name</th>
                <th className="align-middle w-[20%]">Action</th>
              </tr>
            </thead>
            <tbody className="text-center md:text-xl sm:text-base xs:text-sm">
              {dataMarks?.length > 0 &&
                dataMarks.map((mark) => (
                  <tr
                    key={mark.id}
                    className="border-b-2 border-b-secondaryColorBg"
                  >
                    <td className="align-middle w-[10%]">{idNumber++}</td>
                    <td className="align-middle ">{mark?.kind}</td>
                    <td
                      onClick={() =>
                        navigate(`/details?kind=${mark?.kind}&id=${mark?.id}`)
                      }
                      className="flex items-center justify-start align-middle cursor-pointer"
                    >
                      <div className="w-[20%] md:h-[60px] xs:h-[40px]">
                        <img
                          src={`${HeaderUrl}${mark?.backdrop_path}`}
                          className="object-cover w-full h-full md:rounded-none xs:rounded-lg"
                          alt=""
                        />
                      </div>
                      <div className="flex-1 text-left text-gray-400 md:ml-5 xs:ml-2 line-clamp-1">
                        {mark?.original_title || mark?.original_name}
                      </div>
                    </td>
                    <td className="align-middle w-[20%]">
                      <i
                        onClick={() => handleDeleteMark(mark.idMark)}
                        className="cursor-pointer bx bx-trash hover:text-red-500"
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Fragment>
      ) : (
        <div className="min-h-screen">
          <h1 className="text-2xl font-semibold text-hoverColorText">
            Login to see more
          </h1>
        </div>
      )}
    </div>
  );
};

export default MarkedPage;
