import axios from "axios";
import React from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

export default function App() {

  const API_URL = process.env.REACT_APP_BASE_URL;

  const [student, setStudent] = React.useState(null);
  const [status, setStatus] = React.useState({ message: "" });

  React.useEffect(() => {

    axios.get(`${API_URL}/students/random`).then(res => {

      const students = res.data;
      if (!students) {
        return setStatus({
          message: "No students found",
        });
      }

      setStudent(students);

    }).catch(err => {
      setStatus({
        message: "Error fetching students",
      });
    });

  }, [API_URL, status]);

  function Loader({ width, color }) {
    return (<LoaderContainer><ThreeDots width={width} color={color} /></LoaderContainer>);
  }

  return (
    <PageContainer>
      {
        status.message ?
        
          <Title size={"2.5rem"} bold >{status.message}</Title>

          :

          student ?

            <ResultContainer>
              <Title size={"2.5rem"} bold>The winner was:</Title>
              <Title size={"1rem"} margin>{student.name}</Title>
              <Button onClick={() => setStatus({ reload: true })}>Draw Again</Button>
            </ResultContainer>

            :

            <Loader width={250} color={"white"} />
      }
    </PageContainer>
  )
};

const PageContainer = styled.div`

  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--my-color);
`;

const Title = styled.h1`

  color: white;
  font-size: ${props => props.size};
  font-weight: ${props => props.bold ? "bold" : "normal"};
  margin-top: ${props => props.margin ? "50px" : "0"};
  font-family: var(--my-font);
`;

const LoaderContainer = styled.div`

  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultContainer = styled.div`

  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Button = styled.button`

  width: 20%;
  height: 5%;
  display: flex;
  color: var(--my-color);
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 50px;
  font-weight: bold;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  font-family: var(--my-font);

  @media (max-width: 768px) {
    width: 50%;
  }
`;