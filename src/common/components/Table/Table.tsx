/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback, useState } from "react";
import { Table as MantineTable, Tooltip } from "@mantine/core";
import { RequestEntity } from "../../../data";
import TableColumn from "./TableColumn";

/* import { Container } from "./styles"; */

const Table: React.FC<{
  columns: string[];
  data: RequestEntity[];
}> = ({ columns, data }): JSX.Element => {
  const [viewableColumns, setViewableColumns] = useState(columns);
  const parseString = useCallback((str: string | Record<string, unknown>) => {
    const string = typeof str === "string" ? str : JSON.stringify(str);
    return {
      base: string,
      string: string.length > 20 ? string.substring(0, 20) + "..." : string,
    };
  }, []);
  return (
    <MantineTable striped highlightOnHover>
      <thead>
        <tr>
          {viewableColumns.map(column => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(request => (
          <tr key={request.id}>
            {viewableColumns.map(column => (
              <TableColumn
                key={[column, request.id].join("-")}
                value={request[column]}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </MantineTable>
  );
};

export default Table;
