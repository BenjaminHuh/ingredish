import React from "react";
import './main.scss';
import background from "./background_video.mp4";

class MainPage extends React.Component {
    render() {
        return (
            <div>

                <video autoPlay muted loop className="background_video">
                    <source src={background} type="video/mp4" />
                </video>

                <div className="main">
                    <div>
                        <footer className="footer">Copyright &copy; 2020 ingredish | <a href="https://github.com/benjaminhuh/ingredish#group-members" target="_blank">Meet the Devs</a></footer>
                    </div>
                </div>

            </div>
        );
    }
}

export default MainPage;