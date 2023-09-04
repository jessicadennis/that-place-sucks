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
  getCategory,
  listRestaurantCategories,
  listRestaurants,
  restaurantCategoriesByCategoryId,
} from "../graphql/queries";
import { API } from "aws-amplify";
import {
  createRestaurantCategory,
  deleteRestaurantCategory,
  updateCategory,
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
export default function CategoryUpdateForm(props) {
  const {
    id: idProp,
    category: categoryModelProp,
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
    restaurants: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [restaurants, setRestaurants] = React.useState(
    initialValues.restaurants
  );
  const [restaurantsLoading, setRestaurantsLoading] = React.useState(false);
  const [restaurantsRecords, setRestaurantsRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = categoryRecord
      ? { ...initialValues, ...categoryRecord, restaurants: linkedRestaurants }
      : initialValues;
    setName(cleanValues.name);
    setRestaurants(cleanValues.restaurants ?? []);
    setCurrentRestaurantsValue(undefined);
    setCurrentRestaurantsDisplayValue("");
    setErrors({});
  };
  const [categoryRecord, setCategoryRecord] = React.useState(categoryModelProp);
  const [linkedRestaurants, setLinkedRestaurants] = React.useState([]);
  const canUnlinkRestaurants = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getCategory,
              variables: { id: idProp },
            })
          )?.data?.getCategory
        : categoryModelProp;
      const linkedRestaurants = record
        ? (
            await API.graphql({
              query: restaurantCategoriesByCategoryId,
              variables: {
                categoryId: record.id,
              },
            })
          ).data.restaurantCategoriesByCategoryId.items.map((t) => t.restaurant)
        : [];
      setLinkedRestaurants(linkedRestaurants);
      setCategoryRecord(record);
    };
    queryData();
  }, [idProp, categoryModelProp]);
  React.useEffect(resetStateValues, [categoryRecord, linkedRestaurants]);
  const [currentRestaurantsDisplayValue, setCurrentRestaurantsDisplayValue] =
    React.useState("");
  const [currentRestaurantsValue, setCurrentRestaurantsValue] =
    React.useState(undefined);
  const restaurantsRef = React.createRef();
  const getIDValue = {
    restaurants: (r) => JSON.stringify({ id: r?.id }),
  };
  const restaurantsIdSet = new Set(
    Array.isArray(restaurants)
      ? restaurants.map((r) => getIDValue.restaurants?.(r))
      : getIDValue.restaurants?.(restaurants)
  );
  const getDisplayValue = {
    restaurants: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    restaurants: [],
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
  const fetchRestaurantsRecords = async (value) => {
    setRestaurantsLoading(true);
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
          query: listRestaurants,
          variables,
        })
      )?.data?.listRestaurants?.items;
      var loaded = result.filter(
        (item) => !restaurantsIdSet.has(getIDValue.restaurants?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setRestaurantsRecords(newOptions.slice(0, autocompleteLength));
    setRestaurantsLoading(false);
  };
  React.useEffect(() => {
    fetchRestaurantsRecords("");
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
          restaurants: restaurants ?? null,
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
          const restaurantsToLinkMap = new Map();
          const restaurantsToUnLinkMap = new Map();
          const restaurantsMap = new Map();
          const linkedRestaurantsMap = new Map();
          restaurants.forEach((r) => {
            const count = restaurantsMap.get(getIDValue.restaurants?.(r));
            const newCount = count ? count + 1 : 1;
            restaurantsMap.set(getIDValue.restaurants?.(r), newCount);
          });
          linkedRestaurants.forEach((r) => {
            const count = linkedRestaurantsMap.get(getIDValue.restaurants?.(r));
            const newCount = count ? count + 1 : 1;
            linkedRestaurantsMap.set(getIDValue.restaurants?.(r), newCount);
          });
          linkedRestaurantsMap.forEach((count, id) => {
            const newCount = restaurantsMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                restaurantsToUnLinkMap.set(id, diffCount);
              }
            } else {
              restaurantsToUnLinkMap.set(id, count);
            }
          });
          restaurantsMap.forEach((count, id) => {
            const originalCount = linkedRestaurantsMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                restaurantsToLinkMap.set(id, diffCount);
              }
            } else {
              restaurantsToLinkMap.set(id, count);
            }
          });
          restaurantsToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const restaurantCategoryRecords = (
              await API.graphql({
                query: listRestaurantCategories,
                variables: {
                  filter: {
                    and: [
                      { restaurantId: { eq: recordKeys.id } },
                      { categoryId: { eq: categoryRecord.id } },
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
          restaurantsToLinkMap.forEach((count, id) => {
            const restaurantToLink = restaurantRecords.find((r) =>
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
                      categoryId: categoryRecord.id,
                      restaurantId: restaurantToLink.id,
                    },
                  },
                })
              );
            }
          });
          const modelFieldsToSave = {
            name: modelFields.name,
          };
          promises.push(
            API.graphql({
              query: updateCategory,
              variables: {
                input: {
                  id: categoryRecord.id,
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
      {...getOverrideProps(overrides, "CategoryUpdateForm")}
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
              restaurants,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              restaurants: values,
            };
            const result = onChange(modelFields);
            values = result?.restaurants ?? values;
          }
          setRestaurants(values);
          setCurrentRestaurantsValue(undefined);
          setCurrentRestaurantsDisplayValue("");
        }}
        currentFieldValue={currentRestaurantsValue}
        label={"Restaurants"}
        items={restaurants}
        hasError={errors?.restaurants?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("restaurants", currentRestaurantsValue)
        }
        errorMessage={errors?.restaurants?.errorMessage}
        getBadgeText={getDisplayValue.restaurants}
        setFieldValue={(model) => {
          setCurrentRestaurantsDisplayValue(
            model ? getDisplayValue.restaurants(model) : ""
          );
          setCurrentRestaurantsValue(model);
        }}
        inputFieldRef={restaurantsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Restaurants"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Restaurant"
          value={currentRestaurantsDisplayValue}
          options={restaurantsRecords.map((r) => ({
            id: getIDValue.restaurants?.(r),
            label: getDisplayValue.restaurants?.(r),
          }))}
          isLoading={restaurantsLoading}
          onSelect={({ id, label }) => {
            setCurrentRestaurantsValue(
              restaurantsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentRestaurantsDisplayValue(label);
            runValidationTasks("restaurants", label);
          }}
          onClear={() => {
            setCurrentRestaurantsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchRestaurantsRecords(value);
            if (errors.restaurants?.hasError) {
              runValidationTasks("restaurants", value);
            }
            setCurrentRestaurantsDisplayValue(value);
            setCurrentRestaurantsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("restaurants", currentRestaurantsDisplayValue)
          }
          errorMessage={errors.restaurants?.errorMessage}
          hasError={errors.restaurants?.hasError}
          ref={restaurantsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "restaurants")}
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
          isDisabled={!(idProp || categoryModelProp)}
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
              !(idProp || categoryModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
