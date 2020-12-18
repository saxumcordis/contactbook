import React from "react";
import {Contact_person} from "../../../../../types/Contact";

type Props = {
    contact: Contact_person;
}

export const ContactModalBody: React.FC<Props> = ({contact}) => {

    const {name, surname} = contact;

    return <>{name} {surname}</>;
};