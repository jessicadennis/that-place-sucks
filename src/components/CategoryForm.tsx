import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Category, CreateCategoryMutation } from "../API";
import { createCategory } from "../graphql/mutations";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { withAuthenticator } from "@aws-amplify/ui-react";

type CategoryMutationInput = {
  name: string;
};

async function addCategory(input: CategoryMutationInput) {
  await API.graphql<GraphQLQuery<CreateCategoryMutation>>({
    query: createCategory,
    variables: {
      input,
    },
  });
}

function CategoryForm({
  existingCategories,
}: {
  existingCategories: Category[];
}) {
  const [dupeError, setDupeError] = useState(false);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const toastPosition = "top-end";
  const toastDelay = 5000;

  const handleClose = () => {
    const form: HTMLFormElement = document.getElementById(
      "category-form"
    ) as HTMLFormElement;
    form.classList.remove("was-validated");
    setName("");
    setDupeError(false);
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: () =>
      addCategory({
        name,
      }),
    onSuccess: () => {
      setName("");
      queryClient.invalidateQueries("categories");
      setShowSuccessToast(true);
      handleClose();
    },
    onError: (error) => {
      setShowErrorToast(true);
      console.error(error);
    },
  });

  function onSubmit() {
    const form: HTMLFormElement = document.getElementById(
      "category-form"
    ) as HTMLFormElement;
    const nameField = document.getElementById(
      "newCategoryName"
    ) as HTMLInputElement;

    if (name.trim().length) {
      nameField?.setCustomValidity("");
    } else {
      nameField?.setCustomValidity("all-spaces name");
    }

    const lowercaseCats = existingCategories.map((item) => ({
      ...item,
      name: item.name.toLowerCase(),
    }));

    if (
      lowercaseCats.findIndex((cat) => cat.name === name.toLowerCase()) > -1
    ) {
      nameField?.setCustomValidity("duplicate-category");
      setDupeError(true);
    } else {
      setDupeError(false);
    }

    if (form.checkValidity() && !dupeError) {
      addMutation.mutate();
    }

    form?.classList.add("was-validated");
  }

  return (
    <>
      <Button
        variant="outline-light"
        size="sm"
        onClick={handleShow}>
        Add new
      </Button>
      <Modal
        show={show}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id="category-form"
            noValidate>
            <Form.Group controlId="newCategoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                required
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Name is missing or invalid.{" "}
                {dupeError && `"${name}" already exists.`}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={onSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position={toastPosition}
        style={{ zIndex: 1060 }}>
        <Toast
          bg="success"
          onClose={() => setShowSuccessToast(false)}
          show={showSuccessToast}
          delay={5000}
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
          delay={toastDelay}
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

export default withAuthenticator(CategoryForm);
