import React, { useEffect, useState } from "react";
import axios from "axios";

// This is the way you import image src s
import logo from "../../assets/valuecase_logo.png";

// You can use plain CSS ...
import "./home.css";
import styled from "styled-components";

// styled components ...
const StyledButton = styled.button`
  border-radius: 4px;
  background: #ffa500;
  color: black;
  outline: none;
  border: 1px solid black;
  padding: 4px 8px;

  &:hover {
    background: #ffbb4f;
    cursor: pointer;
  }
`;

// or anything else :)

function Home() {
  const [apiPing, setApiPing] = useState("");
  const fileInput = React.createRef<HTMLInputElement>();

  const pingApi = (e?: any) => {
    if (e) e.preventDefault();

    // the call /api is proxied to the server > see vite.config.ts
    axios
      .get("/api")
      .then((res) => {
        setApiPing(res.data);
      })
      .catch((err) => {
        setApiPing("Error = " + err.toString());
      });
  };

  const uploadImage = (e: any) => {
    const file = fileInput.current?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file, file.name);
      axios
        .post("/api/images/upload", formData)
        .then((res) => {
          window.open(`/api/images/${res.data.id}`);
        })
        .catch((err) => {
          alert("Error = " + err.toString());
        });
    }
  };

  useEffect(() => {
    pingApi();
  }, []);

  return (
    <div className="home">
      <h1>Have fun 🐿</h1>
      <hr />
      <br />

      <img src={logo} className="home-logo" alt="logo" />
      <br />
      <br />
      <hr />
      <br />

      <code>{apiPing ?? "–"}</code>
      <br />
      <br />
      <StyledButton onClick={pingApi}>ping API</StyledButton>
      <hr />

      <input ref={fileInput} type={"file"} accept="image/png, image/jpeg" />
      <StyledButton onClick={uploadImage}>upload</StyledButton>
    </div>
  );
}

export default Home;
