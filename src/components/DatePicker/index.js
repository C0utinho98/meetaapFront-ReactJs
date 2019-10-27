import React, { useRef, useEffect, useState } from 'react';
import DatePickerMeetup from 'react-datepicker';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ name, placeholder, ...rest }) {
  const { fieldName, registerField, defaultValue } = useField(name);
  const [selected, setSelected] = useState(defaultValue);
  const ref = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <DatePickerMeetup
      name={fieldName}
      selected={selected}
      placeholderText={placeholder}
      onChange={date => setSelected(date)}
      ref={ref}
      {...rest}
    />
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

DatePicker.defaultProps = {
  placeholder: '',
};
