export interface Contact_person_data_phone {
    mobile: string | null;
    work: string | null;
    home: string | null;
}

export interface Contact_person_data_address {
    country: string | null;
    city: string | null;
    street: string | null;
    house: string | null;
    flat: string | null;
    postalCode: string | null;
}

export interface Contact_person_data {
    phone: Contact_person_data_phone | null;
    address: Contact_person_data_address | null;
}

export interface Contact_person {
    _id: string;
    name: string;
    surname: string | null;
    fatherName: string | null;
    avatar: string;
    birth: string | null;
    group: string | null;
    data: Contact_person_data | null;
}

export interface Contact {
    contact: Contact_person | null;
}