"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ICONS } from "@/lib/globals";

const BasicTable = ({ headlines, content, filter }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [activeTags, setActiveTags] = useState([]);

  // Für Spaltenzuordnung
  const columnKeys = ["id", "title", "last_update", "author", "tags"];
  const allTags = filter || [];

  const requestSort = (key) => {
    if (key === "tags") return; // Kein Sort für tags
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const toggleTagFilter = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredContent = useMemo(() => {
    let result = [...content];

    // Filter nach Tags
    if (activeTags.length > 0) {
      result = result.filter((row) =>
        row.tags?.some((tag) => activeTags.includes(tag))
      );
    }

    // Sortierung
    if (sortConfig.key && sortConfig.key !== "tags") {
      result.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];

        const isDate = /^\d{4}-\d{2}-\d{2}/.test(valA);

        if (isDate) {
          return sortConfig.direction === "asc"
            ? new Date(valA) - new Date(valB)
            : new Date(valB) - new Date(valA);
        }

        return sortConfig.direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
    }

    return result;
  }, [content, sortConfig, activeTags]);

  return (
    <div className="min-h-[60vh] max-h-[80vh] overflow-x-auto overflow-y-scroll">
      <table className="table table-pin-rows table-pin-cols">
        <thead>
          <tr>
            {headlines.map((head, index) => {
              const key = columnKeys[index];
              return (
                <th key={"tablehead_" + index}>
                  <div className="flex items-center gap-2">
                    {head}
                    {key !== "tags" ? (
                      <button
                        onClick={() => requestSort(columnKeys[index])}
                        className="btn btn-xs btn-ghost"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={
                              sortConfig.key === columnKeys[index]
                                ? sortConfig.direction === "asc"
                                  ? ICONS.arrowUp
                                  : ICONS.arrowDown
                                : ICONS.arrowUpDown
                            }
                          />
                        </svg>
                      </button>
                    ) : (
                      <details className="dropdown">
                        <summary className="btn btn-xs btn-outline">
                          Filter
                        </summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-52 max-h-60 overflow-y-auto">
                          {allTags.map((tag) => (
                            <li key={tag}>
                              <label className="label cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="checkbox checkbox-sm"
                                  checked={activeTags.includes(tag)}
                                  onChange={() => toggleTagFilter(tag)}
                                />
                                <span className="ml-2">{tag}</span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {filteredContent.map((row, index) => (
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
              <td>{row.author}</td>
              <td>
                <div className="flex flex-wrap gap-1">
                  {row.tags?.map((tag, i) => (
                    <span key={i} className="badge badge-ghost badge-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
