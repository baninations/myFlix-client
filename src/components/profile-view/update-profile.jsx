import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const UpdateView = (user) => {
  let getUsername = user.user.Username;
  let getEmail = user.user.Email;
  let getBirthday = user.user.Birthday;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
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
            updatedBirthday = responseData.Birthday;
          });
        } else {
          alert("Error updating data");
        }
      })
      .then(() => {
        const date = new Date(updatedBirthday);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear());
        setUsername(updatedUsername);
        setEmail(updatedEmail);
        alert(
          `Profile data successfully changed to:
             Username: ${updatedUsername}
             Email: ${updatedEmail}
             Birthday: ${day}.${month}.${year}
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

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            placeholder={getBirthday} //added
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
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
