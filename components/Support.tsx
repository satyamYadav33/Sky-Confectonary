
import React, { useState } from 'react';

interface SupportProps {
  onNavigateHome: () => void;
  onNavigateToCatalog: () => void;
}

const Support: React.FC<SupportProps> = ({ onNavigateHome, onNavigateToCatalog }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  const faqs = [
    {
      question: "How do I track my wholesale order?",
      answer: "Once your order is shipped, you will receive a tracking number via email. You can also view the status in your account dashboard under 'Recent Orders'."
    },
    {
      question: "What is the return policy for bulk items?",
      answer: "We accept returns for unopened and undamaged bulk cases within 30 days of delivery. Please contact our support team to initiate a return authorization."
    },
    {
      question: "Do you offer samples for new retailers?",
      answer: "Yes! We offer a sample kit for verified retailers. Contact our sales team to request a confectionery sample box."
    },
    {
      question: "How quickly are orders processed?",
      answer: "Most wholesale orders placed before 2 PM CST are processed the same day. Large pallet orders may require an additional 24 hours for freight scheduling."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Header */}
      <header className="w-full bg-white border-b border-slate-100 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
           <div className="flex items-center gap-2 cursor-pointer" onClick={onNavigateHome}>
              <div className="bg-primary text-white p-1.5 rounded-lg">
                <span className="material-symbols-outlined block">bakery_dining</span>
              </div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">
                Sky Confectionery
              </h2>
           </div>
           <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
             <button onClick={onNavigateToCatalog} className="hover:text-primary">Shop</button>
             <button onClick={onNavigateHome} className="hover:text-primary">Home</button>
           </nav>
           <div>
              <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" alt="User" className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200" />
           </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-slate-900 mb-4">How can we help?</h1>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            Find answers to common questions or reach out to our support team for assistance with your wholesale account.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">quiz</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-xl border transition-all duration-300 ${
                    activeFaq === index 
                      ? 'border-primary shadow-md' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button 
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900"
                  >
                    {faq.question}
                    <span className={`material-symbols-outlined transition-transform duration-300 ${activeFaq === index ? 'rotate-180 text-primary' : 'text-slate-400'}`}>
                      expand_more
                    </span>
                  </button>
                  <div 
                    className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                      activeFaq === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
             <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
               <span className="material-symbols-outlined text-primary">mail</span>
               Send us a Message
             </h2>
             
             {formStatus === 'success' ? (
                <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-4xl">check_circle</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                        Thank you for contacting us. Our support team will get back to you within 24 hours.
                    </p>
                    <button 
                        onClick={() => setFormStatus('idle')}
                        className="text-primary font-bold hover:underline flex items-center justify-center gap-1 mx-auto"
                    >
                        <span className="material-symbols-outlined text-lg">replay</span>
                        Send another message
                    </button>
                </div>
             ) : (
                 <form className="space-y-4" onSubmit={handleSubmit}>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-500 uppercase">First Name</label>
                       <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Jane" />
                     </div>
                     <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-500 uppercase">Last Name</label>
                       <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Doe" />
                     </div>
                   </div>
                   
                   <div className="space-y-1">
                     <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                     <input required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="jane@company.com" />
                   </div>
    
                   <div className="space-y-1">
                     <label className="text-xs font-bold text-slate-500 uppercase">Subject</label>
                     <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer">
                       <option>Order Inquiry</option>
                       <option>Product Question</option>
                       <option>Return / Refund</option>
                       <option>Other</option>
                     </select>
                   </div>
    
                   <div className="space-y-1">
                     <label className="text-xs font-bold text-slate-500 uppercase">Message</label>
                     <textarea required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[120px]" placeholder="How can we help you today?"></textarea>
                   </div>
    
                   <button 
                     type="submit"
                     disabled={formStatus === 'submitting'}
                     className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                   >
                     {formStatus === 'submitting' ? (
                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                     ) : (
                        <>
                            <span className="material-symbols-outlined">send</span>
                            Send Message
                        </>
                     )}
                   </button>
                 </form>
             )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
