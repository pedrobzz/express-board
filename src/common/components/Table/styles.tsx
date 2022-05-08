import styled from "styled-components";

export const Container = styled.div`
  overflow-x: auto;

  /* width */
  ::-webkit-scrollbar {
    height: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #303030;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #404040;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #505050;
  }
`;
