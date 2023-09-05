/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLResult } from "@aws-amplify/api-graphql";
import {
  faPenToSquare,
  faShop,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef, Row } from "@tanstack/react-table";
import { API } from "aws-amplify";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link, NavLink } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { getAllRestaurants } from "../graphql/custom-queries";
import { Dish, Notes } from "../models";
import utils from "../utilities/format-utils";
import SpinnerOverlay from "./SpinnerOverlay";
import Table from "./Table";
import { useAuthenticator } from "@aws-amplify/ui-react";

interface RestaurantRow {
  name: string;
  rating: number;
  category: string;
  dishes: Dish[];
  updatedAt: string;
  notes: Notes[];
  id: string;
}

export default function PlacesTable() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const { user } = useAuthenticator((context) => [context.route]);

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
      dishes: place.dishes?.items,
      noteCount: place.notes?.items?.length,
      notes: place.notes?.items ?? [],
      updatedAt: utils.formatDate(place?.updatedAt ?? ""),
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
        accessorFn: (row) => row,
        header: "",
        id: "expander",
        cell: ({ row }) => {
          if (row.getCanExpand()) {
            return (
              <button
                className="btn"
                {...{
                  onClick: row.getToggleExpandedHandler(),
                }}>
                {row.getIsExpanded() ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
            );
          }
          return <div style={{ height: "38px" }}></div>;
        },
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
        header: "Updated",
      },
      {
        accessorFn: (row) => row.id,
        id: "edit",
        cell: (info) => (
          <Link
            className="btn btn-sm btn-outline-light"
            to={`edit/${info.getValue()}`}>
            Edit
            <FontAwesomeIcon
              className="ms-2"
              icon={faPenToSquare}
            />
          </Link>
        ),
        header: "",
      },
    ],
    []
  );

  const renderSubComponent = ({ row }: { row: Row<RestaurantRow> }) => {
    return (
      <>
        <div className="container p-3 py-2">
          <div className="row">
            <div className="col-lg">
              <h2 className="h5">Dishes</h2>
              <ul>
                {row.original.dishes.map((item: Dish) => (
                  <li key={item.id}>
                    {item.name}: {item.rating}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg">
              <h2 className="h5">Notes</h2>
              <ul>
                {row.original.notes.map((item: Notes) => (
                  <li key={item.id}>{item.note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  };

  const getRowCanExpand = (row: Row<any>) =>
    Boolean(row.original.notes?.length || row.original.dishes?.length);

  if (user?.username) {
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
                  icon={faShop}
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
                      // let's pretend that we have proper searching, which we do not
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

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h1>Welcome to That Place Sucks</h1>
      <p className="lead">
        To view and create content, <NavLink to="/login">log in</NavLink>.
      </p>
    </div>
  );
}
