import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: '#F44336' }}>
      <div className="container">
        <div className="row w-100 align-items-center">
          {/* Left Logo */}
          {/* <div className="col-1 d-flex justify-content-start">
            <img
              alt="Left Logo"
              src={logo} // Replace with your left logo path
              style={{ height: "30px", width: "auto" }}
            />
          </div> */}

          {/* Center Text */}
          <div className="col-12 text-center">
            <h1 id="title" style={{ fontSize: "26px", color: "white" }}>जिल्हा नियोजन समिती, पुणे</h1>
          </div>

          {/* Right Logo */}
          {/* <div className="col-1 d-flex justify-content-end">
            <img
              alt="Right Logo"
              src={logo} // Replace with your right logo path
              style={{ height: "30px", width: "auto" }}
            />
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
