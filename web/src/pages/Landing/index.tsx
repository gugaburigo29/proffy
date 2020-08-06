import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom"

import logo from "../../assets/images/logo.svg"
import landingImg from "../../assets/images/landing.svg"
import studyIcon from "../../assets/images/icons/study.svg"
import giveClassesIcon from "../../assets/images/icons/give-classes.svg"
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg"

import "./styles.css"
import {api} from "../../services/api";

function Landing() {
    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections')
            .then(({data}) => {
                setTotalConnections(data.total);
            })
    }, []);

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logo} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img src={landingImg} alt="landing" className="hero-image"/>

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Estudar"/>
                        Estudar
                    </Link>
                </div>

                <div className="total-connections">
                    Total de {totalConnections} {totalConnections > 1 ? 'conexões' : 'conexão'} já realizadas
                    <img src={purpleHeartIcon} alt="Coração roxo"/>
                </div>
            </div>
        </div>
    )
}

export default Landing;
