/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Category, Dish, Notes } from "../API.ts";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type RestaurantCreateFormInputValues = {
    name?: string;
    rating?: number;
    notes?: Notes[];
    categories?: Category[];
    dishes?: Dish[];
};
export declare type RestaurantCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    rating?: ValidationFunction<number>;
    notes?: ValidationFunction<Notes>;
    categories?: ValidationFunction<Category>;
    dishes?: ValidationFunction<Dish>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RestaurantCreateFormOverridesProps = {
    RestaurantCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    rating?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<AutocompleteProps>;
    categories?: PrimitiveOverrideProps<AutocompleteProps>;
    dishes?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type RestaurantCreateFormProps = React.PropsWithChildren<{
    overrides?: RestaurantCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RestaurantCreateFormInputValues) => RestaurantCreateFormInputValues;
    onSuccess?: (fields: RestaurantCreateFormInputValues) => void;
    onError?: (fields: RestaurantCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RestaurantCreateFormInputValues) => RestaurantCreateFormInputValues;
    onValidate?: RestaurantCreateFormValidationValues;
} & React.CSSProperties>;
export default function RestaurantCreateForm(props: RestaurantCreateFormProps): React.ReactElement;
