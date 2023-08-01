/* eslint-disable @typescript-eslint/no-explicit-any */
import { Amplify, API } from "aws-amplify";
import { createColumnHelper } from "@tanstack/react-table";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { listRestaurants } from "../graphql/queries";
import { ListRestaurantsQuery } from "../API";
import { useQuery } from "react-query";
import awsconfig from "../aws-exports";
import Table from "./Table";

interface RestaurantRow {
  name: string;
  rating: number;
  updatedAt: string;
  noteCount: number;
}

Amplify.configure(awsconfig);

const columnHelper = createColumnHelper<RestaurantRow>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Name",
  }),
  columnHelper.accessor("rating", {
    cell: (info) => info.getValue(),
    header: "Rating",
  }),
  columnHelper.accessor("updatedAt", {
    cell: (info) => info.getValue(),
    header: "Last Updated",
  }),
  columnHelper.accessor("noteCount", {
    cell: (info) => info.getValue(),
    header: "Notes",
  }),
];

function formatDate(dateString: string) {
  try {
    const date = new Date(dateString);
    return Intl.DateTimeFormat("en-US").format(date);
  } catch (error) {
    console.log(`error parsing date: ${dateString}`);
    return "";
  }
}

async function getRestaurants() {
  const resp = (await API.graphql<ListRestaurantsQuery>({
    query: listRestaurants,
    variables: { limit: 10 },
  })) as GraphQLResult<any>;

  formatDate("");

  console.log(resp);

  const result = resp?.data?.listRestaurants?.items ?? [];
  const places = result.map((place: any) => ({
    name: place.name,
    rating: place.rating,
    noteCount: place.notes?.items?.length,
    notes: place.notes?.items ?? [],
    updatedAt: formatDate(place?.updatedAt ?? ""),
  }));

  return {
    rows: places,
    nextToken: resp?.data?.listRestaurants?.nextToken ?? null,
  };
}

export default function PlacesTable() {
  const query = useQuery("restaurants", getRestaurants);

  if (query?.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Table
      columns={columns}
      rows={query?.data?.rows ?? []}
    />
  );
}
