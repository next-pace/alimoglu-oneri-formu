import { useState } from 'react';
import { User, UserCircle } from 'lucide-react';
import { supabase, FeedbackForm } from './lib/supabase';

function App() {
  const [gender, setGender] = useState<string>('');
  const [factory, setFactory] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [satisfaction, setSatisfaction] = useState<boolean | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string>('');

  const factories = [
    'Karmod Fabrika',
    'Ziylan Taban Fabrika',
    'Kozmotek Fabrika',
    'ACK Elektrik Fabrika',
    'Diğer'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!gender || !factory || !productName || satisfaction === null) {
      setError('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    setIsSubmitting(true);

    const formData: FeedbackForm = {
      cinsiyet: gender,
      fabrika: factory,
      urun_ismi: productName,
      memnuniyet: satisfaction,
      not_metni: notes || undefined
    };

const { error: submitError } = await supabase
  .from('form_cevaplari')
  .insert([formData]);

if (submitError) {
  console.error("Supabase Insert Error:", submitError.message, submitError.hint);
  setError(`Hata: ${submitError.message}`);
  return;
}

    setShowSuccess(true);
    setGender('');
    setFactory('');
    setProductName('');
    setSatisfaction(null);
    setNotes('');

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40" />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-4 border-white/50">
            <div className="flex justify-center mb-8">
              <img
                src="https://alimoglugida.com/logo.png"
                alt="Company Logo"
                className="h-16 object-contain"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg">Cinsiyet Seçin</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setGender('Erkek')}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-3 transition-all ${
                      gender === 'Erkek'
                        ? 'bg-blue-500 text-white border-blue-600 shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <User className="w-10 h-10 mb-2" />
                    <span className="font-semibold text-lg">Erkek</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('Kadın')}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-3 transition-all ${
                      gender === 'Kadın'
                        ? 'bg-pink-500 text-white border-pink-600 shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-pink-400'
                    }`}
                  >
                    <UserCircle className="w-10 h-10 mb-2" />
                    <span className="font-semibold text-lg">Kadın</span>
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="factory" className="block text-gray-700 font-semibold mb-3 text-lg">
                  Fabrika Seç
                </label>
                <select
                  id="factory"
                  value={factory}
                  onChange={(e) => setFactory(e.target.value)}
                  className="w-full px-4 py-4 text-lg border-3 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 bg-white transition-all"
                >
                  <option value="">Seçiniz...</option>
                  {factories.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="product" className="block text-gray-700 font-semibold mb-3 text-lg">
                  Ürün ismi gir
                </label>
                <input
                  id="product"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Ürün adını yazın..."
                  className="w-full px-4 py-4 text-lg border-3 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  Otomattan Memnun musun?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setSatisfaction(true)}
                    className={`py-4 rounded-2xl border-3 font-semibold text-lg transition-all ${
                      satisfaction === true
                        ? 'bg-green-500 text-white border-green-600 shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                    }`}
                  >
                    Evet
                  </button>
                  <button
                    type="button"
                    onClick={() => setSatisfaction(false)}
                    className={`py-4 rounded-2xl border-3 font-semibold text-lg transition-all ${
                      satisfaction === false
                        ? 'bg-red-500 text-white border-red-600 shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-red-400'
                    }`}
                  >
                    Hayır
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-gray-700 font-semibold mb-3 text-lg">
                  Notun var mı? <span className="text-gray-400 text-sm">(opsiyonel)</span>
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notlarınızı buraya yazabilirsiniz..."
                  rows={4}
                  className="w-full px-4 py-4 text-lg border-3 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 resize-none transition-all"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-100 border-2 border-red-400 text-red-700 rounded-2xl">
                  {error}
                </div>
              )}

              {showSuccess && (
                <div className="p-4 bg-green-100 border-2 border-green-400 text-green-700 rounded-2xl text-center font-semibold">
                  Cevabınız başarıyla kaydedildi 🎉
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed border-3 border-blue-700"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
