import { Amplify, API } from "aws-amplify";
import { Authenticator, WithAuthenticatorProps } from "@aws-amplify/ui-react";
import {
  createRestaurant,
  createNotes,
  createRestaurantCategory,
} from "../graphql/mutations.js";
import { GraphQLQuery } from "@aws-amplify/api";
import { listCategories } from "../graphql/queries";
import {
  CreateNotesMutation,
  CreateRestaurantMutation,
  ListCategoriesQuery,
} from "../API";
import { FormEvent, useEffect, useState } from "react";
import awsconfig from "../aws-exports";
import { Category } from "../models";

export default function PlaceForm({ user }: WithAuthenticatorProps) {
  const [name, setName] = useState<string>("");
  const [rating, setRating] = useState<string>();
  const [note, setNote] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>();
  const [categories, setCategories] = useState<Category[]>([]);

  const title = "Add a Place";

  Amplify.configure(awsconfig);

  useEffect(() => {
    API.graphql<GraphQLQuery<ListCategoriesQuery>>({
      query: listCategories,
      variables: { limit: 150 }, // This is very stupid; delete this eventually
    })
      .then((resp) => {
        const cats = (resp?.data?.listCategories?.items ?? []).filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (cat: any) => cat?._deleted !== true // This is part of the stupid, but we should probably keep it around
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setCategories(cats as any);
      })
      .catch((error) => console.error(error));
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = document.getElementById("place-form") as HTMLFormElement;
    const nameField = document.getElementById("name") as HTMLInputElement;

    if (name.trim().length) {
      nameField?.setCustomValidity("");
    } else {
      nameField?.setCustomValidity("all-spaces name");
    }

    let newRestaurantId;

    if (form.checkValidity()) {
      form.classList.add("was-validated");
      const input = {
        name: name.trim(),
        rating,
      };

      await API.graphql<GraphQLQuery<CreateRestaurantMutation>>({
        query: createRestaurant,
        variables: { input },
      })
        .then((response) => {
          newRestaurantId = response?.data?.createRestaurant?.id;

          const promises = [
            API.graphql<GraphQLQuery<any>>({
              query: createRestaurantCategory,
              variables: {
                input: {
                  restaurantId: newRestaurantId,
                  categoryId: categoryId,
                },
              },
            }),
          ];

          if (note.trim().length) {
            promises.push(
              API.graphql<GraphQLQuery<CreateNotesMutation>>({
                query: createNotes,
                variables: {
                  input: {
                    restaurantID: newRestaurantId,
                    author: `${user?.attributes?.given_name ?? ""} ${
                      user?.attributes?.family_name ?? ""
                    }`,
                    authorEmail: user?.attributes?.email ?? "unknown",
                    note: note.trim(),
                  },
                },
              })
            );
          }

          Promise.all(promises)
            .then(() => {
              resetForm();
            })
            .then(() => resetForm())
            .catch((error) => console.error(error));
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      form.classList.add("was-validated");
    }
  }

  function resetForm() {
    setName("");
    setRating(undefined);
    setCategoryId(undefined);
    setNote("");
    const form = document.getElementById("place-form");
    form?.classList.remove("was-validated");
  }

  return (
    <Authenticator>
      {({ user }) => (
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
                  <div className="invalid-feedback">
                    Name is missing or invalid
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-lg-8">
                  <label
                    htmlFor="category"
                    className="form-label">
                    Category
                  </label>
                  <select
                    id="category"
                    className="form-select"
                    onChange={(e) => setCategoryId(e.target.value)}>
                    <option></option>
                    {categories.map((cat) => (
                      <option
                        key={cat.id}
                        value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
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
                    onChange={(e) => setRating(e?.target?.value)}>
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
                  <input
                    type="hidden"
                    value={user?.attributes?.email}
                  />
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
        </>
      )}
    </Authenticator>
  );
}
