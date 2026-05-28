import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../db';
import { evaluateExam } from '../gemini';
import { Camera, ImageUp, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Evaluator() {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('');
  const [turma, setTurma] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Load API Key and Last Turma
  useEffect(() => {
    const checkApiKey = async () => {
      const key = await db.settings.get('gemini_api_key');
      if (!key || !key.value) {
        setError("Chave da API do Gemini não configurada. Vá em Configurações.");
      }
      const lastTurma = await db.settings.get('last_turma');
      if (lastTurma && lastTurma.value) {
        setTurma(lastTurma.value);
      }
    };
    checkApiKey();
  }, []);

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleEvaluate = async () => {
    if (!studentName.trim() || !turma.trim()) {
      setError("Por favor, insira o nome do aluno e a turma.");
      return;
    }
    if (!imageFile) {
      setError("Por favor, tire ou envie uma foto da prova.");
      return;
    }

    try {
      setIsEvaluating(true);
      setError('');
      
      const keySetting = await db.settings.get('gemini_api_key');
      if (!keySetting || !keySetting.value) {
        throw new Error("Chave API não encontrada.");
      }

      const evalResult = await evaluateExam(keySetting.value, imageFile);
      setResult(evalResult);
      
    } catch (err) {
      console.error(err);
      setError("Erro ao analisar a imagem. Verifique a chave da API ou tente novamente.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;
    
    // Save the last used class to make it easier for the next exam
    await db.settings.put({ key: 'last_turma', value: turma });

    await db.exams.add({
      studentName,
      turma: turma.trim().toUpperCase(),
      date: new Date().toISOString(),
      grade: result.nota,
      transcricao: result.transcricao,
      feedback: result.feedback,
      pontos_fortes: result.pontos_fortes,
      pontos_melhoria: result.pontos_melhoria
    });
    
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-2">
        <Camera className="text-brand-500" /> Nova Avaliação
      </h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle /> {error}
        </div>
      )}

      {!result ? (
        <div className="glass-card p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Nome do Aluno
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Ex: Albert Ribeiro"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Turma
              </label>
              <input
                type="text"
                value={turma}
                onChange={(e) => setTurma(e.target.value.toUpperCase())}
                placeholder="Ex: 6ºM1"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Foto da Prova (Escrita à mão)
            </label>
            
            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-700">
                <img src={imagePreview} alt="Preview" className="w-full object-cover max-h-64" />
                <button 
                  onClick={() => { setImageFile(null); setImagePreview(null); }}
                  className="absolute top-2 right-2 bg-slate-900/80 p-2 rounded-lg text-red-400 hover:text-red-300"
                >
                  Trocar Foto
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 bg-slate-800 border-2 border-dashed border-slate-600 hover:border-brand-500 hover:bg-slate-800/80 transition-colors rounded-xl p-8 text-slate-400"
                >
                  <Camera size={32} />
                  <span className="font-medium">Tirar Foto</span>
                </button>
                <label className="flex flex-col items-center justify-center gap-2 bg-slate-800 border-2 border-dashed border-slate-600 hover:border-brand-500 hover:bg-slate-800/80 transition-colors rounded-xl p-8 text-slate-400 cursor-pointer">
                  <ImageUp size={32} />
                  <span className="font-medium">Galeria</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCapture}
                    className="hidden"
                  />
                </label>
              </div>
            )}
            
            {/* Input oculto para captura direta da câmera (se suportado pelo device) */}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              onChange={handleCapture}
              className="hidden"
            />
          </div>

          <button
            onClick={handleEvaluate}
            disabled={isEvaluating || !studentName || !turma || !imageFile}
            className="w-full bg-brand-600 hover:bg-brand-500 disabled:bg-slate-700 disabled:text-slate-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            {isEvaluating ? (
              <>
                <Loader2 size={24} className="animate-spin" /> Avaliando com IA...
              </>
            ) : (
              <>
                <CheckCircle2 size={24} /> Avaliar Prova
              </>
            )}
          </button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 space-y-6 border-brand-500/50"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-700/50">
            <div>
              <h3 className="text-2xl font-bold text-slate-100">{studentName} <span className="text-sm font-normal text-brand-400 bg-brand-500/10 px-2 py-1 rounded ml-2">{turma}</span></h3>
              <p className="text-brand-400 font-medium">Avaliação Concluída</p>
            </div>
            <div className="text-center bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
              <div className="text-4xl font-black text-gradient">{result.nota?.toFixed(1) || result.nota}</div>
              <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest mt-1">Nota Sugerida</div>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <div>
              <h4 className="text-slate-100 font-bold mb-2 flex items-center gap-2">
                <span className="text-brand-500">📝</span> Transcrição da IA
              </h4>
              <p className="bg-slate-900/50 p-4 rounded-xl italic border border-slate-800">
                "{result.transcricao}"
              </p>
            </div>
            
            <div>
              <h4 className="text-slate-100 font-bold mb-2 flex items-center gap-2">
                <span className="text-brand-500">🧠</span> Feedback Pedagógico
              </h4>
              <p className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                {result.feedback}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-xl">
                <h4 className="text-green-400 font-bold mb-2">Pontos Fortes</h4>
                <p>{result.pontos_fortes}</p>
              </div>
              <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl">
                <h4 className="text-amber-400 font-bold mb-2">A Melhorar</h4>
                <p>{result.pontos_melhoria}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => setResult(null)}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Descartar
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-brand-500/20"
            >
              Salvar Nota
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
