
/**
 * Type for FormState. 
 */
export interface FormState {
    [key: string]: any;
}

export type FormStateError<S extends FormState> = {
    [key in keyof S]?: string;
};

/**
 * Add an 'errors' attribute to FormState.
 */
export type WithErrors<S extends FormState> = S & {
    errors: FormStateError<S>;
}
