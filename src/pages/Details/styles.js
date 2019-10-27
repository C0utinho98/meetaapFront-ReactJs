import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  color: #fff;

  header {
    display: flex;
    align-self: stretch;
    align-items: center;
    justify-content: space-between;

    button {
      display: flex;
      align-self: flex-end;
      padding: 7px 12px;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      transition: background 0.2s;
      align-items: center;
      justify-content: center;
      svg {
        margin-right: 5px;
      }
    }

    button.edit {
      background: #4dbaf9;
      margin-left: 400px;
      &:hover {
        background: ${darken(0.06, '#4dbaf9')};
      }
    }
    button.cancel {
      background: #d44059;

      &:hover {
        background: ${darken(0.06, '#d44059')};
      }
    }
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;

  img {
    margin: 20px 0;
    width: 100%;
    height: 300px;
    border-radius: 5px;
  }

  p {
    flex: 1;
    font-size: 15px;
    line-height: 30px;
  }

  footer {
    margin-top: 20px;
    display: flex;
    flex-direction: row;

    span {
      display: flex;
      color: ${darken(0.5, '#fff')};
      font-size: 16px;
      align-items: center;
    }

    span.localization {
      margin-left: 25px;
    }
  }
`;
