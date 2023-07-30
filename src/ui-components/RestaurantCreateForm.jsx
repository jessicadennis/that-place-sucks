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
import { Restaurant, Category, RestaurantCategory } from "../models";
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
    notes: [],
    Categories: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [rating, setRating] = React.useState(initialValues.rating);
  const [notes, setNotes] = React.useState(initialValues.notes);
  const [Categories, setCategories] = React.useState(initialValues.Categories);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setRating(initialValues.rating);
    setNotes(initialValues.notes);
    setCurrentNotesValue("");
    setCategories(initialValues.Categories);
    setCurrentCategoriesValue(undefined);
    setCurrentCategoriesDisplayValue("");
    setErrors({});
  };
  const [currentNotesValue, setCurrentNotesValue] = React.useState("");
  const notesRef = React.createRef();
  const [currentCategoriesDisplayValue, setCurrentCategoriesDisplayValue] =
    React.useState("");
  const [currentCategoriesValue, setCurrentCategoriesValue] =
    React.useState(undefined);
  const CategoriesRef = React.createRef();
  const getIDValue = {
    Categories: (r) => JSON.stringify({ id: r?.id }),
  };
  const CategoriesIdSet = new Set(
    Array.isArray(Categories)
      ? Categories.map((r) => getIDValue.Categories?.(r))
      : getIDValue.Categories?.(Categories)
  );
  const categoryRecords = useDataStoreBinding({
    type: "collection",
    model: Category,
  }).items;
  const getDisplayValue = {
    Categories: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    rating: [{ type: "Required" }],
    notes: [{ type: "Required" }],
    Categories: [
      { type: "Required", validationMessage: "Category is required." },
    ],
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
          notes,
          Categories,
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
            notes: modelFields.notes,
          };
          const restaurant = await DataStore.save(
            new Restaurant(modelFieldsToSave)
          );
          const promises = [];
          promises.push(
            ...Categories.reduce((promises, category) => {
              promises.push(
                DataStore.save(
                  new RestaurantCategory({
                    restaurant,
                    category,
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
              notes,
              Categories,
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
              notes,
              Categories,
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
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              rating,
              notes: values,
              Categories,
            };
            const result = onChange(modelFields);
            values = result?.notes ?? values;
          }
          setNotes(values);
          setCurrentNotesValue("");
        }}
        currentFieldValue={currentNotesValue}
        label={"Notes"}
        items={notes}
        hasError={errors?.notes?.hasError}
        errorMessage={errors?.notes?.errorMessage}
        setFieldValue={setCurrentNotesValue}
        inputFieldRef={notesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Notes"
          isRequired={true}
          isReadOnly={false}
          value={currentNotesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.notes?.hasError) {
              runValidationTasks("notes", value);
            }
            setCurrentNotesValue(value);
          }}
          onBlur={() => runValidationTasks("notes", currentNotesValue)}
          errorMessage={errors.notes?.errorMessage}
          hasError={errors.notes?.hasError}
          ref={notesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "notes")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              rating,
              notes,
              Categories: values,
            };
            const result = onChange(modelFields);
            values = result?.Categories ?? values;
          }
          setCategories(values);
          setCurrentCategoriesValue(undefined);
          setCurrentCategoriesDisplayValue("");
        }}
        currentFieldValue={currentCategoriesValue}
        label={"Categories"}
        items={Categories}
        hasError={errors?.Categories?.hasError}
        errorMessage={errors?.Categories?.errorMessage}
        getBadgeText={getDisplayValue.Categories}
        setFieldValue={(model) => {
          setCurrentCategoriesDisplayValue(
            model ? getDisplayValue.Categories(model) : ""
          );
          setCurrentCategoriesValue(model);
        }}
        inputFieldRef={CategoriesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Categories"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Category"
          value={currentCategoriesDisplayValue}
          options={categoryRecords
            .filter((r) => !CategoriesIdSet.has(getIDValue.Categories?.(r)))
            .map((r) => ({
              id: getIDValue.Categories?.(r),
              label: getDisplayValue.Categories?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentCategoriesValue(
              categoryRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentCategoriesDisplayValue(label);
            runValidationTasks("Categories", label);
          }}
          onClear={() => {
            setCurrentCategoriesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Categories?.hasError) {
              runValidationTasks("Categories", value);
            }
            setCurrentCategoriesDisplayValue(value);
            setCurrentCategoriesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Categories", currentCategoriesDisplayValue)
          }
          errorMessage={errors.Categories?.errorMessage}
          hasError={errors.Categories?.hasError}
          ref={CategoriesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Categories")}
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
