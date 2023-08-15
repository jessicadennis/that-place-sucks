/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { ColumnDef, Row } from "@tanstack/react-table";
import { API, Amplify } from "aws-amplify";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link, NavLink } from "react-router-dom";
import awsconfig from "../aws-exports";
import { Notes } from "../models";
import Table from "./Table";
import { useDebounce } from "use-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPizzaSlice, faSearch } from "@fortawesome/free-solid-svg-icons";
import { getAllRestaurants } from "../graphql/custom-queries";
import SpinnerOverlay from "./SpinnerOverlay";

interface RestaurantRow {
  name: string;
  rating: number;
  category: string;
  updatedAt: string;
  noteCount: number;
  notes: Notes[];
  id: string;
}

Amplify.configure(awsconfig);

function formatDate(dateString: string) {
  try {
    const date = new Date(dateString);
    return Intl.DateTimeFormat("en-US").format(date);
  } catch (error) {
    console.log(`error parsing date: ${dateString}`);
    return "";
  }
}

export default function PlacesTable() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  async function getRestaurants() {
    const resp = (await API.graphql<any>({
      query: getAllRestaurants,
      variables: {
        filter: {
          name: { contains: search },
        },
      },
    })) as GraphQLResult<any>;

    const result = resp?.data?.listRestaurants?.items ?? [];
    const places: RestaurantRow[] = result.map((place: any) => ({
      name: place.name,
      rating: place.rating,
      category: place.categories?.items[0]?.category?.name,
      noteCount: place.notes?.items?.length,
      notes: place.notes?.items ?? [],
      updatedAt: formatDate(place?.updatedAt ?? ""),
      id: place.id,
    }));

    return {
      rows: places,
      nextToken: resp?.data?.listRestaurants?.nextToken ?? null,
    };
  }

  const query = useQuery({
    queryKey: ["restaurants", debouncedSearch],
    queryFn: getRestaurants,
  });

  const columns = useMemo<ColumnDef<RestaurantRow>[]>(
    () => [
      {
        header: "",
        id: "expander",
        cell: ({ row }) => (
          <button
            className="btn"
            {...{
              onClick: row.getToggleExpandedHandler(),
            }}>
            {row.getIsExpanded() ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                className="bi bi-caret-down"
                viewBox="0 0 16 16">
                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-right"
                viewBox="0 0 16 16">
                <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
              </svg>
            )}
          </button>
        ),
      },
      {
        accessorFn: (row) => row.name,
        id: "name",
        cell: (info) => info.getValue(),
        header: "Name",
      },
      {
        accessorFn: (row) => row.rating,
        id: "rating",
        cell: (info) => info.getValue(),
        header: "Rating",
      },
      {
        accessorFn: (row) => row.category,
        id: "category",
        cell: (info) => info.getValue(),
        header: "Category",
      },
      {
        accessorFn: (row) => row.updatedAt,
        id: "updatedAt",
        cell: (info) => info.getValue(),
        header: "Category",
      },
      {
        accessorFn: (row) => row.noteCount,
        id: "noteCount",
        cell: (info) => info.getValue(),
        header: "Notes",
      },
      {
        accessorFn: (row) => row.id,
        id: "edit",
        cell: (info) => (
          <Link to={`edit/${info.getValue()}`}>
            <span className="visually-hidden">Edit</span>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
          </Link>
        ),
        header: "",
      },
    ],
    []
  );

  const renderSubComponent = ({ row }: { row: Row<RestaurantRow> }) => {
    return (
      <ul>
        {row.original.notes.map((item: Notes) => (
          <li key={item.id}>{item.note}</li>
        ))}
      </ul>
    );
  };

  const getRowCanExpand = (row: Row<any>) =>
    Boolean(row.original.notes?.length);

  return (
    <>
      <SpinnerOverlay isLoading={query.isLoading}></SpinnerOverlay>
      <div className="container-fluid">
        <div className="row m-3">
          <div className="col-lg-8">
            <NavLink
              to={"add"}
              className={"btn btn-sm btn-outline-light"}>
              Add new
              <FontAwesomeIcon
                icon={faPizzaSlice}
                className="ms-2"></FontAwesomeIcon>
            </NavLink>
          </div>
          <div className="col-lg-4">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value.replace(
                      /^(\w)(.*?)/,
                      (match: string, p1: string, p2: string) =>
                        `${p1.toUpperCase()}${p2}`
                    )
                  )
                }
              />
              <span className="input-group-text">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <Table
        columns={columns as ColumnDef<unknown>[]}
        rows={query?.data?.rows ?? []}
        renderSubComponent={renderSubComponent}
        getRowCanExpand={getRowCanExpand}
      />
    </>
  );
}
