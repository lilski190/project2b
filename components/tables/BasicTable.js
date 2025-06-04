import React from "react";
import Link from "next/link";
import { TemplateContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
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
              <th className="bg-transparent">
                <Link
                  href={{
                    pathname: "/create",
                    query: {
                      template: row.template,
                      content: row.id,
                    },
                  }}
                >
                  <button className="btn btn-primary">EDIT</button>
                </Link>
                {row.id}
              </th>
              <td>{row.title}</td>
              <td>{row.last_update}</td>
              <td>{row.tags}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
