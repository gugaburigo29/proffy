import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css"
import {api} from "../../services/api";

export interface Teacher {
    avatar: string;
    bio: string;
    cost: number;
    id: number;
    name: string;
    subject: string;
    user_id: number;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher
}

function TeacherItem({teacher}: TeacherItemProps) {

    const createConncetion = () => {
        api.post('/connections', {user_id: teacher.id});
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name}/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a onClick={createConncetion} href={`https://wa.me/${teacher.whatsapp}`} type="button">
                    <img src={whatsappIcon} alt="Wpp icon"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem;
