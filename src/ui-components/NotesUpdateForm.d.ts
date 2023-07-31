/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Notes } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type NotesUpdateFormInputValues = {
    note?: string;
    restaurantID?: string;
    author?: string;
    authorEmail?: string;
};
export declare type NotesUpdateFormValidationValues = {
    note?: ValidationFunction<string>;
    restaurantID?: ValidationFunction<string>;
    author?: ValidationFunction<string>;
    authorEmail?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NotesUpdateFormOverridesProps = {
    NotesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    note?: PrimitiveOverrideProps<TextFieldProps>;
    restaurantID?: PrimitiveOverrideProps<AutocompleteProps>;
    author?: PrimitiveOverrideProps<TextFieldProps>;
    authorEmail?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NotesUpdateFormProps = React.PropsWithChildren<{
    overrides?: NotesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    notes?: Notes;
    onSubmit?: (fields: NotesUpdateFormInputValues) => NotesUpdateFormInputValues;
    onSuccess?: (fields: NotesUpdateFormInputValues) => void;
    onError?: (fields: NotesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NotesUpdateFormInputValues) => NotesUpdateFormInputValues;
    onValidate?: NotesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function NotesUpdateForm(props: NotesUpdateFormProps): React.ReactElement;
