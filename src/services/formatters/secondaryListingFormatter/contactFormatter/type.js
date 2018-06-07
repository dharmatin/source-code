// @flow

export type Phone = {
  label: string,
  number: string,
};

export type Contact = {
  phones?: Array<Phone>,
  emails?: Array<string>,
  bbms?: Array<string>,
  whatsApp?: Array<string>
};

export type ContactRequest = {
  bbPin?: string,
  phone?: string,
  handPhone?: string,
  whatsApp?: string,
  email?: string,
  bbm?: string
};
