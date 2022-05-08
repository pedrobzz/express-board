/* eslint-disable @typescript-eslint/no-unused-vars */

import { Tooltip } from "@mantine/core";
import React, { useCallback } from "react";

const TableColumn: React.FC<{
  value: string;
}> = ({ value }): JSX.Element => {
  const parseString = useCallback((str: string | Record<string, unknown>) => {
    const string = typeof str === "string" ? str : JSON.stringify(str);
    return {
      base: string,
      string: string.length > 20 ? string.substring(0, 20) + "..." : string,
    };
  }, []);
  const { base, string } = parseString(value);
  return (
    <td>
      {base.length > 20 ? <Tooltip label={base}>{string}</Tooltip> : base}
    </td>
  );
};

export default TableColumn;
