import { Amplify, API } from "aws-amplify";
import awsconfig from "./aws-exports";
import { ListRestaurants } from "./graphql/queries";
import { useState, useEffect } from "react";

Amplify.configure(awsconfig);

// const places = await API.graphql({
//   query: ListRestaurants(graphqlOperation(ListRestaurants, { limit: 5 }))
// });

export default function PlaceList() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    API.graphql({ query: ListRestaurants, variables: { limit: 5 } }).then(
      (data) => {
        console.log(data);
        // setPlaces(data);
      }
    );
  }, []);

  return <ul className="list-unstyled">{/* places go here */}</ul>;
}

function PlaceItem() {
  return (
    <div className="d-flex align-items-center justify-between">
      <span className="name"></span>
      <span className="rating"></span>
      <span className="notes"></span>
    </div>
  );
}
