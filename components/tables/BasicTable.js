import React from "react";
/**
 * Colors Komponent
 * Hier kommen versteckte inputfields für die Farben rein
 */
const BasicTable = ({ headlines, content }) => {
  return (
    <div className="min-h-[60vh] max-h-[80vh] overflow-x-auto overflow-y-scroll">
      <table className="table table-pin-rows table-pin-cols">
        {/* head */}
        <thead>
          <tr>
            {headlines.map((head, index) => (
              <th key={"tablehead_" + index}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {content.map((row, index) => (
            <tr className="hover:bg-base-300" key={"TableRow_" + index}>
              <th className="bg-transparent">{row.id}</th>
              <td>{row.title}</td>
              <td>{row.last_updated_at}</td>
              <td>{row.tags}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
