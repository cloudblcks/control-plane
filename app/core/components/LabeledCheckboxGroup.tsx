import { MultiSelect } from "@mantine/core"
import { configOptions } from "final-form"
import PageLoader from "next/dist/client/page-loader"
import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef, useState, Suspense } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { optional } from "zod"

export interface LabeledSelectProps extends PropsWithoutRef<JSX.IntrinsicElements["select"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  options: Array<LabeledCheckboxGroupOption>
  onSelectionChange: (selected: Array<string>) => void
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
      props.onSelectionChange(event.target.value as Array<string>)
    }

    return (
      <MultiSelect
        data={props.options}
        label={label}
        placeholder="Pick all that you need"
        onChange={handleChange}
        value={selectedValue}
      />
    )
  }
)

export default LabeledCheckboxGroup
