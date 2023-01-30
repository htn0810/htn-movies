import React, { useEffect, useState } from "react";
import { APIkey } from "../../constant";
import PropTypes from "prop-types";

const DetailsDirector = ({ data, kind }) => {
  const [directorName, setDirectorName] = useState("");
  const ProductionCompanies = data?.production_companies.slice(0, 2);
  const endpoint =
    !!kind &&
    !!data &&
    `https://api.themoviedb.org/3/${kind}/${data?.id}/credits?${APIkey}`;
  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setDirectorName(data?.crew[0]?.name);
      });
  }, [endpoint]);
  return (
    <div className="w-full h-full">
      <div className="w-full sm:px-3 xs:px-0  py-5 border-b-2 border-b-categoryOverlay lg:text-[20px]  md:text-[16px]  sm:text-[14px] xs:text-[12px] lg:leading-[30px] sm:leading-[26px] xs:leading-[20px] font-medium">
        <span className="text-mainColor">Director:</span>
        <span className="lg:ml-5 xs:ml-2 text-primarySidebarText ">
          {directorName || "Unknown"}
        </span>
      </div>
      <div className="w-full sm:px-3 xs:px-0  py-5 border-b-2 border-b-categoryOverlay lg:text-[20px] md:text-[16px] sm:text-[14px] xs:text-[12px] lg:leading-[30px] sm:leading-[26px] xs:leading-[20px] font-medium">
        <span className="lg:mr-5 xs:mr-2 text-mainColor">
          Production comapny:
        </span>
        {ProductionCompanies?.length > 0 &&
          ProductionCompanies.map((company) => (
            <span
              key={company?.name}
              className="inline-block mr-2 text-primarySidebarText"
            >
              {company?.name}
            </span>
          ))}
      </div>
      <div className="w-full sm:px-3 xs:px-0  py-5 border-b-2 border-b-categoryOverlay lg:text-[20px] md:text-[16px]  sm:text-[14px] xs:text-[12px] lg:leading-[30px] sm:leading-[26px] xs:leading-[20px] font-medium">
        <span className="lg:mr-5 xs:mr-2 text-mainColor">Country:</span>
        {data?.production_countries.length > 0 &&
          data?.production_countries.map((country) => (
            <span key={country?.name} className="mr-2 text-primarySidebarText">
              {country?.name}
            </span>
          ))}
      </div>
    </div>
  );
};

DetailsDirector.propTypes = {
  data: PropTypes.object,
  kind: PropTypes.string,
};

export default DetailsDirector;
