import React, { useState } from "react";
import { BsTwitter, BsFacebook, BsReddit, BsPinterest } from "react-icons/bs";
import Wrapper from "../../assets/wrappers/Footer";
import Logo from "../Logo";
import FormItem from "../FormItem";
import { useNavigate } from "react-router-dom";
import useAppContext from "../../store/appContext";
import Alert from "../Alert";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { showAlert, validateInput } = useAppContext();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      validateInput("Kindly fill the form");
    } else {
      setLoading(true);
      setTimeout(() => {
        try {
          validateInput("Message sent successfully", "success");
          setFormData({ name: "", email: "", message: "" });
        } catch (error) {
          console.error("Error validating input:", error);
        } finally {
          setLoading(false);
        }
      }, 500);
    }
  };

  return (
    <Wrapper>
      <div className="footer-container">
        <div className="footer-major">
          <div className="footer-major-intro">
            <div
              onClick={() => {
                navigate("/landing");
                window.scrollTo(0, 0);
              }}
            >
              <Logo />
            </div>
            <div>
              <ul>
                <li
                  onClick={() => {
                    navigate("/policies");
                    window.scrollTo(0, 0);
                  }}
                >
                  About us
                </li>
                <li
                  onClick={() => {
                    navigate("/policies");
                    window.scrollTo(0, 0);
                  }}
                >
                  Terms of service
                </li>
                <li
                  onClick={() => {
                    navigate("/policies");
                    window.scrollTo(0, 0);
                  }}
                >
                  Privacy Policy
                </li>
                <li
                  onClick={() => {
                    navigate("/register");
                    window.scrollTo(0, 0);
                  }}
                >
                  Join us
                </li>
              </ul>
            </div>
          </div>

          <form className="footer-form" onSubmit={submitForm}>
            <h4 className="footer-form-title">Have an enquiry? Contact us</h4>
            {showAlert && <Alert />}
            <FormItem
              label={true}
              labelText="Name"
              name={"name"}
              placeholder={" "}
              type={"text"}
              value={formData.name}
              onChange={handleChange}
            />
            <FormItem
              label={true}
              labelText="Email"
              name={"email"}
              type={"email"}
              placeholder={" "}
              value={formData.email}
              onChange={handleChange}
            />
            <div>
              <label htmlFor="message" className="formLabel">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                cols={5}
                className="formInput textarea"
              />
            </div>
            <button className="btn">{loading ? "..." : "Submit"}</button>
          </form>
        </div>
        <div className="footer-socials">
          <p className="footer-title">
            Looking to share this experience? Share via
          </p>
          <div className="footer-icons-div">
            <BsTwitter className="footer-icons-div-child" />
            <BsFacebook className="footer-icons-div-child" />
            <BsReddit className="footer-icons-div-child" />
            <BsPinterest />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Footer;
