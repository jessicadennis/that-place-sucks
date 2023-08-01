import { createColumnHelper } from "@tanstack/react-table";
import { useQuery } from "react-query";
import { Amplify, API } from "aws-amplify";
import {
  listRestaurantsWithNotes,
  listValidCategories,
} from "../graphql/custom-queries";
import awsconfig from "../aws-exports";
import Table from "./Table";

Amplify.configure(awsconfig);

const columnHelper = createColumnHelper();

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

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    return Intl.DateTimeFormat("en-US").format(date);
  } catch (error) {
    console.log(`error parsing date: ${dateString}`);
    return "";
  }
}

async function getRestaurants() {
  const resp = await API.graphql({
    query: listRestaurantsWithNotes,
    variables: { limit: 10 },
  });

  const result = resp?.data?.listRestaurants?.items ?? [];
  const places = result.map((place) => ({
    name: place.name,
    rating: place.rating,
    noteCount: place.Notes.items?.length,
    notes: place.Notes?.items ?? [],
    updatedAt: formatDate(place.updatedAt),
  }));

  return {
    rows: places,
    nextToken: resp?.data?.listRestaurants?.nextToken ?? null,
  };
}

export default function PlacesTable() {
  const query = useQuery("restaurants", getRestaurants);

  console.log(query?.data?.rows);

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
