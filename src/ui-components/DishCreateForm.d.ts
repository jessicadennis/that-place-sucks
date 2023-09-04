/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DishCreateFormInputValues = {
    name?: string;
    rating?: number;
    restaurantID?: string;
};
export declare type DishCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    rating?: ValidationFunction<number>;
    restaurantID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DishCreateFormOverridesProps = {
    DishCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    rating?: PrimitiveOverrideProps<TextFieldProps>;
    restaurantID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type DishCreateFormProps = React.PropsWithChildren<{
    overrides?: DishCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DishCreateFormInputValues) => DishCreateFormInputValues;
    onSuccess?: (fields: DishCreateFormInputValues) => void;
    onError?: (fields: DishCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DishCreateFormInputValues) => DishCreateFormInputValues;
    onValidate?: DishCreateFormValidationValues;
} & React.CSSProperties>;
export default function DishCreateForm(props: DishCreateFormProps): React.ReactElement;
