import { FC, useCallback, useState } from "react";
import ReactPaginate from "react-paginate";
import useGetData from "../hooks/useGetData";
import FilterTags from "./FilterTags";

type RenderColumns = {
  name: boolean;
  yob: boolean;
  eye_color: boolean;
  hid: boolean;
};

const Table: FC<{ currentItems: [unknown]; renderColumns: RenderColumns }> = ({
  currentItems,
  renderColumns,
}) => {
  return (
    <div>
      {currentItems && (
        <div>
          <table className="table-auto">
            <tbody>
              <tr className="text-left">
                {renderColumns.name && <th>Name</th>}
                {renderColumns.yob && <th>Birth Year</th>}
                {renderColumns.eye_color && <th>Eye Color</th>}
                {renderColumns.hid && <th>H_ID</th>}
              </tr>
              {currentItems.map((n: any) => (
                <tr>
                  {renderColumns.name && <td>{n.node.name}</td>}
                  {renderColumns.yob && <td>{n.node.birthYear}</td>}
                  {renderColumns.eye_color && <td>{n.node.eyeColor}</td>}
                  {renderColumns.hid && <td>{n.node.homeworld.id}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const PaginatedItems: FC = () => {
  const [cursor, setCursor] = useState("");
  const { load, data } = useGetData(cursor);
  const ITEMS_PER_PAGE = 10;
  const [renderColumns, setRenderColumns] = useState({
    name: true,
    yob: true,
    eye_color: true,
    hid: true,
  });

  const onClick = useCallback(() => load(), [load]);
  console.log(data);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    console.log(event);
    const newOffset =
      (event.selected * ITEMS_PER_PAGE) % data.allPeople.totalCount;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setCursor(data.allPeople.edges[9].cursor);
  };

  return (
    <>
      <button onClick={onClick}>Load Table Data</button>
      <div className="flex space-x-3 items-center">
        {renderColumns.name && (
          <FilterTags
            label="Name"
            onClear={() => setRenderColumns({ ...renderColumns, name: false })}
          />
        )}
        {renderColumns.yob && (
          <FilterTags
            label="Birth Year"
            onClear={() => setRenderColumns({ ...renderColumns, yob: false })}
          />
        )}
        {renderColumns.eye_color && (
          <FilterTags
            label="Eye Color"
            onClear={() =>
              setRenderColumns({ ...renderColumns, eye_color: false })
            }
          />
        )}
        {renderColumns.hid && (
          <FilterTags
            label="H_ID"
            onClear={() => setRenderColumns({ ...renderColumns, hid: false })}
          />
        )}
      </div>

      {data && (
        <Table
          currentItems={data.allPeople.edges}
          renderColumns={renderColumns}
        />
      )}
      {data && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageCount={Math.ceil(data.allPeople.totalCount / ITEMS_PER_PAGE)}
          previousClassName="hidden"
          className="flex space-x-3 items-center"
          pageClassName="hidden"
        />
      )}
    </>
  );
};

export default PaginatedItems;
