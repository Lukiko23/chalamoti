'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactMessage } from '@/types';
import { getAllMessages, markMessageAsRead, replyToMessage } from '@/lib/storage';

type FilterType = 'all' | 'unread' | 'replied';

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyingId, setReplyingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setMessages(await getAllMessages());
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-wine/20 border-t-wine rounded-full animate-spin" />
      </div>
    );
  }

  const filtered = (() => {
    switch (filter) {
      case 'unread': return messages.filter(m => !m.read);
      case 'replied': return messages.filter(m => m.replied);
      default: return messages;
    }
  })();

  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleExpand = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(id);
    const msg = messages.find(m => m.id === id);
    if (msg && !msg.read) {
      await markMessageAsRead(id);
      await refresh();
    }
  };

  const handleReply = async (msgId: string) => {
    if (!replyText.trim()) return;
    await replyToMessage(msgId, replyText.trim());
    setReplyText('');
    setReplyingId(null);
    await refresh();
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-serif font-bold text-charcoal mb-1">Messages</h2>
        <p className="text-charcoal/50 text-sm">
          {messages.length} message{messages.length > 1 ? 's' : ''}
          {unreadCount > 0 && <span className="text-wine font-semibold"> &middot; {unreadCount} non lu{unreadCount > 1 ? 's' : ''}</span>}
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { value: 'all' as FilterType, label: 'Tous' },
          { value: 'unread' as FilterType, label: 'Non lus' },
          { value: 'replied' as FilterType, label: 'R\u00e9pondus' },
        ].map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === f.value
                ? 'bg-wine text-white shadow-md'
                : 'bg-white text-charcoal/60 border border-cream hover:border-wine/30 hover:text-wine'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Messages list */}
      {sorted.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl border border-cream p-12 text-center"
        >
          <svg className="w-16 h-16 text-charcoal/15 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <p className="text-charcoal/40">Aucun message dans cette cat&eacute;gorie</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {sorted.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`bg-white rounded-2xl border transition-all duration-300 ${
                !msg.read ? 'border-wine/30 shadow-sm' : 'border-cream'
              }`}
            >
              {/* Message header */}
              <button
                onClick={() => handleExpand(msg.id)}
                className="w-full text-left p-5 flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-4 min-w-0">
                  {!msg.read && (
                    <div className="w-2.5 h-2.5 rounded-full bg-wine flex-shrink-0 mt-1.5" />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-charcoal">{msg.name}</p>
                      {msg.replied && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">R&eacute;pondu</span>
                      )}
                    </div>
                    <p className="text-xs text-charcoal/40">{msg.email}</p>
                    <p className="text-sm text-charcoal/60 mt-1 truncate">{msg.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-charcoal/30">
                    {new Date(msg.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                  </span>
                  <svg className={`w-5 h-5 text-charcoal/20 transition-transform duration-200 ${expandedId === msg.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {expandedId === msg.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-cream pt-4">
                      {/* Full message */}
                      <div className="bg-cream/30 rounded-xl p-4 mb-4">
                        <p className="text-sm text-charcoal whitespace-pre-wrap">{msg.message}</p>
                        {msg.phone && (
                          <p className="text-xs text-charcoal/40 mt-3">T&eacute;l : {msg.phone}</p>
                        )}
                      </div>

                      {/* Previous reply */}
                      {msg.replied && msg.replyText && (
                        <div className="bg-wine/5 rounded-xl p-4 mb-4 border-l-4 border-wine">
                          <p className="text-xs text-wine font-semibold mb-1">Votre r&eacute;ponse</p>
                          <p className="text-sm text-charcoal whitespace-pre-wrap">{msg.replyText}</p>
                          {msg.repliedAt && (
                            <p className="text-xs text-charcoal/30 mt-2">
                              {new Date(msg.repliedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' })}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Reply form */}
                      {replyingId === msg.id ? (
                        <div className="space-y-3">
                          <textarea
                            value={replyText}
                            onChange={e => setReplyText(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-cream bg-offwhite focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine transition-colors resize-none text-sm"
                            placeholder="Votre r&eacute;ponse..."
                            autoFocus
                          />
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => { setReplyingId(null); setReplyText(''); }}
                              className="px-4 py-2 text-sm text-charcoal/50 hover:text-charcoal rounded-lg transition-colors"
                            >
                              Annuler
                            </button>
                            <button
                              onClick={() => handleReply(msg.id)}
                              disabled={!replyText.trim()}
                              className="px-5 py-2 bg-wine text-white text-sm font-semibold rounded-xl hover:bg-wine-dark transition-all disabled:opacity-40 disabled:hover:bg-wine"
                            >
                              Envoyer
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setReplyingId(msg.id); setReplyText(msg.replyText || ''); }}
                          className="text-sm text-wine font-semibold hover:underline"
                        >
                          {msg.replied ? 'Modifier la r\u00e9ponse' : 'R\u00e9pondre'}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
