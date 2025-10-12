import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('ocultar');
  const [secret, setSecret] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [revealKey, setRevealKey] = useState('');
  const [revealedSecret, setRevealedSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = 'http://localhost:8000/api/secret';

  const handleHide = async (e) => {
    e.preventDefault();
    if (!secret) return;
    setLoading(true);
    setError('');
    setGeneratedKey('');
    try {
      const response = await axios.post(API_URL, { secret });
      setGeneratedKey(response.data.key);
      setSecret('');
    } catch (err) {
      setError('Hubo un error al ocultar el secreto. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleReveal = async (e) => {
    e.preventDefault();
    if (!revealKey) return;
    setLoading(true);
    setError('');
    setRevealedSecret('');
    setMessage('');
    try {
      const response = await axios.get(`${API_URL}/${revealKey}`);
      setRevealedSecret(response.data.secret);
      setMessage('Este secreto ha sido destruido y no se puede ver de nuevo.');
      setRevealKey('');
    } catch (err) {
      setError('Secreto no encontrado. Es posible que ya haya sido revelado o la clave sea incorrecta.');
    } finally {
      setLoading(false);
    }
  };
  
  const copyKeyToClipboard = () => {
    navigator.clipboard.writeText(generatedKey);
    alert('¡Clave copiada al portapapeles!');
  };

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
            <form onSubmit={handleHide}>
              <textarea
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Escribe tu secreto aquí..."
                rows="5"
                required
              ></textarea>
              <button type="submit" disabled={loading}>
                {loading ? 'Ocultando...' : 'Ocultar Secreto'}
              </button>
            </form>
            {generatedKey && (
              <div className="result">
                <p>Tu clave única es:</p>
                <div className="key-display">
                  <strong>{generatedKey}</strong>
                  <button onClick={copyKeyToClipboard} className="copy-btn">Copiar</button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'revelar' && (
          <div id="revelar">
            <form onSubmit={handleReveal}>
              <input
                type="text"
                value={revealKey}
                onChange={(e) => setRevealKey(e.target.value)}
                placeholder="Ingresa la clave del secreto"
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Revelando...' : 'Revelar Secreto'}
              </button>
            </form>
            {revealedSecret && (
              <div className="result revealed">
                <p>El secreto revelado es:</p>
                <pre>{revealedSecret}</pre>
                <p className="destroyed-message">{message}</p>
              </div>
            )}
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;