import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"

export interface LabeledSelectProps extends PropsWithoutRef<JSX.IntrinsicElements["select"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  options: Array<LabeledSelectOption>
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export interface LabeledSelectOption {
  label: string
  value: string
}


export const LabeledSelectField = forwardRef<HTMLSelectElement, LabeledSelectProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, { ...fieldProps, })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div {...outerProps}>
        <label {...labelProps}>
          {label}
          <select {...input} disabled={submitting} {...props} ref={ref} >
            {
              props.options.map((item) =>
                <option key={item.value} value={item.value}>{item.label}</option>)
            }
          </select>
        </label>

        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}

        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-size: 1rem;
          }
          input {
            font-size: 1rem;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            border: 1px solid purple;
            appearance: none;
            margin-top: 0.5rem;
          }
        `}</style>
      </div>
    )
  }
)

export default LabeledSelectField
