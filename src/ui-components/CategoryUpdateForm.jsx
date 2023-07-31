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
import { Category, Restaurant } from "../models";
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
    Restaurants: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [Restaurants, setRestaurants] = React.useState(
    initialValues.Restaurants
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = categoryRecord
      ? { ...initialValues, ...categoryRecord, Restaurants: linkedRestaurants }
      : initialValues;
    setName(cleanValues.name);
    setRestaurants(cleanValues.Restaurants ?? []);
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
        ? await DataStore.query(Category, idProp)
        : categoryModelProp;
      setCategoryRecord(record);
      const linkedRestaurants = record
        ? await record.Restaurants.toArray()
        : [];
      setLinkedRestaurants(linkedRestaurants);
    };
    queryData();
  }, [idProp, categoryModelProp]);
  React.useEffect(resetStateValues, [categoryRecord, linkedRestaurants]);
  const [currentRestaurantsDisplayValue, setCurrentRestaurantsDisplayValue] =
    React.useState("");
  const [currentRestaurantsValue, setCurrentRestaurantsValue] =
    React.useState(undefined);
  const RestaurantsRef = React.createRef();
  const getIDValue = {
    Restaurants: (r) => JSON.stringify({ id: r?.id }),
  };
  const RestaurantsIdSet = new Set(
    Array.isArray(Restaurants)
      ? Restaurants.map((r) => getIDValue.Restaurants?.(r))
      : getIDValue.Restaurants?.(Restaurants)
  );
  const restaurantRecords = useDataStoreBinding({
    type: "collection",
    model: Restaurant,
  }).items;
  const getDisplayValue = {
    Restaurants: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    Restaurants: [],
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
          Restaurants,
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
          const promises = [];
          const restaurantsToLink = [];
          const restaurantsToUnLink = [];
          const restaurantsSet = new Set();
          const linkedRestaurantsSet = new Set();
          Restaurants.forEach((r) =>
            restaurantsSet.add(getIDValue.Restaurants?.(r))
          );
          linkedRestaurants.forEach((r) =>
            linkedRestaurantsSet.add(getIDValue.Restaurants?.(r))
          );
          linkedRestaurants.forEach((r) => {
            if (!restaurantsSet.has(getIDValue.Restaurants?.(r))) {
              restaurantsToUnLink.push(r);
            }
          });
          Restaurants.forEach((r) => {
            if (!linkedRestaurantsSet.has(getIDValue.Restaurants?.(r))) {
              restaurantsToLink.push(r);
            }
          });
          restaurantsToUnLink.forEach((original) => {
            if (!canUnlinkRestaurants) {
              throw Error(
                `Restaurant ${original.id} cannot be unlinked from Category because categoryID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Restaurant.copyOf(original, (updated) => {
                  updated.categoryID = null;
                })
              )
            );
          });
          restaurantsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Restaurant.copyOf(original, (updated) => {
                  updated.categoryID = categoryRecord.id;
                })
              )
            );
          });
          const modelFieldsToSave = {
            name: modelFields.name,
          };
          promises.push(
            DataStore.save(
              Category.copyOf(categoryRecord, (updated) => {
                Object.assign(updated, modelFieldsToSave);
              })
            )
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
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
              Restaurants,
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
              Restaurants: values,
            };
            const result = onChange(modelFields);
            values = result?.Restaurants ?? values;
          }
          setRestaurants(values);
          setCurrentRestaurantsValue(undefined);
          setCurrentRestaurantsDisplayValue("");
        }}
        currentFieldValue={currentRestaurantsValue}
        label={"Restaurants"}
        items={Restaurants}
        hasError={errors?.Restaurants?.hasError}
        errorMessage={errors?.Restaurants?.errorMessage}
        getBadgeText={getDisplayValue.Restaurants}
        setFieldValue={(model) => {
          setCurrentRestaurantsDisplayValue(
            model ? getDisplayValue.Restaurants(model) : ""
          );
          setCurrentRestaurantsValue(model);
        }}
        inputFieldRef={RestaurantsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Restaurants"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Restaurant"
          value={currentRestaurantsDisplayValue}
          options={restaurantRecords
            .filter((r) => !RestaurantsIdSet.has(getIDValue.Restaurants?.(r)))
            .map((r) => ({
              id: getIDValue.Restaurants?.(r),
              label: getDisplayValue.Restaurants?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentRestaurantsValue(
              restaurantRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentRestaurantsDisplayValue(label);
            runValidationTasks("Restaurants", label);
          }}
          onClear={() => {
            setCurrentRestaurantsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Restaurants?.hasError) {
              runValidationTasks("Restaurants", value);
            }
            setCurrentRestaurantsDisplayValue(value);
            setCurrentRestaurantsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Restaurants", currentRestaurantsDisplayValue)
          }
          errorMessage={errors.Restaurants?.errorMessage}
          hasError={errors.Restaurants?.hasError}
          ref={RestaurantsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Restaurants")}
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
