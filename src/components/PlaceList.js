import { Amplify, API } from "aws-amplify";
import awsconfig from "../aws-exports";
import { listRestaurants } from "../graphql/queries";
import { useState, useEffect } from "react";

Amplify.configure(awsconfig);

export default function PlaceList() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    API.graphql({
      query: listRestaurants,
      variables: { limit: 5 },
    })
      .then((resp) => {
        const restaurants = resp?.data?.listRestaurants?.items ?? [];
        setPlaces(restaurants);
      })
      .catch((error) => console.error(error));
  }, []);

  const pluralize = (count) => (count > 1 ? "notes" : "note");
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return Intl.DateTimeFormat("en-US").format(date);
    } catch (error) {
      console.log(`error parsing date: ${dateString}`);
      return "";
    }
  };
  const getDisabled = (notes) => {
    if (!notes || notes?.length === 0) {
      return " disabled pe-none ";
    }

    return "";
  };
  const getBarColor = (rating) => {
    const colors = {
      unknown: "secondary-subtle", // 0, null, etc — this shouldn't happen
      danger: "danger-subtle", // 1
      terrible: "danger", // 2
      bad: "warning-subtle", // 3-4
      ok: "warning", // 5
      acceptable: "success",
      good: "success-subtle", // 8-9
      great: "info", // 10
    };
    switch (rating) {
      case 1:
        return colors.danger;
      case 2:
        return colors.terrible;
      case 3:
      case 4:
        return colors.bad;
      case 5:
        return colors.ok;
      case 6:
      case 7:
        return colors.acceptable;
      case 8:
      case 9:
        return colors.good;
      case 10:
        return colors.great;
      default:
        return colors.unknown;
    }
  };

  return (
    <div
      className="accordion"
      id="places-accordion">
      {places.map((place) => (
        <div
          className="accordion-item rounded-0"
          key={place.id}>
          <h2 className="accordion-header">
            <button
              className={
                "accordion-button rounded-0 bg-secondary text-dark border-start border-5 border-" +
                getBarColor(place.rating) +
                getDisabled(place?.notes)
              }
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#item-" + place.id}
              aria-controls={"item-" + place.id}
              disabled={!place?.notes || place?.notes?.length === 0}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-4">
                    <div>{place.name}</div>
                  </div>
                  <div className="col-3">Rating: {place.rating}</div>
                  <div className="col-3">
                    Last updated: {formatDate(place.updatedAt)}
                  </div>
                  <div className="col-2 text-end">
                    {place.notes?.length ?? ""}{" "}
                    {place.notes?.length ? pluralize(place.notes?.length) : ""}
                  </div>
                </div>
              </div>
            </button>
          </h2>
          <div
            id={"item-" + place.id}
            className="accordion-collapse collapse"
            data-bs-parent="#places-accordion">
            <div className="accordion-body">
              <ul>
                {place.notes?.map((note) => (
                  <li key={crypto.randomUUID()}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
