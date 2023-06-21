import React, { FC } from "react";
import parse from 'html-react-parser';

export interface SubSingleContenDemotProps {
    data: string;
}

const SubSingleContentDemo: FC<SubSingleContenDemotProps> = ({ data }) => {
    return (
      <>
        {/* THIS IS THE DEMP CONTENT */}
        {/* IF YOUR DATA IS JSON, YOU CAN USE render with html-react-parser (https://www.npmjs.com/package/html-react-parser) */}
        {parse(data)}
      </>
    );
};

export default SubSingleContentDemo;
