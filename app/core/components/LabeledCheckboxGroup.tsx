import { configOptions } from "final-form"
import { Chip, FormControl, Input, InputLabel, MenuItem, Select } from "material-ui-core"
import PageLoader from "next/dist/client/page-loader"
import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef, useState, Suspense } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { optional } from "zod"
// import FormControl from "material-ui/core/FormControl"

export interface LabeledSelectProps extends PropsWithoutRef<JSX.IntrinsicElements["select"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  options: Array<LabeledCheckboxGroupOption>
  onSelectionChange: (selected: Array<LabeledCheckboxGroupOption>) => void
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export interface LabeledCheckboxGroupOption {
  label: string
  value: string
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export const LabeledCheckboxGroup = forwardRef<HTMLSelectElement, LabeledSelectProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, { ...fieldProps, })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    const [selectedValue, setSelectedValue] = useState([])
    function handleChange(event) {
      setSelectedValue(event.target.value);
      props.onSelectionChange(selectedValue)
    }

    return (
      <FormControl>
        <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>
        <Select
          {...input}
          multiple
          value={selectedValue}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          ref={ref}
          renderValue={(selected: Array<string>) => (
            <div>
              {selected.map(value => (
                <Chip key={value} label={props.options.find((option) => { return (option.value === value) })?.label} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {props.options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl >
    )
  }
)

export default LabeledCheckboxGroup
