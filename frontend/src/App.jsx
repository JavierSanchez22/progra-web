import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('ocultar');

  return (
    <div className="container">
      <h1>Generador de Secretos</h1>
      <p className="subtitle">Crea un enlace para compartir secretos que se destruirá después de ser visto una vez.</p>
      
      <div className="tabs">
        <button className={activeTab === 'ocultar' ? 'active' : ''} onClick={() => setActiveTab('ocultar')}>
          Ocultar
        </button>
        <button className={activeTab === 'revelar' ? 'active' : ''} onClick={() => setActiveTab('revelar')}>
          Revelar
        </button>
      </div>

      <div className="content">
        {activeTab === 'ocultar' && (
          <div id="ocultar">
            <form>
              <textarea placeholder="Escribe tu secreto aquí..." rows="5" required></textarea>
              <button type="submit">Ocultar Secreto</button>
            </form>
          </div>
        )}

        {activeTab === 'revelar' && (
          <div id="revelar">
            <form>
              <input type="text" placeholder="Ingresa la clave del secreto" required />
              <button type="submit">Revelar Secreto</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;