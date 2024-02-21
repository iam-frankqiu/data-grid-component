import { PaymentType, SortOrderType } from "@/types";
import { ReactNode, memo } from "react";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";

type ColumnType = {
  title: string;
  key: string;
  showSort?: boolean;
};

type DataGridProps<T> = {
  data: T[];
  columns: ColumnType[];
  className?: string;
  sortAttribute?: string;
  setSortAttribute: Function;
  sortOrder?: SortOrderType;
  setSortOrder: Function;
};

export const DataGrid = memo(function DataGrid<T extends object>({
  data,
  columns,
  className,
  sortAttribute,
  setSortAttribute,
  sortOrder,
  setSortOrder,
}: DataGridProps<T>) {
  const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
    const item: T = data[rowIndex];
    const attribute = columns[columnIndex]?.key;

    return (
      <div className="flex justify-start items-center" style={style}>
        {item[attribute as keyof T] as ReactNode}
      </div>
    );
  };

  const handleSort = (attribute: string, order: SortOrderType)=> {
    setSortAttribute(attribute)
    setSortOrder(order)
  }

  return (
    <div className={className}>
      <div className="flex justify-between items-center h-[48px]">
        {columns.map((item) => (
          <div
            key={item.key}
            className="w-[250px] flex justify-start items-center h-full"
          >
            <span className="mr-[4px]">{item.title}</span>
            {item.showSort && (
              <div>
                <svg
                  viewBox="0 0 1024 1024"
                  focusable="false"
                  data-icon="caret-up"
                  width="12px"
                  height="12px"
                  fill={
                    item.key === sortAttribute && sortOrder === "asc"
                      ? "#1677ff"
                      : ""
                  }
                  aria-hidden="true"
                  onClick={() => handleSort(item.key, 'asc')}
                  className="cursor-pointer"
                >
                  <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                </svg>

                <svg
                  viewBox="0 0 1024 1024"
                  focusable="false"
                  data-icon="caret-down"
                  width="12px"
                  height="12px"
                  fill={
                    item.key === sortAttribute && sortOrder === "desc"
                      ? "#1677ff"
                      : ""
                  }
                  onClick={() => handleSort(item.key, 'desc')}
                  aria-hidden="true"
                  className="cursor-pointer"
                >
                  <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="w-full flex justify-center items-center h-[80px]">
          No Data Available
        </div>
      )}
      {data.length > 0 && (
        <Grid
          columnCount={4}
          columnWidth={250}
          height={200}
          rowCount={data.length}
          rowHeight={35}
          width={1000}
        >
          {Cell}
        </Grid>
      )}
    </div>
  );
});
