import React, { useState, useRef, useEffect } from 'react';
import { MdPhotoCamera } from 'react-icons/md';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import api from '../../../services/api';
import { Container } from './styles';

export default function ImageInput({ name, source }) {
  const { defaultValue, registerField } = useField('banner');
  const [file, setFile] = useState(
    (source && source.id) || (defaultValue && defaultValue.id)
  );
  const [preview, setPreview] = useState(
    (source && source.url) || (defaultValue && defaultValue.url)
  );
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [name, ref.current]);// eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="file">
        {!preview ? (
          <>
            <MdPhotoCamera size={50} />
            Selecionar imagem
          </>
        ) : (
          <img src={preview} alt="" />
        )}
        <input
          type="file"
          id="file"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  source: PropTypes.shape({ id: PropTypes.string, url: PropTypes.string }),
};

ImageInput.defaultProps = {
  source: {},
};
