import { Field, FieldProps } from "formik";
import { InputHTMLAttributes } from "react";
import InputMask, { ReactInputMask } from "react-input-mask";

type TextFieldFormikProps = {
  error?: boolean;
  helperText?: string;
  mask?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextFieldFormik = ({
  className,
  mask,
  ...rest
}: TextFieldFormikProps): JSX.Element => {
  return (
    <Field name={rest.name}>
      {({ field, meta }: FieldProps) => {
        return (
          <>
            <InputMask
              className={`${className} w-full h-10 border-[2px] border-[#C5CED6] rounded-sm text-[#C3CFD9] placeholder:text-[#C3CFD9] indent-4 text-lg font-medium`}
              {...meta}
              mask={mask}
              maxLength={200}
              {...(field as any)}
              data-testid={rest.name}
              {...rest}
              onChange={(e) => {
                if (/ {2,}$/g.test(e.target.value)) {
                  e.preventDefault();
                } else {
                  field.onChange(e);
                }
              }}
              onBlur={(e) => {
                if (e.target.value.length > 0) {
                  e.target.value = e.target.value.trim();
                  field.value = e;
                  field.onChange(e);
                }
                field.onBlur(e);
              }}
            />

            {(rest.helperText || meta.error) &&
              !!meta.error &&
              meta.touched && (
                <div className="text-red-500 text-xs italic">{meta.error}</div>
              )}
          </>
        );
      }}
    </Field>
  );
};
export default TextFieldFormik;
