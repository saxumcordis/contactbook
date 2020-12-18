import React from "react";
import {Contact_person} from "../../../../../types/Contact";
import {Button} from "../../../../../components/Button";

type Props = {
    contact: Contact_person;
}

//TODO Изменение темы кнопки по сохранению.

export const ContactModalFooter: React.FC<Props> = ({contact}) => {

    return <Button>Сохранить</Button>;
};