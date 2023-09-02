import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const UpdateView = (user) => {
  let getUsername = user.user.Username;
  let getEmail = user.user.Email;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let updatedUsername = getUsername;
  let updatedEmail = getEmail;

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    console.log("123123User: ", user);

    const storedToken = localStorage.getItem("token");
    console.log("userIDDD: ", user);

    fetch(
      `https://movies-flix-al-f68cdd84f041.herokuapp.com/users/${user.user._id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json().then((responseData) => {
            updatedUsername = responseData.Username; //mod
            updatedEmail = responseData.Email; //mod
          });
        } else {
          alert("Error updating data");
        }
      })
      .then(() => {
        setUsername(updatedUsername);
        setEmail(updatedEmail);
        alert(
          `Profile data successfully changed to:
             Username: ${updatedUsername}
             Email: ${updatedEmail}
             `
        );
        window.location.reload();
      });
    console.log("1updatedUsernameeeeeeew", updatedUsername);
  };
  console.log("2updatedUsernameeeeeeew", username);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder={getUsername}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new or current password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder={email + getEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </>
  );
};
