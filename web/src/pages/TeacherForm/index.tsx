import React, {FormEvent, useState} from "react";
import {useHistory} from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg"

import "./styles.css"
import {api} from "../../services/api";

function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [bio, setBio] = useState("");

    const [subject, setSubject] = useState("");
    const [cost, setCost] = useState("");

    const [scheduleItems, setScheduleItems] = useState([{
        week_day: 0,
        from: '0',
        to: '0',
    }]);

    const addNewScheduleItem = () => {
        setScheduleItems([...scheduleItems, {
            week_day: 0,
            from: '0',
            to: '0',
        }])
    }

    const handleCreateClass = (event: FormEvent) => {
        event.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastrado com sucesso');
            history.push('/');
        }).catch((() => {
            alert('Deu ruim jovem!')
        }))
    }

    const setScheduleItemValue = (position: number, field: string, value: string) => {
        const newArray = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return {...scheduleItem, [field]: value};
            }

            return scheduleItem;
        })

        setScheduleItems(newArray);
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrivel que você quer dar aula."
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            label="Nome Completo"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <Input
                            label="Avatar"
                            name="avatar"
                            value={avatar}
                            onChange={e => setAvatar(e.target.value)}
                        />
                        <Input
                            label="WhatsApp"
                            name="whatsapp"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                        />
                        <Textarea
                            label="Biografia"
                            name="bio"
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre as aulas</legend>

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
                        <Input
                            label="Custo da sua hora por aula"
                            name="cost"
                            value={cost}
                            onChange={e => setCost(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>

                        {
                            scheduleItems.map((item, index) => (
                                <div className="schedule-item">
                                    <Select
                                        label="Dia da semana"
                                        name="week_day"
                                        value={item.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                                        label="Das"
                                        name="from"
                                        type="time"
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                        value={item.from}
                                    />
                                    <Input
                                        label="Até"
                                        name="to"
                                        type="time"
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                        value={item.to}
                                    />
                                </div>
                            ))
                        }
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante <br/>
                            Preecha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;
