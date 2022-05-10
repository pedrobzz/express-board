import { Menu as MantineMenu, ActionIcon, Checkbox } from "@mantine/core";
import React from "react";

import { HiOutlineChevronUp, HiOutlineChevronDown } from "react-icons/hi";
import { DatabaseColumn } from "../../../../data/interfaces";

const Menu: React.FC<{
  opened: boolean;
  toggleColumnsCallback: (data: string) => void;
  reorderColumns: (column: string, move: number) => void;
  handlers: {
    open: () => void;
    close: () => void;
  };
  columns: DatabaseColumn[];
}> = ({
  opened,
  toggleColumnsCallback,
  reorderColumns,
  handlers,
  columns,
}): JSX.Element => {
  return (
    <MantineMenu
      opened={opened}
      onOpen={handlers.open}
      onClose={handlers.close}
      closeOnItemClick={false}
    >
      <MantineMenu.Label>Columns</MantineMenu.Label>
      {columns.map(column => (
        <MantineMenu.Item
          key={column.name}
          onClick={() => {
            toggleColumnsCallback(column.name);
          }}
          icon={<Checkbox checked={column.viewable} />}
          rightSection={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <ActionIcon
                onClick={e => {
                  console.log("sobe");
                  reorderColumns(column.name, -1);
                  e.stopPropagation();
                }}
              >
                <HiOutlineChevronUp />
              </ActionIcon>
              <ActionIcon
                onClick={e => {
                  console.log("desce");
                  reorderColumns(column.name, 1);
                  e.stopPropagation();
                }}
              >
                <HiOutlineChevronDown />
              </ActionIcon>
            </div>
          }
        >
          <span>{column.name}</span>
        </MantineMenu.Item>
      ))}
    </MantineMenu>
  );
};

export default Menu;
