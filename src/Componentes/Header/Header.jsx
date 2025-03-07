import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import usuerOn from "../../Assets/Imagens/usuerOn.png";

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const userDataArray = JSON.parse(userData);
      const { id, nome, email, roles } = userDataArray[0];
      setUserInfo({ id, nome, email, roles });
    } else {
      setUserInfo(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserInfo(null);
  };

  return (
    <>
      <header>
        <div className="header__content">
          <nav>
            <div className="nav__button">
               {userInfo ? (
                <div className="user-info">
                  <figure>
                      <img
                        className="image-name"
                        src={usuerOn}
                        alt="Online"
                        title="Online"
                      />
                  </figure>
                  <span className="user-name">{userInfo.nome}</span>
                  <Link to="/login" onClick={handleLogout}>
                    Sair
                  </Link>
                </div>
                
              ) : (
                <Link to="/login">Entrar</Link>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export { Header };

