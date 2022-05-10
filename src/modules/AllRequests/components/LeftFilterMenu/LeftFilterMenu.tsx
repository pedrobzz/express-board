import Menu from "./Menu";
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Burger, Accordion } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { DatabaseColumn } from "../../../../data/interfaces";

/* import { Container } from "./styles"; */

const LeftFilterMenu: React.FC<{
  toggleColumnsCallback: (data: string) => void;
  reorderColumns: (column: string, move: number) => void;
  columns: DatabaseColumn[];
}> = ({ columns, toggleColumnsCallback, reorderColumns }): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const [opened, handlers] = useDisclosure(false);

  return (
    <div
      style={{
        width: expanded ? 300 : 50,
        transition: "0.25s",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: expanded ? "space-between" : "center",
        }}
      >
        <Burger
          opened={expanded}
          onClick={() => setExpanded(o => !o)}
          title={"Toggle Filter Menu"}
        />
        {expanded && (
          <Menu
            handlers={handlers}
            opened={opened}
            columns={columns}
            toggleColumnsCallback={toggleColumnsCallback}
            reorderColumns={reorderColumns}
          />
        )}
      </div>
      {expanded && (
        <Accordion>
          {columns.map(column => (
            <Accordion.Item key={column.name} label={column.name}>
              {column.name}
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default LeftFilterMenu;
