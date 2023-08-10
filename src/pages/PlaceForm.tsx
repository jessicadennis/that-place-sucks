import { Amplify, API } from "aws-amplify";
import {
  Authenticator,
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import {
  createRestaurant,
  createNotes,
  createRestaurantCategory,
  updateRestaurant,
  updateRestaurantCategory,
} from "../graphql/mutations.js";
import { GraphQLQuery } from "@aws-amplify/api";
import {
  CreateNotesMutation,
  CreateRestaurantMutation,
  ListCategoriesQuery,
  UpdateRestaurantMutation,
} from "../API";
import { FormEvent, useEffect, useState } from "react";
import awsconfig from "../aws-exports";
import { Category, Notes, RestaurantCategory } from "../models";
import { useNavigate, useParams } from "react-router-dom";
import { getRestaurantById } from "../graphql/custom-queries.js";
import {
  listCategories,
  restaurantCategoriesByRestaurantId,
} from "../graphql/queries.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Modal from "../components/Modal.js";
import CategoryForm from "./CategoryForm.js";

async function getCategories() {
  const result = await API.graphql<GraphQLQuery<ListCategoriesQuery>>({
    query: listCategories,
  });

  return result.data;
}

function renderNotes(notes: Notes[]) {
  if (notes?.length) {
    return (
      <>
        <h2>Notes</h2>
        <ul>
          {notes?.map((note) => (
            <li key={note.id}>
              {note.note} &ndash; {note.author}
            </li>
          ))}
        </ul>
      </>
    );
  }

  return <></>;
}

type RestauarntMutationInput = {
  restaurantId?: string;
  name: string;
  rating: number;
  categoryId: string;
  note: string;
  userName: string;
  userEmail: string;
  restaurantCategoryId?: string;
};

async function addRestaurant(input: RestauarntMutationInput) {
  const response = await API.graphql<GraphQLQuery<CreateRestaurantMutation>>({
    query: createRestaurant,
    variables: {
      input: {
        name: input.name,
        rating: input.rating,
      },
    },
  });

  const newRestaurantId = response.data?.createRestaurant?.id;
  if (!newRestaurantId) {
    throw new Error("Failed to create restaurant");
  }

  const promises = [
    API.graphql<GraphQLQuery<any>>({
      query: createRestaurantCategory,
      variables: {
        input: {
          restaurantId: newRestaurantId,
          categoryId: input.categoryId,
        },
      },
    }),
  ];

  if (input.note.trim().length) {
    promises.push(
      API.graphql<GraphQLQuery<CreateNotesMutation>>({
        query: createNotes,
        variables: {
          input: {
            restaurantID: newRestaurantId,
            author: input.userName,
            authorEmail: input.userEmail ?? "unknown",
            note: input.note.trim(),
          },
        },
      })
    );
  }

  await Promise.all(promises);
}

async function editRestaurant(input: RestauarntMutationInput) {
  await API.graphql<GraphQLQuery<UpdateRestaurantMutation>>({
    query: updateRestaurant,
    variables: {
      input: {
        name: input.name,
        rating: input.rating,
        id: input.restaurantId,
      },
    },
  });

  const promises = [
    API.graphql<GraphQLQuery<any>>({
      query: updateRestaurantCategory,
      variables: {
        input: {
          id: input.restaurantCategoryId,
          restaurantId: input.restaurantId,
          categoryId: input.categoryId,
        },
      },
    }),
  ];

  if (input.note.trim().length) {
    promises.push(
      API.graphql<GraphQLQuery<CreateNotesMutation>>({
        query: createNotes,
        variables: {
          input: {
            restaurantID: input.restaurantId,
            author: input.userName,
            authorEmail: input.userEmail,
            note: input.note.trim(),
          },
        },
      })
    );
  }

  await Promise.all(promises);
}

export function PlaceForm({ user }: WithAuthenticatorProps) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(1);
  const [note, setNote] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [notes, setNotes] = useState<Notes[]>();
  const [restaurantCategoryId, setRestaurantCategoryId] = useState();

  const title = "Add a Place";

  Amplify.configure(awsconfig);
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const catQuery = useQuery("categories", getCategories) as any;
  const categories = catQuery?.data?.listCategories?.items ?? [];

  const addMutation = useMutation({
    mutationFn: () =>
      addRestaurant({
        name,
        rating,
        note,
        categoryId,
        userName: `${user?.attributes?.given_name ?? ""} ${
          user?.attributes?.family_name ?? ""
        }`,
        userEmail: user?.attributes?.email ?? "unknown",
      }),
    onSuccess: () => {
      resetForm(), queryClient.invalidateQueries("restaurants");
    },
    onError: (error) => {
      // TODO: toast or someting
      console.error(error);
    },
  });

  const editMutation = useMutation({
    mutationFn: () =>
      editRestaurant({
        name,
        rating,
        note,
        categoryId,
        userName: `${user?.attributes?.given_name ?? ""} ${
          user?.attributes?.family_name ?? ""
        }`,
        userEmail: user?.attributes?.email ?? "unknown",
        restaurantId: restaurantId,
        restaurantCategoryId: restaurantCategoryId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("restaurants");
      navigate("/");
    },
    onError: (error) => {
      // TODO: toast or someting
      console.error(error);
    },
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = document.getElementById("place-form") as HTMLFormElement;
    const nameField = document.getElementById("name") as HTMLInputElement;

    if (name.trim().length) {
      nameField?.setCustomValidity("");
    } else {
      nameField?.setCustomValidity("all-spaces name");
    }

    if (form.checkValidity()) {
      form.classList.add("was-validated");

      if (restaurantId) {
        editMutation.mutate();
      } else {
        addMutation.mutate();
      }
    } else {
      form.classList.add("was-validated");
    }
  }

  function resetForm() {
    setName("");
    setRating(1);
    setCategoryId("");
    setNote("");
    setNotes([]);
    const form = document.getElementById("place-form");
    form?.classList.remove("was-validated");
  }

  useEffect(() => {
    if (restaurantId) {
      API.graphql<GraphQLQuery<any>>({
        query: getRestaurantById,
        variables: {
          id: restaurantId,
        },
      })
        .then((result) => {
          const placeData = result.data?.getRestaurant;
          setName(placeData?.name ?? "");
          setCategoryId(placeData?.categories?.items[0]?.categoryId);
          setRating(parseInt(placeData?.rating, 10));
          setNotes(placeData?.notes?.items ?? []);

          API.graphql<GraphQLQuery<any>>({
            query: restaurantCategoriesByRestaurantId,
            variables: {
              restaurantId,
            },
          }).then((result) => {
            const restCat =
              result?.data?.restaurantCategoriesByRestaurantId.items[0] ?? null;
            setRestaurantCategoryId(restCat.id ?? null);
          });
        })
        .catch((error) => console.error(error));
    } else {
      resetForm();
    }
  }, [restaurantId]);

  return (
    <>
      <h1>{title}</h1>
      <form
        id="place-form"
        onSubmit={onSubmit}>
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col">
              <label
                className="form-label"
                htmlFor="name">
                Name
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                minLength={1}
                maxLength={256}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="invalid-feedback">Name is missing or invalid</div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-8">
              <div className="d-flex align-items-end justify-content-between">
                <div className="category-select flex-grow-1 me-3">
                  <label
                    htmlFor="category"
                    className="form-label">
                    Category
                  </label>
                  <select
                    id="category"
                    className="form-select"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}>
                    <option></option>
                    {categories.map((cat: Category) => (
                      <option
                        key={cat.id}
                        value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="button-container mb-1">
                  <CategoryForm existingCategories={categories} />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <label
                htmlFor="rating"
                className="form-label">
                Rating
              </label>
              <select
                className="form-select"
                id="rating"
                required
                value={rating}
                onChange={(e) => setRating(parseInt(e?.target?.value, 10))}>
                <option></option>
                {[...Array(10).keys()].map((key) => (
                  <option
                    key={key}
                    value={key + 1}>
                    {key + 1}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">Rating is required</div>
            </div>
          </div>
          {/* TODO: list existing notes with X to remove */}
          <div className="row mb-4">
            <div className="col">
              <label
                className="form-label"
                htmlFor="note">
                Note
              </label>
              <textarea
                className="form-control"
                rows={3}
                id="note"
                maxLength={2048}
                value={note}
                onChange={(e) => setNote(e.target.value)}></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-lg btn-primary px-5">
              Submit
            </button>
          </div>
        </div>
      </form>
      {renderNotes(notes ?? [])}
    </>
  );
}

export default withAuthenticator(PlaceForm);
