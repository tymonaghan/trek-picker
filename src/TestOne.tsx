import React from "react";
import { Badge } from "@chakra-ui/react";

const TestOne = ({ planet }) => {
  return (
    <div>
      <h2>
        Goodbye <Badge variant={"subtle"}>{planet}</Badge>
      </h2>
    </div>
  );
};

export default TestOne;
