import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, Trash2, Award, Download, Filter } from 'lucide-react';

export default function Dashboard() {
  const [selectedTurma, setSelectedTurma] = useState('Todas');
  
  const allExams = useLiveQuery(() => db.exams.orderBy('date').reverse().toArray());
  
  // Extrair lista de turmas únicas para o filtro
  const turmasDisponiveis = allExams 
    ? [...new Set(allExams.map(e => e.turma).filter(Boolean))]
    : [];

  // Filtrar os exames a serem exibidos na tela
  const exams = allExams?.filter(exam => 
    selectedTurma === 'Todas' ? true : exam.turma === selectedTurma
  );

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente apagar esta avaliação?")) {
      await db.exams.delete(id);
    }
  };

  const exportToCSV = () => {
    if (!exams || exams.length === 0) return;

    const headers = ['Nome do Aluno', 'N1', 'N2', 'N3', 'N4', 'Feedback da IA'];
    
    const csvRows = exams.map(exam => {
      const notaDistribuida = (exam.grade / 2).toFixed(1).replace('.', ',');
      return [
        `"${exam.studentName}"`,
        `""`, 
        `"${notaDistribuida}"`, 
        `"${notaDistribuida}"`, 
        `""`, 
        `"${exam.feedback.replace(/"/g, '""')}"`
      ].join(';');
    });

    const csvContent = [headers.join(';'), ...csvRows].join('\n');
    
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    const prefixo = selectedTurma !== 'Todas' ? selectedTurma.replace(/[^a-zA-Z0-9]/g, '') : 'todas_turmas';
    link.setAttribute('download', `importacao_notas_lpt_${prefixo}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-2">
          <Award className="text-brand-500" /> Suas Avaliações
        </h2>
        
        <div className="flex items-center gap-3">
          {turmasDisponiveis.length > 0 && (
            <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-3 border border-slate-700">
              <Filter size={18} className="text-slate-400" />
              <select 
                value={selectedTurma}
                onChange={(e) => setSelectedTurma(e.target.value)}
                className="bg-transparent text-slate-100 py-3 outline-none"
              >
                <option value="Todas">Todas as Turmas</option>
                {turmasDisponiveis.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          )}

          {exams && exams.length > 0 && (
            <button
              onClick={exportToCSV}
              className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl transition-colors flex items-center gap-2 shadow-lg"
              title="Exportar para Excel (CSV)"
            >
              <Download size={24} />
              <span className="hidden sm:inline font-semibold">CSV</span>
            </button>
          )}
          
          <Link
            to="/evaluate"
            className="bg-brand-600 hover:bg-brand-500 text-white p-3 rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-brand-500/20 whitespace-nowrap"
          >
            <PlusCircle size={24} />
            <span className="hidden sm:inline font-semibold">Nova Avaliação</span>
          </Link>
        </div>
      </div>

      <div className="grid gap-4">
        {!allExams && (
          <div className="text-center py-12 text-slate-500 animate-pulse">
            Carregando avaliações...
          </div>
        )}
        
        {allExams && exams.length === 0 && (
          <div className="glass-card p-12 text-center text-slate-400 flex flex-col items-center gap-4">
            <FileText size={48} className="text-slate-600" />
            <p>{selectedTurma !== 'Todas' ? `Nenhuma prova avaliada para a turma ${selectedTurma}.` : 'Nenhuma prova avaliada ainda.'}</p>
            <Link to="/evaluate" className="text-brand-400 hover:text-brand-300 font-medium">
              Comece agora tirando a primeira foto!
            </Link>
          </div>
        )}

        {exams && exams.map((exam) => (
          <div key={exam.id} className="glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-brand-500">
            <div>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                {exam.studentName}
                {exam.turma && <span className="text-xs font-normal text-brand-400 bg-brand-500/10 px-2 py-1 rounded">{exam.turma}</span>}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Data: {new Date(exam.date).toLocaleString('pt-BR')}
              </p>
              <div className="mt-2 text-slate-300 text-sm line-clamp-2 italic">
                "{exam.transcricao}"
              </div>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-6 min-w-[200px]">
              <div className="text-center">
                <div className="text-3xl font-black text-gradient">{exam.grade.toFixed(1)}</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Nota</div>
              </div>
              
              <button
                onClick={() => handleDelete(exam.id)}
                className="p-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-full transition-colors"
                title="Apagar avaliação"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
