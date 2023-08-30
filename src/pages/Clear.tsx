import { GraphQLQuery } from "@aws-amplify/api";
import { Amplify, API } from "aws-amplify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  DeleteCategoryMutation,
  DeleteNotesMutation,
  DeleteRestaurantMutation,
  ListCategoriesQuery,
  ListNotesQuery,
  ListRestaurantsQuery,
} from "../API";
import awsconfig from "../aws-exports";
import {
  deleteCategory,
  deleteNotes,
  deleteRestaurant,
  deleteRestaurantCategory,
} from "../graphql/mutations.ts";
import {
  listCategories,
  listNotes,
  listRestaurants,
  listRestaurantCategories,
} from "../graphql/queries.ts";
import {
  Category,
  Notes,
  Restaurant,
  RestaurantCategory,
} from "../models/index.js";

// TODO: Also delete dishes

async function getCategories() {
  const result = await API.graphql<GraphQLQuery<ListCategoriesQuery>>({
    query: listCategories,
  });

  return result.data;
}

async function getRestaurants() {
  const result = await API.graphql<GraphQLQuery<ListRestaurantsQuery>>({
    query: listRestaurants,
  });

  return result.data;
}

async function getRestaurantCategories() {
  const result = await API.graphql<GraphQLQuery<any>>({
    query: listRestaurantCategories,
  });

  return result.data;
}

async function getNotes() {
  const result = await API.graphql<GraphQLQuery<ListNotesQuery>>({
    query: listNotes,
  });

  return result.data;
}

async function deleteACategory(id: string) {
  const result = await API.graphql<GraphQLQuery<DeleteCategoryMutation>>({
    query: deleteCategory,
    variables: {
      input: {
        id,
      },
    },
  });

  return result.data;
}

async function deleteARestaurant(id: string) {
  const result = await API.graphql<GraphQLQuery<DeleteRestaurantMutation>>({
    query: deleteRestaurant,
    variables: {
      input: {
        id,
      },
    },
  });

  return result.data;
}

async function deleteARestaurantCategory(id: string) {
  const result = await API.graphql<GraphQLQuery<any>>({
    query: deleteRestaurantCategory,
    variables: {
      input: {
        id,
      },
    },
  });

  return result.data;
}

async function deleteANote(id: string) {
  const result = await API.graphql<GraphQLQuery<DeleteNotesMutation>>({
    query: deleteNotes,
    variables: {
      input: {
        id,
      },
    },
  });

  return result.data;
}

export default function ClearAll() {
  Amplify.configure(awsconfig);
  const queryClient = useQueryClient();

  const catQuery = useQuery("categories", getCategories) as any;
  const categories = catQuery?.data?.listCategories?.items ?? [];
  const categoryIds = categories.map((cat: Category) => cat.id);

  const restQuery = useQuery("restaurants", getRestaurants) as any;
  const rests = restQuery?.data?.listRestaurants?.items ?? [];
  const restIds = rests.map((rest: Restaurant) => rest.id);

  const restCatQuery = useQuery("restCats", getRestaurantCategories) as any;
  const restCats = restCatQuery?.data?.listRestaurantCategories?.items ?? [];
  const restCatIds = restCats.map((restCat: RestaurantCategory) => restCat.id);

  const notesQuery = useQuery("notes", getNotes) as any;
  const notes = notesQuery?.data?.listNotes?.items ?? [];
  const noteIds = notes.map((note: Notes) => note.id);

  const deleteCat = useMutation({
    mutationFn: (id: string) => deleteACategory(id),
    onSuccess: () => {
      console.log(`Deleted: a Category`);
    },
    onError: (error) => {
      // TODO: toast or someting
      console.error(error);
    },
  });

  const deleteRest = useMutation({
    mutationFn: (id: string) => deleteARestaurant(id),
    onSuccess: () => {
      console.log(`Deleted: a Restaurant`);
    },
    onError: (error) => {
      // TODO: toast or someting
      console.error(error);
    },
  });

  const deleteRestCat = useMutation({
    mutationFn: (id: string) => deleteARestaurantCategory(id),
    onSuccess: () => {
      console.log(`Deleted a RestaurantCategory`);
    },
    onError: (error) => {
      // TODO: toast or someting
      console.error(error);
    },
  });

  const deleteNote = useMutation({
    mutationFn: (id: string) => deleteANote(id),
    onSuccess: () => {
      console.log(`Deleted a note`);
    },
    onError: (error) => {
      // TODO: toast or someting
      console.error(error);
    },
  });

  function deleteEverything() {
    if (categoryIds.length) {
      categoryIds.forEach((id: string) => {
        deleteCat.mutate(id);
      });
    }

    if (restCatIds.length) {
      restCatIds.forEach((id: string) => {
        deleteRestCat.mutate(id);
      });
    }

    if (restIds.length) {
      restIds.forEach((id: string) => {
        deleteRest.mutate(id);
      });
    }

    if (noteIds.length) {
      noteIds.forEach((id: string) => {
        deleteNote.mutate(id);
      });
    }

    queryClient.invalidateQueries([
      "restaurants",
      "categories",
      "restCats",
      "notes",
    ]);
  }

  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <button
        className="btn btn-danger btn-lg"
        onClick={deleteEverything}>
        Delete <em>Everything</em>
      </button>
    </div>
  );
}
