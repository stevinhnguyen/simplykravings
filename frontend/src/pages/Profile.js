import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";

function Profile() {
  const navigate = useNavigate();

  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfrim] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrder, error: errorOrder, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (
        !user ||
        !user.email ||
        !user.first_name ||
        !user.last_name ||
        success ||
        userInfo._id !== user._id
      ) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setFirst_name(user.first_name);
        setLast_name(user.last_name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Passwords do not match!");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name..."
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name..."
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password Again..."
              value={confirm}
              onChange={(e) => setConfrim(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrder ? (
          <Loader />
        ) : errorOrder ? (
          <Message variant="danger">{errorOrder}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <p>
                        {order.paidAt.substring(0, 10)}
                        {"  "}
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        />
                      </p>
                    ) : (
                      <p>
                        <i className="fas fa-times" style={{ color: "red" }} />
                      </p>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default Profile;
