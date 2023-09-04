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
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import {
  getRestaurant,
  listCategories,
  listDishes,
  listNotes,
  listRestaurantCategories,
  restaurantCategoriesByRestaurantId,
} from "../graphql/queries";
import { API } from "aws-amplify";
import {
  createRestaurantCategory,
  deleteRestaurantCategory,
  updateDish,
  updateNotes,
  updateRestaurant,
} from "../graphql/mutations";
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
  runValidationTasks,
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
    const { hasError } = runValidationTasks();
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
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function RestaurantUpdateForm(props) {
  const {
    id: idProp,
    restaurant: restaurantModelProp,
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
    categories: [],
    dishes: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [rating, setRating] = React.useState(initialValues.rating);
  const [notes, setNotes] = React.useState(initialValues.notes);
  const [notesLoading, setNotesLoading] = React.useState(false);
  const [notesRecords, setNotesRecords] = React.useState([]);
  const [categories, setCategories] = React.useState(initialValues.categories);
  const [categoriesLoading, setCategoriesLoading] = React.useState(false);
  const [categoriesRecords, setCategoriesRecords] = React.useState([]);
  const [dishes, setDishes] = React.useState(initialValues.dishes);
  const [dishesLoading, setDishesLoading] = React.useState(false);
  const [dishesRecords, setDishesRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = restaurantRecord
      ? {
          ...initialValues,
          ...restaurantRecord,
          notes: linkedNotes,
          categories: linkedCategories,
          dishes: linkedDishes,
        }
      : initialValues;
    setName(cleanValues.name);
    setRating(cleanValues.rating);
    setNotes(cleanValues.notes ?? []);
    setCurrentNotesValue(undefined);
    setCurrentNotesDisplayValue("");
    setCategories(cleanValues.categories ?? []);
    setCurrentCategoriesValue(undefined);
    setCurrentCategoriesDisplayValue("");
    setDishes(cleanValues.dishes ?? []);
    setCurrentDishesValue(undefined);
    setCurrentDishesDisplayValue("");
    setErrors({});
  };
  const [restaurantRecord, setRestaurantRecord] =
    React.useState(restaurantModelProp);
  const [linkedNotes, setLinkedNotes] = React.useState([]);
  const canUnlinkNotes = false;
  const [linkedCategories, setLinkedCategories] = React.useState([]);
  const canUnlinkCategories = false;
  const [linkedDishes, setLinkedDishes] = React.useState([]);
  const canUnlinkDishes = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getRestaurant,
              variables: { id: idProp },
            })
          )?.data?.getRestaurant
        : restaurantModelProp;
      const linkedNotes = record?.notes?.items ?? [];
      setLinkedNotes(linkedNotes);
      const linkedCategories = record
        ? (
            await API.graphql({
              query: restaurantCategoriesByRestaurantId,
              variables: {
                restaurantId: record.id,
              },
            })
          ).data.restaurantCategoriesByRestaurantId.items.map((t) => t.category)
        : [];
      setLinkedCategories(linkedCategories);
      const linkedDishes = record?.dishes?.items ?? [];
      setLinkedDishes(linkedDishes);
      setRestaurantRecord(record);
    };
    queryData();
  }, [idProp, restaurantModelProp]);
  React.useEffect(resetStateValues, [
    restaurantRecord,
    linkedNotes,
    linkedCategories,
    linkedDishes,
  ]);
  const [currentNotesDisplayValue, setCurrentNotesDisplayValue] =
    React.useState("");
  const [currentNotesValue, setCurrentNotesValue] = React.useState(undefined);
  const notesRef = React.createRef();
  const [currentCategoriesDisplayValue, setCurrentCategoriesDisplayValue] =
    React.useState("");
  const [currentCategoriesValue, setCurrentCategoriesValue] =
    React.useState(undefined);
  const categoriesRef = React.createRef();
  const [currentDishesDisplayValue, setCurrentDishesDisplayValue] =
    React.useState("");
  const [currentDishesValue, setCurrentDishesValue] = React.useState(undefined);
  const dishesRef = React.createRef();
  const getIDValue = {
    notes: (r) => JSON.stringify({ id: r?.id }),
    categories: (r) => JSON.stringify({ id: r?.id }),
    dishes: (r) => JSON.stringify({ id: r?.id }),
  };
  const notesIdSet = new Set(
    Array.isArray(notes)
      ? notes.map((r) => getIDValue.notes?.(r))
      : getIDValue.notes?.(notes)
  );
  const categoriesIdSet = new Set(
    Array.isArray(categories)
      ? categories.map((r) => getIDValue.categories?.(r))
      : getIDValue.categories?.(categories)
  );
  const dishesIdSet = new Set(
    Array.isArray(dishes)
      ? dishes.map((r) => getIDValue.dishes?.(r))
      : getIDValue.dishes?.(dishes)
  );
  const getDisplayValue = {
    notes: (r) => `${r?.note ? r?.note + " - " : ""}${r?.id}`,
    categories: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    dishes: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    rating: [{ type: "Required" }],
    notes: [],
    categories: [],
    dishes: [],
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
  const fetchNotesRecords = async (value) => {
    setNotesLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ note: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listNotes,
          variables,
        })
      )?.data?.listNotes?.items;
      var loaded = result.filter(
        (item) => !notesIdSet.has(getIDValue.notes?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setNotesRecords(newOptions.slice(0, autocompleteLength));
    setNotesLoading(false);
  };
  const fetchCategoriesRecords = async (value) => {
    setCategoriesLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ name: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listCategories,
          variables,
        })
      )?.data?.listCategories?.items;
      var loaded = result.filter(
        (item) => !categoriesIdSet.has(getIDValue.categories?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setCategoriesRecords(newOptions.slice(0, autocompleteLength));
    setCategoriesLoading(false);
  };
  const fetchDishesRecords = async (value) => {
    setDishesLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ name: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listDishes,
          variables,
        })
      )?.data?.listDishes?.items;
      var loaded = result.filter(
        (item) => !dishesIdSet.has(getIDValue.dishes?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setDishesRecords(newOptions.slice(0, autocompleteLength));
    setDishesLoading(false);
  };
  React.useEffect(() => {
    fetchNotesRecords("");
    fetchCategoriesRecords("");
    fetchDishesRecords("");
  }, []);
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
          notes: notes ?? null,
          categories: categories ?? null,
          dishes: dishes ?? null,
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
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          const promises = [];
          const notesToLink = [];
          const notesToUnLink = [];
          const notesSet = new Set();
          const linkedNotesSet = new Set();
          notes.forEach((r) => notesSet.add(getIDValue.notes?.(r)));
          linkedNotes.forEach((r) => linkedNotesSet.add(getIDValue.notes?.(r)));
          linkedNotes.forEach((r) => {
            if (!notesSet.has(getIDValue.notes?.(r))) {
              notesToUnLink.push(r);
            }
          });
          notes.forEach((r) => {
            if (!linkedNotesSet.has(getIDValue.notes?.(r))) {
              notesToLink.push(r);
            }
          });
          notesToUnLink.forEach((original) => {
            if (!canUnlinkNotes) {
              throw Error(
                `Notes ${original.id} cannot be unlinked from Restaurant because restaurantID is a required field.`
              );
            }
            promises.push(
              API.graphql({
                query: updateNotes,
                variables: {
                  input: {
                    id: original.id,
                    restaurantID: null,
                  },
                },
              })
            );
          });
          notesToLink.forEach((original) => {
            promises.push(
              API.graphql({
                query: updateNotes,
                variables: {
                  input: {
                    id: original.id,
                    restaurantID: restaurantRecord.id,
                  },
                },
              })
            );
          });
          const categoriesToLinkMap = new Map();
          const categoriesToUnLinkMap = new Map();
          const categoriesMap = new Map();
          const linkedCategoriesMap = new Map();
          categories.forEach((r) => {
            const count = categoriesMap.get(getIDValue.categories?.(r));
            const newCount = count ? count + 1 : 1;
            categoriesMap.set(getIDValue.categories?.(r), newCount);
          });
          linkedCategories.forEach((r) => {
            const count = linkedCategoriesMap.get(getIDValue.categories?.(r));
            const newCount = count ? count + 1 : 1;
            linkedCategoriesMap.set(getIDValue.categories?.(r), newCount);
          });
          linkedCategoriesMap.forEach((count, id) => {
            const newCount = categoriesMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                categoriesToUnLinkMap.set(id, diffCount);
              }
            } else {
              categoriesToUnLinkMap.set(id, count);
            }
          });
          categoriesMap.forEach((count, id) => {
            const originalCount = linkedCategoriesMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                categoriesToLinkMap.set(id, diffCount);
              }
            } else {
              categoriesToLinkMap.set(id, count);
            }
          });
          categoriesToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const restaurantCategoryRecords = (
              await API.graphql({
                query: listRestaurantCategories,
                variables: {
                  filter: {
                    and: [
                      { categoryId: { eq: recordKeys.id } },
                      { restaurantId: { eq: restaurantRecord.id } },
                    ],
                  },
                },
              })
            )?.data?.listRestaurantCategories?.items;
            for (let i = 0; i < count; i++) {
              promises.push(
                API.graphql({
                  query: deleteRestaurantCategory,
                  variables: {
                    input: {
                      id: restaurantCategoryRecords[i].id,
                    },
                  },
                })
              );
            }
          });
          categoriesToLinkMap.forEach((count, id) => {
            const categoryToLink = categoryRecords.find((r) =>
              Object.entries(JSON.parse(id)).every(
                ([key, value]) => r[key] === value
              )
            );
            for (let i = count; i > 0; i--) {
              promises.push(
                API.graphql({
                  query: createRestaurantCategory,
                  variables: {
                    input: {
                      restaurantId: restaurantRecord.id,
                      categoryId: categoryToLink.id,
                    },
                  },
                })
              );
            }
          });
          const dishesToLink = [];
          const dishesToUnLink = [];
          const dishesSet = new Set();
          const linkedDishesSet = new Set();
          dishes.forEach((r) => dishesSet.add(getIDValue.dishes?.(r)));
          linkedDishes.forEach((r) =>
            linkedDishesSet.add(getIDValue.dishes?.(r))
          );
          linkedDishes.forEach((r) => {
            if (!dishesSet.has(getIDValue.dishes?.(r))) {
              dishesToUnLink.push(r);
            }
          });
          dishes.forEach((r) => {
            if (!linkedDishesSet.has(getIDValue.dishes?.(r))) {
              dishesToLink.push(r);
            }
          });
          dishesToUnLink.forEach((original) => {
            if (!canUnlinkDishes) {
              throw Error(
                `Dish ${original.id} cannot be unlinked from Restaurant because restaurantID is a required field.`
              );
            }
            promises.push(
              API.graphql({
                query: updateDish,
                variables: {
                  input: {
                    id: original.id,
                    restaurantID: null,
                  },
                },
              })
            );
          });
          dishesToLink.forEach((original) => {
            promises.push(
              API.graphql({
                query: updateDish,
                variables: {
                  input: {
                    id: original.id,
                    restaurantID: restaurantRecord.id,
                  },
                },
              })
            );
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            rating: modelFields.rating,
          };
          promises.push(
            API.graphql({
              query: updateRestaurant,
              variables: {
                input: {
                  id: restaurantRecord.id,
                  ...modelFieldsToSave,
                },
              },
            })
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "RestaurantUpdateForm")}
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
              categories,
              dishes,
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
              categories,
              dishes,
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
              categories,
              dishes,
            };
            const result = onChange(modelFields);
            values = result?.notes ?? values;
          }
          setNotes(values);
          setCurrentNotesValue(undefined);
          setCurrentNotesDisplayValue("");
        }}
        currentFieldValue={currentNotesValue}
        label={"Notes"}
        items={notes}
        hasError={errors?.notes?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("notes", currentNotesValue)
        }
        errorMessage={errors?.notes?.errorMessage}
        getBadgeText={getDisplayValue.notes}
        setFieldValue={(model) => {
          setCurrentNotesDisplayValue(
            model ? getDisplayValue.notes(model) : ""
          );
          setCurrentNotesValue(model);
        }}
        inputFieldRef={notesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Notes"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Notes"
          value={currentNotesDisplayValue}
          options={notesRecords
            .filter((r) => !notesIdSet.has(getIDValue.notes?.(r)))
            .map((r) => ({
              id: getIDValue.notes?.(r),
              label: getDisplayValue.notes?.(r),
            }))}
          isLoading={notesLoading}
          onSelect={({ id, label }) => {
            setCurrentNotesValue(
              notesRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentNotesDisplayValue(label);
            runValidationTasks("notes", label);
          }}
          onClear={() => {
            setCurrentNotesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchNotesRecords(value);
            if (errors.notes?.hasError) {
              runValidationTasks("notes", value);
            }
            setCurrentNotesDisplayValue(value);
            setCurrentNotesValue(undefined);
          }}
          onBlur={() => runValidationTasks("notes", currentNotesDisplayValue)}
          errorMessage={errors.notes?.errorMessage}
          hasError={errors.notes?.hasError}
          ref={notesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "notes")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              rating,
              notes,
              categories: values,
              dishes,
            };
            const result = onChange(modelFields);
            values = result?.categories ?? values;
          }
          setCategories(values);
          setCurrentCategoriesValue(undefined);
          setCurrentCategoriesDisplayValue("");
        }}
        currentFieldValue={currentCategoriesValue}
        label={"Categories"}
        items={categories}
        hasError={errors?.categories?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("categories", currentCategoriesValue)
        }
        errorMessage={errors?.categories?.errorMessage}
        getBadgeText={getDisplayValue.categories}
        setFieldValue={(model) => {
          setCurrentCategoriesDisplayValue(
            model ? getDisplayValue.categories(model) : ""
          );
          setCurrentCategoriesValue(model);
        }}
        inputFieldRef={categoriesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Categories"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Category"
          value={currentCategoriesDisplayValue}
          options={categoriesRecords.map((r) => ({
            id: getIDValue.categories?.(r),
            label: getDisplayValue.categories?.(r),
          }))}
          isLoading={categoriesLoading}
          onSelect={({ id, label }) => {
            setCurrentCategoriesValue(
              categoriesRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentCategoriesDisplayValue(label);
            runValidationTasks("categories", label);
          }}
          onClear={() => {
            setCurrentCategoriesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchCategoriesRecords(value);
            if (errors.categories?.hasError) {
              runValidationTasks("categories", value);
            }
            setCurrentCategoriesDisplayValue(value);
            setCurrentCategoriesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("categories", currentCategoriesDisplayValue)
          }
          errorMessage={errors.categories?.errorMessage}
          hasError={errors.categories?.hasError}
          ref={categoriesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "categories")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              rating,
              notes,
              categories,
              dishes: values,
            };
            const result = onChange(modelFields);
            values = result?.dishes ?? values;
          }
          setDishes(values);
          setCurrentDishesValue(undefined);
          setCurrentDishesDisplayValue("");
        }}
        currentFieldValue={currentDishesValue}
        label={"Dishes"}
        items={dishes}
        hasError={errors?.dishes?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("dishes", currentDishesValue)
        }
        errorMessage={errors?.dishes?.errorMessage}
        getBadgeText={getDisplayValue.dishes}
        setFieldValue={(model) => {
          setCurrentDishesDisplayValue(
            model ? getDisplayValue.dishes(model) : ""
          );
          setCurrentDishesValue(model);
        }}
        inputFieldRef={dishesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Dishes"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Dish"
          value={currentDishesDisplayValue}
          options={dishesRecords
            .filter((r) => !dishesIdSet.has(getIDValue.dishes?.(r)))
            .map((r) => ({
              id: getIDValue.dishes?.(r),
              label: getDisplayValue.dishes?.(r),
            }))}
          isLoading={dishesLoading}
          onSelect={({ id, label }) => {
            setCurrentDishesValue(
              dishesRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentDishesDisplayValue(label);
            runValidationTasks("dishes", label);
          }}
          onClear={() => {
            setCurrentDishesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchDishesRecords(value);
            if (errors.dishes?.hasError) {
              runValidationTasks("dishes", value);
            }
            setCurrentDishesDisplayValue(value);
            setCurrentDishesValue(undefined);
          }}
          onBlur={() => runValidationTasks("dishes", currentDishesDisplayValue)}
          errorMessage={errors.dishes?.errorMessage}
          hasError={errors.dishes?.hasError}
          ref={dishesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "dishes")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || restaurantModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || restaurantModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
