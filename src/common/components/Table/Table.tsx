/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback, useState } from "react";
import { Table as MantineTable, Tooltip } from "@mantine/core";
import { RequestEntity } from "../../../data";
import TableColumn from "./TableColumn";
import { Container } from "./styles";

const Table: React.FC<{
  columns: string[];
  data: RequestEntity[];
}> = ({ columns, data }): JSX.Element => {
  return (
    <Container className="table">
      <MantineTable striped highlightOnHover>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(request => (
            <tr key={request.id}>
              {columns.map(column => (
                <TableColumn
                  key={[column, request.id].join("-")}
                  value={request[column]}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </MantineTable>
    </Container>
  );
};

export default Table;
