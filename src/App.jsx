import { useState, Component } from 'react';
import { v4 } from 'uuid';

import Container from './components/Container';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

// function App() {
//   const [contacts, setContacts] = useState([]);
//   const [filter, setFilter] = useState('');

//   // При загрузке данных, берем с localStorage контакты
//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
// // Если не пустые, сохраняем в стейт
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   changeFilter = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   formSubmitHandler = ({ name, number }) => {
//     const contact = {
//       id: v4(),
//       name,
//       number,
//     };

//     const { contacts } = this.state;

//     if (
//       contacts.find(
//         ({ name }) => name.toLowerCase() === contact.name.toLowerCase(),
//       )
//     ) {
//       alert(`${name} is already in contacts`);
//     } else {
//       this.setState(({ contacts }) => ({
//         contacts: [contact, ...contacts],
//       }));
//     }
//   };

//     // const { formSubmitHandler, changeFilter, deleteContact } = this;
//     // const { contacts, filter } = this.state;
//     // const normalizedFilter = filter.toLowerCase();

//     // const visibleContacts = contacts.filter(contact =>
//     //   contact.name.toLowerCase().includes(normalizedFilter),
//     // );

//     return (
//       <Container>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={formSubmitHandler} />
//         <h2>Contacts</h2>
//         <Filter value={filter} onChange={changeFilter} />
//         <ContactList
//           contacts={visibleContacts}
//           onDeleteContact={deleteContact}
//         />
//       </Container>
//     );
//   };

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  formSubmitHandler = (name, number) => {
    const contact = {
      id: v4(),
      name,
      number,
    };

    const { contacts } = this.state;

    if (
      contacts.find(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  render() {
    const { formSubmitHandler, changeFilter, deleteContact } = this;
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </Container>
    );
  }
}

export default App;
