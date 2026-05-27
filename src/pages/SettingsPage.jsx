import { useState, useEffect } from 'react';
import { db } from '../db';
import { Save, Key } from 'lucide-react';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const loadKey = async () => {
      const setting = await db.settings.get('gemini_api_key');
      if (setting) {
        setApiKey(setting.value);
      }
    };
    loadKey();
  }, []);

  const handleSave = async () => {
    try {
      await db.settings.put({ key: 'gemini_api_key', value: apiKey });
      setStatus('Chave salva com sucesso!');
      setTimeout(() => setStatus(''), 3000);
    } catch (e) {
      setStatus('Erro ao salvar.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-2">
        <Key className="text-brand-500" /> Configurações
      </h2>

      <div className="glass-card p-6">
        <p className="text-slate-400 mb-4">
          Para que o aplicativo funcione, você precisa inserir a sua chave da API do Google Gemini. 
          A chave ficará salva <b>apenas neste dispositivo</b> e não será enviada para nenhum outro servidor.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Gemini API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Salvar Chave
          </button>
          
          {status && (
            <p className="text-center text-sm text-green-400 font-medium">
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
