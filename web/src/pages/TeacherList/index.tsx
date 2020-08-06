import React, {FormEvent, useState} from "react";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import TeacherItem, {Teacher} from "../../components/TeacherItem";
import Select from "../../components/Select";

import "./styles.css"
import {api} from "../../services/api";

function TeatcherList() {
    const [subject, setSubject] = useState("");
    const [weekDay, setWeekDay] = useState("");
    const [time, setTime] = useState("");

    const [teachers, setTeachers] = useState([]);

    const handleSearchTeatchers = async (e: FormEvent) => {
        e.preventDefault();

        const {data} = await api.get('classes', {
            params: {
                subject,
                time,
                week_day: weekDay
            }
        });

        setTeachers(data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponiveis.">
                <form onSubmit={handleSearchTeatchers} id="search-teachers">
                    <Select
                        label="Matéria"
                        name="subject"
                        options={[
                            {value: 'Artes', label: 'Artes'},
                            {value: 'Matematica', label: 'Matematica'},
                            {value: 'Geografia', label: 'Geografia'},
                            {value: 'Quimica', label: 'Quimica'},
                        ]}
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        blankOption
                    />
                    <Select
                        label="Dia da semana"
                        name="week_day"
                        value={weekDay}
                        onChange={e => setWeekDay(e.target.value)}
                        options={[
                            {value: '0', label: 'Domingo'},
                            {value: '1', label: 'Segunda-feira'},
                            {value: '2', label: 'Terça-feira'},
                            {value: '3', label: 'Quarta-feira'},
                            {value: '4', label: 'Quinta-feira'},
                            {value: '5', label: 'Sexta-feira'},
                            {value: '6', label: 'Sabado'},
                        ]}
                        blankOption
                    />
                    <Input
                        type="time"
                        label="Hora"
                        name="time"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                    />

                    <button type="submit">
                        Procurar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => (
                    <TeacherItem key={teacher.id} teacher={teacher}/>
                ))}
            </main>
        </div>
    )
}

export default TeatcherList;
