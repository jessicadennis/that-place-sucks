import { GraphQLQuery } from "@aws-amplify/api";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API, Amplify } from "aws-amplify";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import ToastContainer, { ToastPosition } from "react-bootstrap/ToastContainer";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  CreateDishMutation,
  CreateRestaurantMutation,
  DeleteDishMutation,
  Dish,
  DishesByRestaurantIDQuery,
  UpdateDishMutation,
} from "../API";
import awsconfig from "../aws-exports.js";
import { getDishesByRestaurant } from "../graphql/custom-queries.ts";
import {
  createDish,
  createRestaurant,
  deleteDish,
  updateDish,
} from "../graphql/mutations.ts";
import UserInfo from "../utilities/user-info.ts";
import SpinnerOverlay from "./SpinnerOverlay.tsx";

async function getDishes(restaurantId: string) {
  if (restaurantId) {
    return API.graphql<GraphQLQuery<DishesByRestaurantIDQuery>>({
      query: getDishesByRestaurant,
      variables: {
        restaurantID: restaurantId,
      },
    });
  }

  return Promise.reject("");
}

interface DishInput {
  id?: string;
  name: string;
  rating: number;
  restaurantID: string;
}

async function addDish(input: DishInput) {
  await API.graphql<GraphQLQuery<CreateDishMutation>>({
    query: createDish,
    variables: {
      input,
    },
  });
}

async function editDish(input: DishInput) {
  await API.graphql<GraphQLQuery<UpdateDishMutation>>({
    query: updateDish,
    variables: {
      input,
    },
  });
}

async function deleteADish(input: { id: string }) {
  await API.graphql<GraphQLQuery<DeleteDishMutation>>({
    query: deleteDish,
    variables: {
      input,
    },
  });
}

const userGroups = new UserInfo();
const user = await userGroups.getUser();
const canDelete = await userGroups.getIsAdmin();

function DishesForm({
  restaurantId,
  restaurantName,
  restaurantRating,
  createCallback,
}: {
  restaurantId: string;
  restaurantName: string;
  restaurantRating: number;
  createCallback: (id: string) => void;
}) {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [dupeError, setDupeError] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(1);
  const [restaurantID, setRestaurantID] = useState(restaurantId);
  const [show, setShow] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastPosition] = useState("top-end" as ToastPosition);

  Amplify.configure(awsconfig);

  const form: HTMLFormElement = document.getElementById(
    "dish-form"
  ) as HTMLFormElement;

  function checkDupes(dishName: string) {
    const lowercaseDishes = dishes.map((item) => item.name.toLowerCase());
    const nameField = document.getElementById(
      "newDishName"
    ) as HTMLInputElement;
    if (lowercaseDishes.includes(dishName.toLowerCase())) {
      nameField?.setCustomValidity("duplicate-category");
      setDupeError(true);
    } else {
      setDupeError(false);
      nameField?.setCustomValidity("");
    }
  }

  Amplify.configure(awsconfig);

  const queryClient = useQueryClient();

  const getDishesQuery = useQuery(["dishes", restaurantID], () =>
    getDishes(restaurantID).then((response) => {
      queryClient.invalidateQueries("restaurant");
      setDishes(response?.data?.dishesByRestaurantID?.items as any);
    })
  );

  const addDishMutation = useMutation({
    mutationFn: () =>
      addDish({
        name,
        rating,
        restaurantID,
      }),
    onSuccess: () => {
      form?.classList?.remove("was-validated");
      setName("");
      setRating(1);
      setShowSuccessToast(true);
      queryClient.invalidateQueries("dishes");
    },
    onError: (error) => {
      setShowErrorToast(true);
      console.error(error);
    },
  });

  const editDishMutation = useMutation({
    mutationFn: ({ name, rating, restaurantID }: DishInput) =>
      editDish({
        name,
        rating,
        restaurantID,
      }),
    onSuccess: () => {
      setShowSuccessToast(true);
      queryClient.invalidateQueries("dishes");
    },
    onError: (error) => {
      setShowErrorToast(true);
      console.error(error);
    },
  });

  const deleteDishMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteADish({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries("dishes");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleClose = () => {
    form?.classList?.remove("was-validated");
    setName("");
    setDupeError(false);
    setShow(false);
  };
  const handleShow = async () => {
    if (!restaurantID) {
      const response = await API.graphql<
        GraphQLQuery<CreateRestaurantMutation>
      >({
        query: createRestaurant,
        variables: {
          input: {
            name: restaurantName,
            rating: restaurantRating,
          },
        },
      });

      const newRestaurantId = response.data?.createRestaurant?.id;
      if (!newRestaurantId) {
        throw new Error("Failed to create restaurant");
      }

      setRestaurantID(newRestaurantId);
      createCallback(newRestaurantId);
    }

    setShow(true);
  };

  return (
    <>
      <SpinnerOverlay
        isLoading={
          addDishMutation.isLoading || editDishMutation.isLoading
        }></SpinnerOverlay>
      <Button
        variant="outline-light"
        size="sm"
        disabled={!(restaurantID || (restaurantName && restaurantRating))}
        onClick={handleShow}>
        Manage dishes
      </Button>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1 className="h4 mb-0">Manage Dishes</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id="dish-form"
            className="container-fluid"
            noValidate>
            <h2 className="h5">Add a new dish</h2>
            <Row className="d-flex align-items-end justify-content-stretch mb-3">
              <Col
                xs={12}
                md={6}>
                <Form.Group controlId="newDishName">
                  <Form.Label>Dish Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    required
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Name is missing or invalid.{" "}
                    {dupeError && `"${name}" already exists.`}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col
                xs={12}
                md={6}
                className="d-flex align-items-end">
                <Form.Group
                  controlId="newDishRating"
                  className="flex-fill">
                  <Form.Label>Rating</Form.Label>
                  <Form.Select
                    value={rating}
                    required
                    onChange={(e) => setRating(parseInt(e.target.value, 10))}>
                    <option></option>
                    {[...Array(10).keys()].map((key) => (
                      <option
                        key={key}
                        value={key + 1}>
                        {key + 1}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Button
                  className="ms-2"
                  variant="primary"
                  disabled={!name}
                  onClick={() => {
                    if (form.checkValidity()) {
                      checkDupes(name);
                      if (!dupeError) {
                        addDishMutation.mutate();
                      }
                    }

                    form?.classList?.add("was-validated");
                  }}>
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
          {Boolean(dishes?.length) && (
            // TODO: Make this a component
            <div className="container">
              <div className="row mb-4">
                <div className="col">
                  <h2 className="h5">Dishes</h2>
                  <ul className="list-unstyled mt-3">
                    <li className="row py-2 border-top border-bottom fw-semibold">
                      <div className="col-4">Name</div>
                      <div className="col-2">Rating</div>
                    </li>
                    {dishes?.map((dish, index) => (
                      <li
                        key={index}
                        className="row d-flex align-items-center py-2 border-bottom">
                        <div className="col-6">{dish.name}</div>
                        <div className="col-6 d-flex align-items-center">
                          <select
                            className="form-select"
                            id="rating"
                            required
                            value={dish.rating}
                            onChange={(e) => {
                              const rating = parseInt(e?.target?.value, 10);
                              editDishMutation.mutate({
                                name: dish.name,
                                rating,
                                restaurantID,
                              });
                            }}>
                            <option></option>
                            {[...Array(10).keys()].map((key) => (
                              <option
                                key={key}
                                value={key + 1}>
                                {key + 1}
                              </option>
                            ))}
                          </select>
                          {(canDelete || dish.owner === user.username) && (
                            <button
                              className="btn btn-sm btn-outline-light ms-3 d-flex flex-nowrap align-items-center"
                              onClick={() => {
                                deleteDishMutation.mutate({
                                  id: dish.id,
                                });
                              }}>
                              Delete
                              <FontAwesomeIcon
                                className="ms-2"
                                icon={faTrashCan}
                              />
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                    {!dishes?.length && <li>No dishes have been added yet</li>}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position={toastPosition}
        style={{ zIndex: 1 }}>
        <Toast
          bg="success"
          onClose={() => setShowSuccessToast(false)}
          show={showSuccessToast}
          delay={3000}
          autohide>
          <Toast.Header>
            <span className="me-auto">Success</span>
          </Toast.Header>
          <Toast.Body>{name} has been added</Toast.Body>
        </Toast>
        <Toast
          bg="danger"
          onClose={() => setShowErrorToast(false)}
          show={showErrorToast}
          delay={3000}
          autohide>
          <Toast.Header>
            <span className="me-auto">Error</span>
          </Toast.Header>
          <Toast.Body>
            Oh no! Something bad happened and {name} was not added!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default withAuthenticator(DishesForm);
