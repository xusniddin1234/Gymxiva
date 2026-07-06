import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Send, 
  User, 
  Bot, 
  Trash2, 
  HelpCircle,
  Dumbbell,
  Utensils,
  TrendingUp,
  Activity
} from 'lucide-react';
import { DailyLog, UserProfile } from '../types';
import ApexLogo from './ApexLogo';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

interface AiCoachSectionProps {
  profile: UserProfile;
  dailyLog: DailyLog;
}

export default function AiCoachSection({ profile, dailyLog }: AiCoachSectionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from LocalStorage
  useEffect(() => {
    const savedChat = localStorage.getItem('apex_athletics_chat_history');
    if (savedChat) {
      try {
        setMessages(JSON.parse(savedChat));
      } catch (e) {
        console.error('Failed to load chat history:', e);
      }
    } else {
      // Welcome message in Uzbek
      const welcomeMsg: Message = {
        id: 'welcome',
        sender: 'bot',
        text: `Assalomu alaykum, ${profile.name}! Men sizning Apex Athletics aqlli fitness va parhez bo'yicha yordamchingizman. 🦾\n\nSizga gantellar yordamida mashg'ulotlar o'tkazish, 5 mahal to'g'ri ovqatlanish yoki maqsadli vazningizga (${profile.targetWeight} kg) erishish bo'yicha qanday maslahat bera olaman? Quyidagi tayyor savollardan birini tanlashingiz yoki o'z savolingizni yozishingiz mumkin!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcomeMsg]);
    }
  }, [profile.name, profile.targetWeight]);

  // Save chat history to LocalStorage
  const saveChat = (updatedMessages: Message[]) => {
    setMessages(updatedMessages);
    localStorage.setItem('apex_athletics_chat_history', JSON.stringify(updatedMessages));
  };

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const totalSetsCompleted = Object.values(dailyLog.completedExercises).reduce((a, b) => a + b, 0);

  const sendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    saveChat(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Call Express server API endpoint
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userQuestion: userText,
          profile,
          dailyLog,
          totalSetsCompleted
        }),
      });

      if (!response.ok) {
        throw new Error('Serverda xatolik yuz berdi');
      }

      const data = await response.json();
      
      const botMsg: Message = {
        id: Math.random().toString(36).substring(7),
        sender: 'bot',
        text: data.reply || "Kechirasiz, ma'lumot olishda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      saveChat([...updatedMessages, botMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: Message = {
        id: Math.random().toString(36).substring(7),
        sender: 'bot',
        text: "Kechirasiz, internet aloqasida yoki serverda muammo yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      saveChat([...updatedMessages, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm("Haqiqatan ham barcha suhbatlar tarixini o'chirib tashlamoqchimisiz?")) {
      const welcomeMsg: Message = {
        id: 'welcome',
        sender: 'bot',
        text: `Assalomu alaykum, ${profile.name}! Men sizning Apex Athletics aqlli fitness va parhez bo'yicha yordamchingizman. 🦾\n\nSizga gantellar yordamida mashg'ulotlar o'tkazish, 5 mahal to'g'ri ovqatlanish yoki maqsadli vazningizga (${profile.targetWeight} kg) erishish bo'yicha qanday maslahat bera olaman? Quyidagi tayyor savollardan birini tanlashingiz yoki o'z savolingizni yozishingiz mumkin!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      saveChat([welcomeMsg]);
    }
  };

  const PRESETS = [
    { text: "Dumbbell bilan qo'llarni qanday chiqarish bo'yicha qisqa reja bering?", icon: Dumbbell },
    { text: "Maqsadimga ko'ra bugungi 5 mahal ovqatlanishim qanday bo'lishi kerak?", icon: Utensils },
    { text: "Vaznni to'g'ri va sog'lom oshirish sirlari nimalardan iborat?", icon: TrendingUp },
    { text: "Gantel bilan bel va yelka mushaklarini qanday chiniqtiraman?", icon: Activity }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto" id="ai-coach-container">
      
      {/* Sidebar Info & Preset prompts */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 text-[#a3e635]">
              <Sparkles className="h-full w-full" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase italic text-white tracking-tight">AI Fitness Coach</h3>
              <p className="text-[10px] text-zinc-400">Gantel va 5 mahal taom mutaxassisi</p>
            </div>
          </div>
          
          <div className="h-px bg-zinc-800" />
          
          <div className="space-y-2 text-xs">
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">Ushbu yordamchi biladi:</span>
            <ul className="space-y-1 text-zinc-400 list-disc list-inside">
              <li>Gantel bilan to'g'ri mashq qilish</li>
              <li>5 mahal ovqatlanish porsiyalari</li>
              <li>BMI, BMR va metabolizm</li>
              <li>Vazn yig'ish va ozish strategiyasi</li>
            </ul>
          </div>
        </div>

        {/* Presets Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block flex items-center gap-1">
            <HelpCircle className="h-3 w-3 text-[#f97316]" /> Tayyor Savollar
          </span>
          <div className="space-y-2">
            {PRESETS.map((preset, index) => {
              const Icon = preset.icon;
              return (
                <button
                  key={index}
                  onClick={() => sendMessage(preset.text)}
                  disabled={isLoading}
                  className="w-full text-left p-2.5 rounded-xl bg-zinc-950 border border-zinc-850 hover:border-[#a3e635] text-zinc-300 hover:text-white transition-all text-[11px] font-bold flex items-start gap-2 group cursor-pointer disabled:opacity-40"
                >
                  <Icon className="h-3.5 w-3.5 text-[#f97316] mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>{preset.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col h-[550px] relative shadow-2xl">
        {/* Glow FX */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#a3e635]/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Chat Header */}
        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-zinc-900 border border-zinc-850 rounded-full flex items-center justify-center p-1">
              <ApexLogo className="h-full w-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm uppercase text-white tracking-wide italic">Apex Coach AI</span>
                <span className="h-1.5 w-1.5 bg-[#a3e635] rounded-full animate-ping" />
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">ONLINE ● MASLAHATChI</span>
            </div>
          </div>
          
          <button 
            onClick={clearChat}
            className="p-2 text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer"
            title="Tarixni o'chirish"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 font-sans text-xs md:text-sm z-10 scrollbar-thin scrollbar-thumb-zinc-800">
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${isBot ? 'justify-start' : 'justify-end'} gap-3 items-end`}
                >
                  {isBot && (
                    <div className="h-7 w-7 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/30 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-[#a3e635]" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] space-y-1`}>
                    <div className={`p-4 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      isBot 
                        ? 'bg-zinc-950 border border-zinc-850 text-zinc-100 rounded-bl-none' 
                        : 'bg-gradient-to-br from-[#f97316] to-[#ea580c] text-black font-semibold rounded-br-none'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-zinc-500 font-mono block text-right px-1">
                      {msg.timestamp}
                    </span>
                  </div>

                  {!isBot && (
                    <div className="h-7 w-7 rounded-full bg-[#f97316]/15 border border-[#f97316]/30 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-[#f97316]" />
                    </div>
                  )}
                </motion.div>
              );
            })}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start gap-3 items-center"
              >
                <div className="h-7 w-7 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/30 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-[#a3e635]" />
                </div>
                <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl rounded-bl-none flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-[#a3e635] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 bg-[#a3e635] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 bg-[#a3e635] rounded-full animate-bounce" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 z-10">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }} 
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Masalan: Gantel bilan ko'krakni qanday chiniqtiraman?..."
              className="flex-1 bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-3 text-white text-xs md:text-sm focus:outline-none focus:border-[#a3e635] font-semibold disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-3 bg-[#a3e635] hover:bg-[#a3e635]/90 disabled:opacity-30 text-black font-black uppercase text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              Yuborish <Send className="h-3 w-3 stroke-[2.5]" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
