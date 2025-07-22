"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ICONS } from "@/lib/globals";

const BasicTable = ({ headlines, content, filter, colKeys }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [activeTags, setActiveTags] = useState([]);
  const [activeAuthors, setActiveAuthors] = useState([]);

  const columnKeys = colKeys;
  const allTags = filter || [];

  // Autoren aus allen Rows extrahieren
  const uniqueAuthors = useMemo(() => {
    const authors = new Set();
    content.forEach((row) => {
      row.author?.forEach?.((name) => authors.add(name));
    });
    return Array.from(authors);
  }, [content]);

  const toggleAuthorFilter = (author) => {
    setActiveAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author]
    );
  };

  const toggleTagFilter = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const requestSort = (key) => {
    if (key === "tags" || key === "id") return;
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredContent = useMemo(() => {
    let result = [...content];

    // Tags-Filter
    if (activeTags.length > 0) {
      result = result.filter((row) =>
        row.tags?.some((tag) => activeTags.includes(tag))
      );
    }

    // Autoren-Filter
    if (activeAuthors.length > 0) {
      result = result.filter((row) =>
        row.author?.some((auth) => activeAuthors.includes(auth))
      );
    }

    // Sortierung
    if (sortConfig.key) {
      const { key, direction } = sortConfig;
      result.sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        const isDate = /^\d{4}-\d{2}-\d{2}/.test(valA);

        if (isDate) {
          return direction === "asc"
            ? new Date(valA) - new Date(valB)
            : new Date(valB) - new Date(valA);
        }

        return direction === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }

    return result;
  }, [content, activeTags, activeAuthors, sortConfig]);

  return (
    <div className="min-h-[60vh] max-h-[80vh] overflow-x-auto overflow-y-scroll bg-neutral/30 rounded-md">
      <table className="table table-pin-rows table-pin-cols ">
        <thead>
          <tr>
            {headlines.map((head, index) => {
              const key = columnKeys[index];
              let control = null;

              if (key === "tags") {
                control = (
                  <details className="dropdown">
                    <summary
                      className={`btn btn-xs btn btn-xs ${
                        activeTags.length > 0 ? "btn-info" : "btn-ghost "
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={ICONS.funnel}
                        />
                      </svg>
                    </summary>
                    <ul className="p-2 shadow text-base-content menu dropdown-content z-[1] bg-base-200 rounded-box w-52 max-h-60 overflow-y-auto">
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
                );
              } else if (key === "author") {
                control = (
                  <details className="dropdown">
                    <summary
                      className={`btn btn-xs ${
                        activeAuthors.length > 0 ? "btn-info" : "btn-ghost "
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={ICONS.funnel}
                        />
                      </svg>
                    </summary>
                    <ul className="p-2 shadow text-base-content  menu dropdown-content z-[1] bg-base-200 rounded-box w-52 max-h-60 overflow-y-auto">
                      {uniqueAuthors.map((author) => (
                        <li key={author}>
                          <label className="label cursor-pointer">
                            <input
                              type="checkbox"
                              className="checkbox checkbox-sm"
                              checked={activeAuthors.includes(author)}
                              onChange={() => toggleAuthorFilter(author)}
                            />
                            <span className="ml-2">{author}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </details>
                );
              } else if (key !== "id") {
                control = (
                  <button
                    onClick={() => requestSort(key)}
                    className="btn btn-xs btn-ghost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.3}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={
                          sortConfig.key === key
                            ? sortConfig.direction === "asc"
                              ? ICONS.arrowUp
                              : ICONS.arrowDown
                            : ICONS.arrowUpDown
                        }
                      />
                    </svg>
                  </button>
                );
              }

              return (
                <th key={`tablehead_${index}`}>
                  <div className="flex items-center gap-2">
                    <div> {head}</div>
                    <div>{control}</div>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {filteredContent.map((row, index) => (
            <tr className="hover:bg-base-300" key={`TableRow_${index}`}>
              <th className="w-min bg-transparent">
                <div className="flex gap-2">
                  <Link
                    href={{
                      pathname: "/create",
                      query: {
                        template: row.template,
                        content: row.id,
                      },
                    }}
                  >
                    <button className="btn btn-info btn-soft h-7 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.3}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={ICONS.pencil}
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link
                    href={{
                      pathname: "/create",
                      query: {
                        template: row.template,
                        content: row.id,
                        duplicate: true,
                      },
                    }}
                  >
                    <button className="btn btn-info btn-soft h-7 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.3}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={ICONS.duplicate}
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </th>
              <td>{row.title}</td>
              <td>
                {row.last_update
                  ? (() => {
                      const d = new Date(row.last_update);
                      return `${String(d.getDate()).padStart(2, "0")}.${String(
                        d.getMonth() + 1
                      ).padStart(2, "0")}.${d.getFullYear()}`;
                    })()
                  : "-"}
              </td>
              <td>
                <div className="flex flex-wrap gap-1">
                  {row.author?.map((name, i) => (
                    <span key={i} className="badge badge-ghost badge-sm">
                      {name}
                    </span>
                  ))}
                </div>
              </td>
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
