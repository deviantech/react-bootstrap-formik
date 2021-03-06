import React, { FC, useContext, useCallback } from "react";
import { useField, useFormikContext, FormikProps } from "formik";
import { Form } from "react-bootstrap";
import classnames from "classnames";

import { noop } from "../utils";
import { GroupContext } from "./Group";
import { FormCheckboxFieldProps } from "./types";

export const Radio: FC<FormCheckboxFieldProps> = ({
  custom,
  ...props
}: FormCheckboxFieldProps) => {
  const { values, errors, setFieldValue } = useFormikContext<
    FormikProps<FormCheckboxFieldProps>
  >();
  const { name: groupName = "" } = useContext(GroupContext);
  const [{ name, onBlur }] = useField(props);
  const isInvalid = !!errors[groupName];
  const handleChange = useCallback(
    (e) => {
      props.onChange!(e);
      setFieldValue(groupName, name);
    },
    [groupName, name, props.onChange, setFieldValue]
  );
  return (
    <Form.Check
      {...props}
      id={name}
      name={groupName}
      type="radio"
      className={classnames({ "is-invalid": isInvalid })}
      custom={custom}
    >
      <Form.Check.Input
        {...props}
        type="radio"
        checked={values[groupName] === name}
        isInvalid={isInvalid}
        onChange={handleChange}
        onBlur={onBlur}
      />
      <Form.Check.Label title={props.title}>{props.label}</Form.Check.Label>
    </Form.Check>
  );
};

Radio.defaultProps = {
  onChange: noop
};
