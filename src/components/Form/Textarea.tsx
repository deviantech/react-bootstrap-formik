import React, { FC, useCallback } from "react";
import { Form } from "react-bootstrap";
import { useField } from "formik";

import { Group } from "./Group";
import { FormTextareaFieldProps } from "./types";

export const Textarea: FC<FormTextareaFieldProps> = ({
  label,
  helpText,
  ...props
}: FormTextareaFieldProps) => {
  const [{ name, value, onChange, onBlur }, { error }] = useField(props);
  const handleChange = useCallback((e) => (props.onChange!(e), onChange(e)), [
    onChange,
    props.onChange
  ]);
  return (
    <Group controlId={name} label={label} helpText={helpText} error={error}>
      <Form.Control
        {...props}
        as="textarea"
        name={name}
        value={value?.toString()}
        isInvalid={!!error}
        onChange={handleChange}
        onBlur={onBlur}
      />
    </Group>
  );
};

Textarea.defaultProps = {
  onChange: () => null
};