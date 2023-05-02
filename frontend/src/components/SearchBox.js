import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBox() {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword){
      navigate(`/?keyword=${keyword}&page=1`)
    } else {
      navigate(navigate(pathname))
    }
  };
  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        placeholder="Type to search..."
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Submit
      </Button>
    </Form>
  );
}

export default SearchBox;
