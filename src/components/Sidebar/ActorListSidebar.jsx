import React, { useEffect, useState } from 'react';
import { getAllPersons } from '../../Utils/api';
import './ActorListSidebar.css';

const ActorListSidebar = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const personData = await getAllPersons();
        setPersons(personData);
      } catch (error) {
        console.error('Error fetching persons:', error);
      }
    };

    fetchPersons();
  }, []);

  return (
    <div className='actor-list-sidebar'>
      <h2 className='actor-list-title'>Danh sách diễn viên</h2>
      <ul className='actor-list'>
        {persons.map(person => (
          <li key={person.id} className='actor-list-item'>
            <a href={`/dien-vien/${person.id}`} className='actor-list-link'>{person.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActorListSidebar;
