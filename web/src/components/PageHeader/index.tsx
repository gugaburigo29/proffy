import {Link} from "react-router-dom";
import backIcon from "../../assets/images/icons/back.svg";
import logoImg from "../../assets/images/logo.svg";
import React, {ReactNode} from "react";

import "./styles.css"

interface PageHeaderProps {
    title: string;
    description?: string;
    children?: ReactNode
}

function PageHeader({title, description, children}: PageHeaderProps) {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar"/>
                </Link>
                <img src={logoImg} alt="Proffy"/>
            </div>

            <div className="header-content">
                <strong>{title}</strong>
                {description && <p>{description}</p>}
                {children}
            </div>
        </header>
    )
}

export default PageHeader;
