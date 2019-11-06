import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api';

import logo from '../assets/LogoTindadv.png';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';

export default function Main({ match }) {
  const [Procs, setProcs] = useState([]);

  useEffect(() => {
    async function loadProcs() {
      const response = await api.get('/devs', {
        headers: {
          user: match.params.id,
        }
      })

      setProcs(response.data);
    }

    loadProcs();
  }, [match.params.id]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id },
    })

    setProcs(Procs.filter(proc => proc._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id },
    })

    setProcs(Procs.filter(proc => proc._id !== id));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="TindAdv" />
      </Link>

      { Procs.length > 0 ? (
        <ul>  
          {Procs.map(proc => (
            <li key={proc._id}>
              <img src={proc.imageUrl} alt={proc.name} />           
              <div className="buttons">
                <button type="button" onClick={() => handleDislike(proc._id)}>
                  <img src={dislike} alt="Dislike" />
                </button>
                <button type="button" onClick={() => handleLike(proc._id)}>
                  <img src={like} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :(</div>
      ) }
    </div>
  )
  
}