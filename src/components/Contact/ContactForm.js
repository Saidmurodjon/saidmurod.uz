import { useEffect } from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import config from "../../config.json";
import axios from "axios";
function ContactForm() {
  const [message, setMessage] = useState({
    fullName: "",
    email: "",
    phone: "+998",
    message: "",
    date: new Date(),
  });
  const [error, setError] = useState({
    fullName: false,
    email: false,
    phone: null,
    message: false,
  });
  const changeHandler = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };
  const Send = async () => {
    const textValid = /^[0-9\b]+$/.test(
      message.fullName.replace(/[^a-zA-Z ]/g, "")
    );
    const textLength = message.fullName.replaceAll(/\s/g, "");
    const emailValid = message.email.match(
      /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    );
    const phoneValid = /^[0-9\b]+$/.test(
      message.phone.slice(1).replaceAll(/\s/g, "")
    );
    const messageValid =
      message.message.replaceAll(/\s/g, "").length > 5 ? true : false;
    await setError({
      ...error,
      fullName: textValid ? true : !textLength ? true : false,
      email: emailValid ? false : true,
      phone: message.phone.length < 9 ? true : phoneValid ? false : true,
      message: messageValid ? false : true,
    });
  };
  useEffect(() => {
    if (
      error.fullName === false &&
      error.email === false &&
      error.phone === false &&
      error.message === false
    ) {
      Fun();

      console.log(message);
    }
  }, [error]);
  const Fun = async () => {
    console.log(message);
    try {
      const res = await axios.post(
        // "http://localhost:5000/projects?quantity=2&step=1"
        `${config.SERVER_URL}contact`,
        message
      );
      if (res.status === 201) {
        await alert(`${message.fullName} habaringiz yuborildi.`);
        setMessage({
          ...message,
          fullName: "",
          email: "",
          phone: "+998",
          message: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  // const Validator=()=>{

  // }
  console.log(error);

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label
          className={`${error.fullName ? "text-danger" : "text-white"}`}
        >
          Full Name
        </Form.Label>
        <Form.Control
          type="text"
          name="fullName"
          className={`${
            error.fullName ? "border-3 border-danger text-danger" : ""
          }`}
          onChange={changeHandler}
          value={message.fullName}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label
          className={`${error.fullName ? "text-danger" : "text-white"}`}
        >
          Email address
        </Form.Label>
        <Form.Control
          type="email"
          name="email"
          className={`${
            error.email ? "border-3 border-danger text-danger" : ""
          }`}
          onChange={changeHandler}
          placeholder="name@example.com"
          value={message.email}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label
          className={`${error.fullName ? "text-danger" : "text-white"}`}
        >
          Phone Number
        </Form.Label>
        <Form.Control
          type="phone"
          name="phone"
          className={`${
            error.phone ? "border-3 border-danger text-danger" : ""
          }`}
          onChange={changeHandler}
          value={message.phone}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label
          className={`${error.fullName ? "text-danger" : "text-white"}`}
        >
          Message
        </Form.Label>
        <Form.Control
          name="message"
          className={`${
            error.message ? "border-3 border-danger text-danger" : ""
          }`}
          value={message.message}
          onChange={changeHandler}
          as="textarea"
          rows={3}
        />
      </Form.Group>
      <Button variant="primary m-2" onClick={() => Send()}>
        Send
      </Button>
    </Form>
  );
}

export default ContactForm;
