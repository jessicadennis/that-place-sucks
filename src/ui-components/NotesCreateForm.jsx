/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { Notes, Restaurant } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function NotesCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    note: "",
    restaurantID: undefined,
    author: "",
    authorEmail: "",
  };
  const [note, setNote] = React.useState(initialValues.note);
  const [restaurantID, setRestaurantID] = React.useState(
    initialValues.restaurantID
  );
  const [author, setAuthor] = React.useState(initialValues.author);
  const [authorEmail, setAuthorEmail] = React.useState(
    initialValues.authorEmail
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setNote(initialValues.note);
    setRestaurantID(initialValues.restaurantID);
    setCurrentRestaurantIDValue(undefined);
    setCurrentRestaurantIDDisplayValue("");
    setAuthor(initialValues.author);
    setAuthorEmail(initialValues.authorEmail);
    setErrors({});
  };
  const [currentRestaurantIDDisplayValue, setCurrentRestaurantIDDisplayValue] =
    React.useState("");
  const [currentRestaurantIDValue, setCurrentRestaurantIDValue] =
    React.useState(undefined);
  const restaurantIDRef = React.createRef();
  const restaurantRecords = useDataStoreBinding({
    type: "collection",
    model: Restaurant,
  }).items;
  const getDisplayValue = {
    restaurantID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    note: [{ type: "Required" }],
    restaurantID: [{ type: "Required" }],
    author: [{ type: "Required" }],
    authorEmail: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          note,
          restaurantID,
          author,
          authorEmail,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Notes(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "NotesCreateForm")}
      {...rest}
    >
      <TextField
        label="Note"
        isRequired={true}
        isReadOnly={false}
        value={note}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              note: value,
              restaurantID,
              author,
              authorEmail,
            };
            const result = onChange(modelFields);
            value = result?.note ?? value;
          }
          if (errors.note?.hasError) {
            runValidationTasks("note", value);
          }
          setNote(value);
        }}
        onBlur={() => runValidationTasks("note", note)}
        errorMessage={errors.note?.errorMessage}
        hasError={errors.note?.hasError}
        {...getOverrideProps(overrides, "note")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              note,
              restaurantID: value,
              author,
              authorEmail,
            };
            const result = onChange(modelFields);
            value = result?.restaurantID ?? value;
          }
          setRestaurantID(value);
          setCurrentRestaurantIDValue(undefined);
        }}
        currentFieldValue={currentRestaurantIDValue}
        label={"Restaurant id"}
        items={restaurantID ? [restaurantID] : []}
        hasError={errors?.restaurantID?.hasError}
        errorMessage={errors?.restaurantID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.restaurantID(
                restaurantRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentRestaurantIDDisplayValue(
            value
              ? getDisplayValue.restaurantID(
                  restaurantRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentRestaurantIDValue(value);
        }}
        inputFieldRef={restaurantIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Restaurant id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Restaurant"
          value={currentRestaurantIDDisplayValue}
          options={restaurantRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.restaurantID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentRestaurantIDValue(id);
            setCurrentRestaurantIDDisplayValue(label);
            runValidationTasks("restaurantID", label);
          }}
          onClear={() => {
            setCurrentRestaurantIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.restaurantID?.hasError) {
              runValidationTasks("restaurantID", value);
            }
            setCurrentRestaurantIDDisplayValue(value);
            setCurrentRestaurantIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("restaurantID", currentRestaurantIDValue)
          }
          errorMessage={errors.restaurantID?.errorMessage}
          hasError={errors.restaurantID?.hasError}
          ref={restaurantIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "restaurantID")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Author"
        isRequired={true}
        isReadOnly={false}
        value={author}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              note,
              restaurantID,
              author: value,
              authorEmail,
            };
            const result = onChange(modelFields);
            value = result?.author ?? value;
          }
          if (errors.author?.hasError) {
            runValidationTasks("author", value);
          }
          setAuthor(value);
        }}
        onBlur={() => runValidationTasks("author", author)}
        errorMessage={errors.author?.errorMessage}
        hasError={errors.author?.hasError}
        {...getOverrideProps(overrides, "author")}
      ></TextField>
      <TextField
        label="Author email"
        isRequired={true}
        isReadOnly={false}
        value={authorEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              note,
              restaurantID,
              author,
              authorEmail: value,
            };
            const result = onChange(modelFields);
            value = result?.authorEmail ?? value;
          }
          if (errors.authorEmail?.hasError) {
            runValidationTasks("authorEmail", value);
          }
          setAuthorEmail(value);
        }}
        onBlur={() => runValidationTasks("authorEmail", authorEmail)}
        errorMessage={errors.authorEmail?.errorMessage}
        hasError={errors.authorEmail?.hasError}
        {...getOverrideProps(overrides, "authorEmail")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
