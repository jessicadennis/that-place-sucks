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
import { Restaurant, Notes as Notes0, Category } from "../models";
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
export default function RestaurantCreateForm(props) {
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
    name: "",
    rating: "",
    categoryID: undefined,
    Notes: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [rating, setRating] = React.useState(initialValues.rating);
  const [categoryID, setCategoryID] = React.useState(initialValues.categoryID);
  const [Notes, setNotes] = React.useState(initialValues.Notes);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setRating(initialValues.rating);
    setCategoryID(initialValues.categoryID);
    setCurrentCategoryIDValue(undefined);
    setCurrentCategoryIDDisplayValue("");
    setNotes(initialValues.Notes);
    setCurrentNotesValue(undefined);
    setCurrentNotesDisplayValue("");
    setErrors({});
  };
  const [currentCategoryIDDisplayValue, setCurrentCategoryIDDisplayValue] =
    React.useState("");
  const [currentCategoryIDValue, setCurrentCategoryIDValue] =
    React.useState(undefined);
  const categoryIDRef = React.createRef();
  const [currentNotesDisplayValue, setCurrentNotesDisplayValue] =
    React.useState("");
  const [currentNotesValue, setCurrentNotesValue] = React.useState(undefined);
  const NotesRef = React.createRef();
  const getIDValue = {
    Notes: (r) => JSON.stringify({ id: r?.id }),
  };
  const NotesIdSet = new Set(
    Array.isArray(Notes)
      ? Notes.map((r) => getIDValue.Notes?.(r))
      : getIDValue.Notes?.(Notes)
  );
  const categoryRecords = useDataStoreBinding({
    type: "collection",
    model: Category,
  }).items;
  const notesRecords = useDataStoreBinding({
    type: "collection",
    model: Notes0,
  }).items;
  const getDisplayValue = {
    categoryID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    Notes: (r) => `${r?.note ? r?.note + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    rating: [{ type: "Required" }],
    categoryID: [{ type: "Required" }],
    Notes: [],
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
          name,
          rating,
          categoryID,
          Notes,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
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
          const modelFieldsToSave = {
            name: modelFields.name,
            rating: modelFields.rating,
            categoryID: modelFields.categoryID,
          };
          const restaurant = await DataStore.save(
            new Restaurant(modelFieldsToSave)
          );
          const promises = [];
          promises.push(
            ...Notes.reduce((promises, original) => {
              promises.push(
                DataStore.save(
                  Notes.copyOf(original, (updated) => {
                    updated.restaurantID = restaurant.id;
                  })
                )
              );
              return promises;
            }, [])
          );
          await Promise.all(promises);
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
      {...getOverrideProps(overrides, "RestaurantCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              rating,
              categoryID,
              Notes,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Rating"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={rating}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              rating: value,
              categoryID,
              Notes,
            };
            const result = onChange(modelFields);
            value = result?.rating ?? value;
          }
          if (errors.rating?.hasError) {
            runValidationTasks("rating", value);
          }
          setRating(value);
        }}
        onBlur={() => runValidationTasks("rating", rating)}
        errorMessage={errors.rating?.errorMessage}
        hasError={errors.rating?.hasError}
        {...getOverrideProps(overrides, "rating")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              rating,
              categoryID: value,
              Notes,
            };
            const result = onChange(modelFields);
            value = result?.categoryID ?? value;
          }
          setCategoryID(value);
          setCurrentCategoryIDValue(undefined);
        }}
        currentFieldValue={currentCategoryIDValue}
        label={"Category id"}
        items={categoryID ? [categoryID] : []}
        hasError={errors?.categoryID?.hasError}
        errorMessage={errors?.categoryID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.categoryID(
                categoryRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentCategoryIDDisplayValue(
            value
              ? getDisplayValue.categoryID(
                  categoryRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentCategoryIDValue(value);
        }}
        inputFieldRef={categoryIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Category id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Category"
          value={currentCategoryIDDisplayValue}
          options={categoryRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.categoryID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentCategoryIDValue(id);
            setCurrentCategoryIDDisplayValue(label);
            runValidationTasks("categoryID", label);
          }}
          onClear={() => {
            setCurrentCategoryIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.categoryID?.hasError) {
              runValidationTasks("categoryID", value);
            }
            setCurrentCategoryIDDisplayValue(value);
            setCurrentCategoryIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("categoryID", currentCategoryIDValue)
          }
          errorMessage={errors.categoryID?.errorMessage}
          hasError={errors.categoryID?.hasError}
          ref={categoryIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "categoryID")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              rating,
              categoryID,
              Notes: values,
            };
            const result = onChange(modelFields);
            values = result?.Notes ?? values;
          }
          setNotes(values);
          setCurrentNotesValue(undefined);
          setCurrentNotesDisplayValue("");
        }}
        currentFieldValue={currentNotesValue}
        label={"Notes"}
        items={Notes}
        hasError={errors?.Notes?.hasError}
        errorMessage={errors?.Notes?.errorMessage}
        getBadgeText={getDisplayValue.Notes}
        setFieldValue={(model) => {
          setCurrentNotesDisplayValue(
            model ? getDisplayValue.Notes(model) : ""
          );
          setCurrentNotesValue(model);
        }}
        inputFieldRef={NotesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Notes"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Notes"
          value={currentNotesDisplayValue}
          options={notesRecords
            .filter((r) => !NotesIdSet.has(getIDValue.Notes?.(r)))
            .map((r) => ({
              id: getIDValue.Notes?.(r),
              label: getDisplayValue.Notes?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentNotesValue(
              notesRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentNotesDisplayValue(label);
            runValidationTasks("Notes", label);
          }}
          onClear={() => {
            setCurrentNotesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Notes?.hasError) {
              runValidationTasks("Notes", value);
            }
            setCurrentNotesDisplayValue(value);
            setCurrentNotesValue(undefined);
          }}
          onBlur={() => runValidationTasks("Notes", currentNotesDisplayValue)}
          errorMessage={errors.Notes?.errorMessage}
          hasError={errors.Notes?.hasError}
          ref={NotesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Notes")}
        ></Autocomplete>
      </ArrayField>
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
