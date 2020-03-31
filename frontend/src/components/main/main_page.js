import React from "react";
import './main.scss';
import background from "./background_video.mp4";
import NavBarContainer from "./../nav/navbar_container";
class MainPage extends React.Component {
    render() {
        return (
            <div>
                <NavBarContainer/>
                <video autoPlay muted loop className="background_video">
                    <source src={background} type="video/mp4" />
                </video>

                <div className="main">
                    <div>
                        <footer className="footer">&copy; 2020 ingredish | <a href="https://github.com/benjaminhuh/ingredish#group-members" target="_blank">Meet the Devs</a></footer>
                    </div>
                </div>

            </div>
        );
    }
}

export default MainPage;