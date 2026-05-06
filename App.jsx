import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, CheckCircle, GraduationCap, ArrowRight, ArrowLeft, RefreshCw, FileText, Gamepad2, HelpCircle, Send } from 'lucide-react';

const VOCABULARY = [
  { en: "Researchers", he: "חוקרים" },
  { en: "Data", he: "נתונים" },
  { en: "Survey", he: "סקר" },
  { en: "Proof", he: "הוכחה" },
  { en: "Demonstrate", he: "להראות / להדגים" },
  { en: "The assumption", he: "ההנחה" },
  { en: "The findings", he: "הממצאים / תוצאות" },
  { en: "The process", he: "התהליך" },
  { en: "Participants", he: "המשתתפים" },
  { en: "Control group", he: "קבוצת ביקורת" },
  { en: "Experimental group", he: "קבוצת ניסוי" },
  { en: "Questionnaire", he: "שאלון" },
  { en: "Study / Studies", he: "מחקר / מחקרים" },
  { en: "Theorized", he: "העלה תיאוריה" },
  { en: "Analyzed", he: "ניתח" },
  { en: "Suggest", he: "להציע / להעלות השערה" },
  { en: "Refute", he: "להפריך / לא להסכים" },
  { en: "Method", he: "שיטה" },
  { en: "Confirm", he: "לאשר" }
];

const TEXT_SECTIONS = [
  {
    title: "1. The Invention of the Post-it",
    paragraphs: "1-2",
    content: `סיפורו של ארתור פריי שפתר את בעיית הסימניות שלו בכנסייה בזמן שחלם בהקיץ. המחשבה ה"תועה" שלו הפכה לאחד המוצרים המצליחים בעולם.`,
    keyPoints: ["Arthur Fry (3M engineer)", "Problem: Bookmarks falling out", "Solution: Post-it notes"]
  },
  {
    title: "2. The Negative Reputation",
    paragraphs: "3",
    content: `באופן מסורתי, חלימה בהקיץ נתפסת כשלילית, סימן לעצלנות, חוסר משמעת או גורם לתאונות דרכים. היא נחשבת להיפך מפרודוקטיביות.`,
    keyPoints: ["Cast in a negative light", "Associated with procrastination", "Seen as a lazy habit"]
  },
  {
    title: "3. Modern Scientific View",
    paragraphs: "4-5",
    content: `מדענים רואים זאת כעת כ-"Default mode" (מצב ברירת מחדל) חיוני. זהו כלי המאפשר למוח ליצור קשרים חדשים ולעסוק בחשיבה מופשטת.`,
    keyPoints: ["Fundamental feature of the human mind", "Crucial tool for creativity", "Unbounded thoughts"]
  },
  {
    title: "4. Mental Time Travel & Social Benefits",
    paragraphs: "6-7",
    content: `חלימה בהקיץ מאפשרת "מסע בזמן מנטלי" וסימולציות חברתיות. אנחנו חושבים על אחרים, על העתיד ועל איך להתנהג בסיטואציות דמיוניות.`,
    keyPoints: ["Mental time travel", "Social benefits (thinking about others)", "Imagining 'what if' scenarios"]
  },
  {
    title: "5. The Boredom Gap in Children",
    paragraphs: "8-11",
    content: `תרזה בלטון מצאה שילדים כיום כותבים סיפורים לא יצירתיים כי אין להם "זמן ריק". כשהם משתעממים הם פונים מיד למסכים במקום להפעיל דמיון.`,
    keyPoints: ["Teresa Belton's study", "Lack of 'empty time' due to TV", "Daydreaming requires practice"]
  },
  {
    title: "6. Awareness and Creativity (Schooler)",
    paragraphs: "12-16",
    content: `יונתן סקולר מצא שחלימה בהקיץ מעלה ציוני יצירתיות. עם זאת, זה עובד רק אם אנחנו מודעים לכך שאנחנו חולמים בהקיץ ויכולים לזהות את התובנה היצירתית.`,
    keyPoints: ["High scores on creativity measures", "Two types of daydreaming", "Awareness is necessary to catch insights"]
  },
  {
    title: "7. The Default Network & Marcus Raichle",
    paragraphs: "17-18",
    content: `כשהמוח "לא עושה כלום", ה-Default Network פועל בעוצמה. ד"ר רייכל מסביר שהמוח רחוק מלנוח במצב הזה; הוא מעבד מידע פנימי רב.`,
    keyPoints: ["Default network activation", "Cortex is very active", "The brain isn't resting at all"]
  },
  {
    title: "8. Clinical Cases (Autism, Schizophrenia, Aging)",
    paragraphs: "19-22",
    content: `בעיות ברשת זו קשורות לאוטיזם (פעילות מופחתת), סכיזופרניה (פעילות יתר) והזדקנות (חוסר סנכרון), מה שמשפיע על היכולת לשלוט במחשבות.`,
    keyPoints: ["Autism: Social deficits", "Schizophrenia: Reality vs. Imagination", "Aging: Coordination issues"]
  },
  {
    title: "9. Summary & Advice",
    paragraphs: "23-24",
    content: `המוח לעולם אינו ריק. חלימה בהקיץ היא סימן לבריאות ועוזרת לנו לתכנן את העתיד. לפעמים זו הדרך הכי פרודוקטיבית לפתור בעיות.`,
    keyPoints: ["Mind is never empty", "Productive problem solving", "Take daydreams seriously"]
  }
];

const QUIZ_QUESTIONS = [
  { id: 1, type: "open", q: "1. What main idea is illustrated by the example of Arthur Fry?", a: "The idea that a wandering mind (daydreaming) can lead to important creative breakthroughs and inventions like the Post-it note.", source: "Para 1-2" },
  { id: 2, type: "open", q: "2. What advice is given in the last paragraph?", a: "We should take daydreams more seriously. When stuck on a difficult problem, a good daydream isn't just an escape - it may be the most productive thing we can do.", source: "Para 24" },
  { id: 3, type: "open", q: "3. What advantage does the daydream have? (Para 2) Choose your own words.", a: "It provides a mental space where 'errant thoughts' can occur, allowing the mind to solve specific problems (like the bookmark) that focused thinking might miss.", source: "Para 2" },
  { id: 4, type: "open", q: "4. Why is Einstein mentioned?", a: "He is mentioned as a famous example of a person who was notorious for his wandering mind, showing that daydreaming is associated with high levels of creativity and breakthroughs.", source: "Para 3" },
  { id: 5, type: "open", q: "5. In what way have researchers' ideas about daydreaming changed? Once ________ but now ________.", a: "Once it was cast in a negative light as a lazy habit or sign of procrastination, but now it is seen as a fundamental feature of the mind and a crucial tool for creativity.", source: "Para 3-4" },
  { id: 6, type: "open", q: "6. What is the outcome of daydreaming? (Para 4)", a: "The outcome is that the brain makes new associations and connections, freeing the mind to engage in abstract thought and imaginative ideas.", source: "Para 4" },
  { id: 7, type: "open", q: "7. Give ONE social benefit of daydreaming.", a: "It allows the mind to retrieve memories and contemplate 'what if' scenarios regarding social interactions, helping us decide how to behave in the future.", source: "Para 6" },
  { id: 8, type: "open", q: "8. What does Malia Mason think we would lack if we didn't daydream?", a: "We would lack the capacity to project ourselves into imaginary situations, such as the future. Without this, we would be 'pretty limited creatures'.", source: "Para 7" },
  { id: 9, type: "open", q: "9. What conclusion does Belton have about the reason children write boring stories?", a: "She concluded that it's caused by the absence of 'empty time'. When children get bored, they immediately turn on the TV instead of using their own imagination.", source: "Para 10-11" },
  { id: 10, type: "open", q: "10. (Note on Para 11) What skill does the capacity to daydream provide according to Belton?", a: "It enables a person to fill empty time with an enjoyable activity (imagination) that can be carried on anywhere, but it requires practice.", source: "Para 11" },
  { id: 11, type: "open", q: "11. What did Schooler's research prove?", a: "It showed that people who engage in more daydreaming score higher on experimental measures of creativity, which require making unusual connections.", source: "Para 12" },
  { id: 12, type: "open", q: "12. Does all daydreaming lead to creativity? YES/NO support your answer.", a: "No. Only 'aware' daydreaming leads to creativity. People who are unaware of their mind wandering do not show increased creativity. One must notice the creative insight.", source: "Para 14-15" },
  { id: 13, type: "open", q: "13. What is the default network? (Para 17)", a: "It is a distinct pattern of brain areas that is activated when people perform routine tasks that require little conscious attention.", source: "Para 17" },
  { id: 14, type: "open", q: "14. Is there a 'resting state' according to Raichle?", a: "No. Although it is called the 'resting state', the brain is not resting at all; it is actually doing a 'tremendous amount' of work while daydreaming.", source: "Para 18" },
  { id: 15, type: "open", q: "15. Do autistics and schizophrenics use daydreaming effectively? YES/NO Describe the behavior of ONE.", a: "No. For example, autistic people have reduced activity in the default network, which correlates with social deficits and a fixation on the external environment.", source: "Para 19-20" },
  { id: 16, type: "open", q: "16. The mind is never empty. TRUE / FALSE Support your answer.", a: "True. According to paragraph 23, even when it seems empty, the mind is 'always bubbling over with ideas and connections'.", source: "Para 23" },
  { id: 17, type: "choice", q: "Which group exhibits an OVERACTIVE default network?", options: ["Autistic patients", "Healthy adults", "Schizophrenic patients", "Preschoolers"], a: 2, source: "Para 20" },
  { id: 18, type: "fill", q: "Schooler distinguishes between two types of daydreaming: one where you are aware and one where you are ___.", options: ["unaware", "sleeping", "bored", "creative"], a: "unaware", source: "Para 14" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('vocab');
  const [vocabIndex, setVocabIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const [gameQuestion, setGameQuestion] = useState(null);
  const [gameOptions, setGameOptions] = useState([]);
  const [gameScore, setGameScore] = useState(0);
  const [gameFeedback, setGameFeedback] = useState(null);

  const [quizIndex, setQuizIndex] = useState(0);
  const [userText, setUserText] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);

  const nextGame = () => {
    const correct = VOCABULARY[Math.floor(Math.random() * VOCABULARY.length)];
    const distractors = VOCABULARY.filter(v => v.en !== correct.en).sort(() => 0.5 - Math.random()).slice(0, 3);
    setGameQuestion(correct);
    setGameOptions([...distractors, correct].sort(() => 0.5 - Math.random()));
    setGameFeedback(null);
  };

  useEffect(() => { if (activeTab === 'game') nextGame(); }, [activeTab]);

  const handleGame = (opt) => {
    if (opt.en === gameQuestion.en) {
      setGameFeedback('correct');
      setGameScore(s => s + 1);
      setTimeout(nextGame, 1000);
    } else {
      setGameFeedback('wrong');
      setTimeout(() => setGameFeedback(null), 1000);
    }
  };

  const handleQuizSubmit = () => {
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    setQuizIndex(i => (i + 1) % QUIZ_QUESTIONS.length);
    setShowFeedback(false);
    setUserText("");
    setSelectedOpt(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 md:p-8 font-sans text-slate-800" dir="rtl">
      
      {/* Header */}
      <header className="max-w-4xl w-full mb-8 text-center bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-3xl font-black text-indigo-900 flex items-center justify-center gap-3 mb-2">
          <GraduationCap className="text-indigo-600" size={40} />
          Daydream Achiever Study Kit
        </h1>
        <p className="text-slate-500 font-bold">ערכת לימוד אינטראקטיבית למבחן באנגלית</p>
      </header>

      {/* Navigation */}
      <nav className="max-w-4xl w-full grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { id: 'vocab', label: 'אוצר מילים', icon: <BookOpen size={20}/> },
          { id: 'game', label: 'משחק זיכרון', icon: <Gamepad2 size={20}/> },
          { id: 'text', label: 'ניתוח טקסט', icon: <FileText size={20}/> },
          { id: 'quiz', label: 'תרגול שאלות', icon: <HelpCircle size={20}/> }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center justify-center gap-2 py-4 px-4 rounded-2xl font-black transition-all ${
              activeTab === t.id ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {t.icon} <span className="hidden md:inline">{t.label}</span>
          </button>
        ))}
      </nav>

      <main className="max-w-4xl w-full">
        
        {/* Vocabulary Flashcards */}
        {activeTab === 'vocab' && (
          <div className="flex flex-col items-center gap-8">
            <div className="w-full max-w-sm h-64 perspective-1000">
              <div onClick={() => setIsFlipped(!isFlipped)} className={`relative w-full h-full duration-500 preserve-3d cursor-pointer shadow-2xl rounded-3xl ${isFlipped ? 'rotate-y-180' : ''}`}>
                <div className="absolute inset-0 backface-hidden bg-white border border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8">
                  <span className="text-indigo-400 text-xs font-black tracking-widest mb-4">ENGLISH</span>
                  <h2 className="text-4xl font-black text-slate-800 text-center">{VOCABULARY[vocabIndex].en}</h2>
                  <p className="mt-8 text-slate-300 text-xs">Click to flip</p>
                </div>
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-indigo-600 text-white rounded-3xl flex flex-col items-center justify-center p-8">
                  <span className="text-indigo-200 text-xs font-black tracking-widest mb-4">HEBREW</span>
                  <h2 className="text-4xl font-black text-center">{VOCABULARY[vocabIndex].he}</h2>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => setVocabIndex(i => (i-1+VOCABULARY.length)%VOCABULARY.length)} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200 text-indigo-600 hover:scale-110 transition-transform"><ArrowRight/></button>
              <div className="font-black text-slate-400 bg-white px-6 py-2 rounded-full border border-slate-100">{vocabIndex+1} / {VOCABULARY.length}</div>
              <button onClick={() => setVocabIndex(i => (i+1)%VOCABULARY.length)} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200 text-indigo-600 hover:scale-110 transition-transform"><ArrowLeft/></button>
            </div>
          </div>
        )}

        {/* Game Mode */}
        {activeTab === 'game' && gameQuestion && (
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 text-center animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-10">
              <span className="bg-indigo-100 text-indigo-700 px-6 py-2 rounded-full font-black">Score: {gameScore}</span>
              <h2 className="text-xl font-black text-slate-400">Match Translation</h2>
            </div>
            <h3 className="text-6xl font-black text-slate-800 mb-16">{gameQuestion.en}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gameOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleGame(opt)}
                  className={`p-6 rounded-2xl border-2 font-black text-2xl transition-all ${
                    gameFeedback === 'correct' && opt.en === gameQuestion.en ? 'bg-green-500 border-green-500 text-white' :
                    gameFeedback === 'wrong' && opt.en !== gameQuestion.en ? 'opacity-30' :
                    'bg-white border-slate-200 hover:border-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  {opt.he}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text Analysis */}
        {activeTab === 'text' && (
          <div className="space-y-6">
            <div className="bg-indigo-900 text-white p-6 rounded-3xl shadow-lg mb-8">
              <h2 className="text-2xl font-black mb-2 text-right">ניתוח תוכן מפורט (פסקאות 1-24)</h2>
              <p className="text-indigo-200 text-right">סיכום נקודות המפתח בעברית ובאנגלית</p>
            </div>
            {TEXT_SECTIONS.map((s, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 group hover:shadow-md transition-shadow">
                <div className="bg-slate-50 px-8 py-4 border-b flex justify-between items-center">
                  <h3 className="font-black text-indigo-900 text-lg text-right">{s.title}</h3>
                  <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-xl text-xs font-black uppercase">Paras {s.paragraphs}</span>
                </div>
                <div className="p-8">
                  <p className="text-slate-700 font-bold mb-6 text-lg leading-relaxed text-right">{s.content}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3" dir="ltr">
                    {s.keyPoints.map((kp, j) => (
                      <div key={j} className="flex items-center gap-3 text-sm text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                        {kp}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quiz Mode */}
        {activeTab === 'quiz' && (
          <div className="flex flex-col items-center">
            <div className="w-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500 rounded-lg"><HelpCircle size={20}/></div>
                  <span className="font-black text-sm tracking-widest uppercase">Exercise {quizIndex + 1} / {QUIZ_QUESTIONS.length}</span>
                </div>
                <span className="bg-white/10 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {QUIZ_QUESTIONS[quizIndex].type}
                </span>
              </div>

              <div className="p-10">
                <div className="text-indigo-500 text-xs font-black mb-4 uppercase tracking-widest text-left" dir="ltr">{QUIZ_QUESTIONS[quizIndex].source}</div>
                <h3 className="text-2xl font-black text-slate-800 mb-10 text-left" dir="ltr">{QUIZ_QUESTIONS[quizIndex].q}</h3>

                {/* Open Ended */}
                {QUIZ_QUESTIONS[quizIndex].type === 'open' && (
                  <div className="space-y-8">
                    <textarea 
                      value={userText}
                      onChange={(e) => setUserText(e.target.value)}
                      disabled={showFeedback}
                      className="w-full p-6 h-40 rounded-3xl border-2 border-slate-100 focus:border-indigo-500 outline-none transition-all text-left font-bold text-lg"
                      dir="ltr"
                      placeholder="הקלד את תשובתך באנגלית כאן..."
                    />
                    {!showFeedback ? (
                      <button 
                        onClick={handleQuizSubmit}
                        disabled={!userText.trim()}
                        className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-indigo-700 disabled:bg-slate-200 transition-all shadow-lg"
                      >
                        <Send size={24}/> Check Answer
                      </button>
                    ) : (
                      <div className="animate-in slide-in-from-top-4 duration-500">
                        <div className="bg-emerald-50 border-2 border-emerald-100 p-8 rounded-3xl mb-6">
                          <span className="text-emerald-600 font-black text-xs block mb-3 uppercase tracking-widest text-left" dir="ltr">Correct Answer Guidance:</span>
                          <p className="text-emerald-900 font-bold text-xl text-left leading-relaxed" dir="ltr">{QUIZ_QUESTIONS[quizIndex].a}</p>
                        </div>
                        <button onClick={nextQuestion} className="w-full py-5 bg-slate-800 text-white rounded-2xl font-black text-xl hover:bg-black transition-all">Next Question</button>
                      </div>
                    )}
                  </div>
                )}

                {/* Multiple Choice */}
                {QUIZ_QUESTIONS[quizIndex].type === 'choice' && (
                  <div className="space-y-4" dir="ltr">
                    {QUIZ_QUESTIONS[quizIndex].options.map((opt, i) => (
                      <button
                        key={i}
                        disabled={showFeedback}
                        onClick={() => setSelectedOpt(i)}
                        className={`w-full p-5 text-left rounded-2xl border-2 font-bold text-lg transition-all ${
                          showFeedback 
                            ? (i === QUIZ_QUESTIONS[quizIndex].a ? 'bg-emerald-500 border-emerald-500 text-white' : i === selectedOpt ? 'bg-rose-500 border-rose-500 text-white' : 'bg-slate-50 border-slate-100 text-slate-300')
                            : (selectedOpt === i ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-inner' : 'bg-white border-slate-100 hover:border-slate-300 text-slate-600')
                        }`}
                      >
                        <span className="mr-4 opacity-30">{String.fromCharCode(65 + i)}.</span> {opt}
                      </button>
                    ))}
                    {!showFeedback ? (
                      <button onClick={handleQuizSubmit} disabled={selectedOpt === null} className="w-full mt-6 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-lg disabled:bg-slate-200">Verify Selection</button>
                    ) : (
                      <button onClick={nextQuestion} className="w-full mt-6 py-5 bg-slate-800 text-white rounded-2xl font-black text-xl hover:bg-black">Next Question</button>
                    )}
                  </div>
                )}

                {/* Fill in Blank */}
                {QUIZ_QUESTIONS[quizIndex].type === 'fill' && (
                  <div className="grid grid-cols-2 gap-4" dir="ltr">
                    {QUIZ_QUESTIONS[quizIndex].options.map((opt, i) => (
                      <button
                        key={i}
                        disabled={showFeedback}
                        onClick={() => { setSelectedOpt(opt); handleQuizSubmit(); }}
                        className={`p-5 rounded-2xl border-2 font-black text-xl transition-all ${
                          showFeedback 
                            ? (opt === QUIZ_QUESTIONS[quizIndex].a ? 'bg-emerald-500 border-emerald-500 text-white' : opt === selectedOpt ? 'bg-rose-500 border-rose-500 text-white' : 'bg-slate-50 border-slate-100 text-slate-300')
                            : 'bg-white border-slate-200 hover:border-indigo-600 text-slate-700 hover:bg-indigo-50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                    {showFeedback && <button onClick={nextQuestion} className="col-span-2 mt-8 py-5 bg-slate-800 text-white rounded-2xl font-black text-xl">Next Question</button>}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-10 flex gap-6">
               <button onClick={() => { setShowFeedback(false); setQuizIndex(i => (i-1+QUIZ_QUESTIONS.length)%QUIZ_QUESTIONS.length); }} className="px-8 py-3 bg-white border border-slate-200 rounded-full text-slate-400 font-bold hover:text-indigo-600 transition-colors shadow-sm">Previous</button>
               <button onClick={() => { setShowFeedback(false); setQuizIndex(i => (i+1)%QUIZ_QUESTIONS.length); }} className="px-8 py-3 bg-white border border-slate-200 rounded-full text-slate-400 font-bold hover:text-indigo-600 transition-colors shadow-sm">Skip</button>
            </div>
          </div>
        )}

      </main>

      <footer className="mt-20 py-10 border-t border-slate-200 w-full max-w-4xl text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
        Interactive English Exam Preparation Kit • Created for Jonah Lehrer's "Daydream Achiever"
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-top-4 { from { transform: translateY(-1rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes zoom-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-in { animation-duration: 400ms; animation-fill-mode: both; }
        .fade-in { animation-name: fade-in; }
        .slide-in-from-top-4 { animation-name: slide-in-from-top-4; }
        .zoom-in { animation-name: zoom-in; }
      `}} />
    </div>
  );
}
