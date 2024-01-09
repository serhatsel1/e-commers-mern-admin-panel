import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log("Kullanıcı oluşturuldu");
    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        const { password, ...rest } = responseData;
        localStorage.setItem("token", responseData?.token);
        localStorage.setItem("user", JSON.stringify(responseData?.rest));

        message.success("Kayıt  işlemi Başarılı ");

        navigate("/");
      } else {
        message.error("Kayıt Başarısız");
      }
      // console.log(response);
    } catch (error) {
      console.log("handleRegister-->", error);
    }
  };
  return (
    <div className="account-column">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>
            <span>
              Username <span className="required">*</span>
            </span>
            <input type="text" onChange={handleInputChange} name="name" />
          </label>
        </div>
        <div>
          <label>
            <span>
              Email address <span className="required">*</span>
            </span>
            <input type="email" onChange={handleInputChange} name="email" />
          </label>
        </div>
        <div>
          <label>
            <span>
              Password <span className="required">*</span>
            </span>
            <input
              type="password"
              onChange={handleInputChange}
              name="password"
            />
          </label>
        </div>
        <div className="privacy-policy-text remember">
          <p>
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our <a href="#">privacy policy.</a>
          </p>
          <button className="btn btn-sm">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
