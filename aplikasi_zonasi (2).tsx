import React, { useState } from 'react';
import {
  Camera,
  Share2,
  Moon,
  Sun,
  Edit3,
  Image as ImageIcon,
  Sparkles,
  Plus,
  Trash2,
  Printer,
  Eye,
  Upload,
  UserCheck,
  RefreshCw,
  Download,
  LayoutGrid,
  Sliders,
  FileText,
  CheckCircle2,
  Maximize2
} from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'layout' | 'branding' | 'ai'
  const [aiPrompt, setAiPrompt] = useState('Sosialisasi Remaja tentang Cinta dan Empati di MTs. Negeri 1 Boalemo');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Layout & Styling Options
  const [layoutStyle, setLayoutStyle] = useState('classic'); // 'classic' | 'editorial' | 'magazine' | 'compact'
  const [photoLayout, setPhotoLayout] = useState('side_stacked'); // 'side_stacked' | 'grid_top' | 'horizontal_row' | 'single_hero'
  const [photoCount, setPhotoCount] = useState(4); // 1, 2, 3, or 4 photos
  const [photoHeight, setPhotoHeight] = useState(180); // Height in pixels for resizing
  const [fontSize, setFontSize] = useState('normal'); // 'compact' | 'normal' | 'relaxed'

  // Form & Flyer Data State
  const [flyerData, setFlyerData] = useState({
    tagline: 'YOUR SOURCE OF INFORMATION',
    mainTitle: 'ZONASI',
    subTitle: 'ZONA INFORMASI',
    qrCodeLink: 'https://web.mtsn1boalemo.sch.id',
    headline: 'MTS. NEGERI 1 BOALEMO GELAR SOSIALISASI REMAJA TENTANG CINTA DAN EMPATI',
    location: 'Boalemo',
    date: '15 September 2026',
    reporterInitials: 'RIL',

    // Custom Uploaded Branding Assets
    matsagisaLogoAsset: null,   // Top Left: Logo Madrasah
    sponsorHeaderAsset: null,   // Top Right: Logo Sponsor / Partner
    zonasiBannerAsset: null,    // Center Top: Custom ZONASI Headline Banner
    customFooterAsset: null,    // Bottom: Custom Footer Banner
    customHeaderAsset: null,    // Full Header Custom Override

    // News Photos (Dynamic list 1-4 photos)
    photos: [
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80'
    ],

    // Article Paragraphs
    paragraphs: [
      `Boalemo, 15 September 2026 – MTs. Negeri 1 Boalemo menggelar kegiatan Sosialisasi Remaja tentang “Cinta dan Empati” sebagai bagian dari upaya memberikan edukasi kepada siswa mengenai pentingnya menjaga diri, membangun pergaulan yang sehat, serta mempersiapkan masa depan tanpa terjebak pada pacaran dan pernikahan dini yang dipandu langsung oleh pemateri Husnawati dari Dinas Kesehatan Kabupaten Boalemo.`,
      `Kegiatan tersebut mengangkat tema “Sosialisasi Remaja Tentang Cinta dan Empati untuk Menghindari Pacaran di Lingkungan Madrasah dan Pencegahan Pernikahan Dini bagi Siswa.” Pesan ini menjadi bagian dari komitmen madrasah dalam menciptakan lingkungan pendidikan yang sehat, aman, dan mendukung perkembangan karakter peserta didik.`,
      `Melalui sosialisasi ini, para siswa diarahkan untuk memahami bahwa masa remaja merupakan fase penting dalam membangun karakter, mengembangkan potensi, serta mempersiapkan pendidikan dan cita-cita. Perasaan cinta dan ketertarikan terhadap lawan jenis dipandang sebagai bagian dari perkembangan remaja yang perlu disikapi dengan bijak, penuh tanggung jawab, dan tetap sesuai dengan nilai-nilai agama serta norma yang berlaku.`
    ],

    // Social Media Handles
    socials: {
      youtube: '@matsagisa.tv',
      instagram: '@mtsnegeri1boalemo',
      facebook: '@MTs. Negeri 1 Boalemo',
      tiktok: '@humas.mtsn1boalemo'
    }
  });

  const handleAssetUpload = (e, assetKey) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFlyerData(prev => ({ ...prev, [assetKey]: imageUrl }));
    }
  };

  const removeAsset = (assetKey) => {
    setFlyerData(prev => ({ ...prev, [assetKey]: null }));
  };

  const handlePhotoUpload = (e, index) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedPhotos = [...flyerData.photos];
      updatedPhotos[index] = imageUrl;
      setFlyerData(prev => ({ ...prev, photos: updatedPhotos }));
    }
  };

  const handleParagraphChange = (index, value) => {
    const updated = [...flyerData.paragraphs];
    updated[index] = value;
    setFlyerData(prev => ({ ...prev, paragraphs: updated }));
  };

  const addParagraph = () => {
    setFlyerData(prev => ({
      ...prev,
      paragraphs: [...prev.paragraphs, 'Tuliskan paragraf berita tambahan di sini...']
    }));
  };

  const removeParagraph = (index) => {
    if (flyerData.paragraphs.length <= 1) return;
    setFlyerData(prev => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, idx) => idx !== index)
    }));
  };

  const generateAINews = async () => {
    if (!aiPrompt.trim()) return;
    setIsGeneratingAI(true);
    try {
      const promptText = `Buatkan draf berita resmi madrasah berkualitas jurnalistik tinggi untuk "MTs. Negeri 1 Boalemo" berdasarkan topik berikut: "${aiPrompt}".
      Berikan output JSON persis dengan struktur ini:
      {
        "headline": "JUDUL BERITA DALAM HURUF KAPITAL YANG MENARIK DAN LUGAS",
        "location": "Boalemo",
        "date": "${flyerData.date}",
        "paragraphs": [
          "Paragraf 1 (Pembuka dengan lokasi dan inti berita...)",
          "Paragraf 2 (Rincian pesan moral dan kutipan pemateri/kepala madrasah...)",
          "Paragraf 3 (Penutup dan harapan bagi peserta didik...)"
        ],
        "reporterInitials": "RIL"
      }`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      const data = await response.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const result = JSON.parse(data.candidates[0].content.parts[0].text);
        setFlyerData(prev => ({
          ...prev,
          headline: result.headline || prev.headline,
          location: result.location || prev.location,
          date: result.date || prev.date,
          paragraphs: result.paragraphs || prev.paragraphs,
          reporterInitials: result.reporterInitials || prev.reporterInitials
        }));
      } else {
        throw new Error('Fallback required');
      }
    } catch (error) {
      setFlyerData(prev => ({
        ...prev,
        headline: `MTS. NEGERI 1 BOALEMO GELAR ${aiPrompt.toUpperCase()}`,
        paragraphs: [
          `Boalemo, ${prev.date} – MTs. Negeri 1 Boalemo sukses melaksanakan kegiatan ${aiPrompt}. Kegiatan ini dihadiri oleh jajaran tenaga pendidik serta seluruh peserta didik dengan penuh antusias.`,
          `Kepala Madrasah menegaskan bahwa kegiatan ini merupakan komitmen berkelanjutan MTs. Negeri 1 Boalemo dalam meningkatkan kualitas pendidikan karakter dan prestasi siswa di lingkungan madrasah.`,
          `Melalui momentum ini, diharapkan seluruh civitas akademika semakin terpacu untuk berinovasi, berempati, dan memberikan yang terbaik bagi kemajuan madrasah.`
        ]
      }));
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const handleDownloadJPG = async () => {
    setIsExporting(true);
    try {
      if (!window.html2canvas) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      const element = document.getElementById('flyer-canvas');
      if (element) {
        const canvas = await window.html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        const link = document.createElement('a');
        link.download = `ZONASI-Berita-${flyerData.location}-${Date.now()}.jpg`;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: flyerData.headline,
          text: `${flyerData.headline} - Zona Informasi Matsagisa Boalemo`,
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2500);
    }
  };

  // Font size mapping helper
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'compact': return 'text-[11px] leading-snug space-y-2';
      case 'relaxed': return 'text-sm leading-relaxed space-y-4';
      default: return 'text-xs md:text-[12.5px] leading-relaxed space-y-3';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    } font-sans pb-12`}>

      {/* PRINT MEDIA STYLE OVERRIDE */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          header, aside, .no-print { display: none !important; }
          #flyer-canvas {
            box-shadow: none !important;
            border: none !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>

      {/* HEADER NAVBAR */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b shadow-sm ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-600 text-white p-2 rounded-xl shadow-md">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-emerald-600 dark:text-emerald-400">
                Aplikasi ZONASI
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Pembuat Flyer Berita Format A4 - MTs. Negeri 1 Boalemo
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isEditing
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {isEditing ? <Eye className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              <span>{isEditing ? 'Sembunyikan Panel' : 'Edit Flyer'}</span>
            </button>

            <button
              onClick={handleDownloadJPG}
              disabled={isExporting}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Proses...' : 'Save JPG'}</span>
            </button>

            <button
              onClick={handlePrintPDF}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Save PDF</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedSuccess ? 'Disalin!' : 'Bagikan'}</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8">

        {/* SIDEBAR EDIT PANEL */}
        {isEditing && (
          <aside className={`lg:w-[450px] shrink-0 p-5 rounded-2xl shadow-xl transition-all border ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          } h-fit space-y-5 print:hidden`}>

            {/* TAB NAVIGATION BUTTONS */}
            <div className="grid grid-cols-4 gap-1 rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-[11px] font-semibold">
              <button
                onClick={() => setActiveTab('editor')}
                className={`py-2 rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                  activeTab === 'editor'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Teks</span>
              </button>

              <button
                onClick={() => setActiveTab('layout')}
                className={`py-2 rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                  activeTab === 'layout'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Layout & Foto</span>
              </button>

              <button
                onClick={() => setActiveTab('branding')}
                className={`py-2 rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                  activeTab === 'branding'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Aset Header</span>
              </button>

              <button
                onClick={() => setActiveTab('ai')}
                className={`py-2 rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                  activeTab === 'ai'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>AI Berita</span>
              </button>
            </div>

            {/* TAB 1: TEXT CONTENT EDITING */}
            {activeTab === 'editor' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Judul Utama / Headline
                  </label>
                  <textarea
                    rows={2}
                    value={flyerData.headline}
                    onChange={(e) => setFlyerData({ ...flyerData, headline: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-emerald-500 outline-none font-bold uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Lokasi Berita</label>
                    <input
                      type="text"
                      value={flyerData.location}
                      onChange={(e) => setFlyerData({ ...flyerData, location: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Tanggal Berita</label>
                    <input
                      type="text"
                      value={flyerData.date}
                      onChange={(e) => setFlyerData({ ...flyerData, date: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Inisial Jurnalis</label>
                    <input
                      type="text"
                      value={flyerData.reporterInitials}
                      onChange={(e) => setFlyerData({ ...flyerData, reporterInitials: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Link QR Code</label>
                    <input
                      type="text"
                      value={flyerData.qrCodeLink}
                      onChange={(e) => setFlyerData({ ...flyerData, qrCodeLink: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {/* PARAGRAPHS EDITING */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Isi Paragraf Berita ({flyerData.paragraphs.length})
                    </label>
                    <button
                      onClick={addParagraph}
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah Paragraf
                    </button>
                  </div>
                  {flyerData.paragraphs.map((para, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <span className="text-[10px] font-bold text-slate-400 mt-2">#{idx + 1}</span>
                      <textarea
                        rows={3}
                        value={para}
                        onChange={(e) => handleParagraphChange(idx, e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                      {flyerData.paragraphs.length > 1 && (
                        <button
                          onClick={() => removeParagraph(idx)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg mt-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: LAYOUT VARIATIONS & PHOTO RESIZING */}
            {activeTab === 'layout' && (
              <div className="space-y-5">
                {/* 1. LAYOUT PRESETS */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    1. Pilih Variasi Tata Letak Berita
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'classic', label: 'Klasik ZONASI', desc: 'Standar koran dengan sidebar foto' },
                      { id: 'editorial', label: 'Editorial Modern', desc: 'Foto Utama Banner besar di atas' },
                      { id: 'magazine', label: 'Majalah Trendi', desc: 'Galeri foto horizontal tengah' },
                      { id: 'compact', label: 'Koran Ringkas', desc: 'Fokus teks rapat untuk berita panjang' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setLayoutStyle(item.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          layoutStyle === item.id
                            ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="text-xs font-bold">{item.label}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. NUMBER OF PHOTOS & ARRANGEMENT */}
                <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    2. Jumlah Foto Berita (Menyesuaikan Panjang Teks A4)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((count) => (
                      <button
                        key={count}
                        onClick={() => setPhotoCount(count)}
                        className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                          photoCount === count
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        {count} Foto
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. RESIZE PHOTO HEIGHT SLIDER */}
                <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-3">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-300">3. Fitur Resize Ukuran Tinggi Foto</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{photoHeight}px</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="320"
                    step="10"
                    value={photoHeight}
                    onChange={(e) => setPhotoHeight(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-500">
                    💡 Geser slider untuk memperkecil/memperbesar tinggi foto agar berita pas di kertas A4 tanpa terpotong.
                  </p>
                </div>

                {/* 4. FONT SIZE DENSITY */}
                <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    4. Ukuran Kerapatan Teks
                  </label>
                  <div className="flex gap-2 text-xs">
                    {[
                      { id: 'compact', label: 'Rapat (Teks Panjang)' },
                      { id: 'normal', label: 'Standar' },
                      { id: 'relaxed', label: 'Renggang' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFontSize(f.id)}
                        className={`flex-1 py-1.5 px-1 rounded-lg border text-[11px] font-semibold transition-all ${
                          fontSize === f.id
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. UPLOAD EACH PHOTO */}
                <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    5. Upload Foto Berita ({photoCount} Foto Aktif)
                  </label>
                  {Array.from({ length: photoCount }).map((_, idx) => (
                    <div key={idx} className="space-y-1">
                      <span className="text-[11px] font-medium text-slate-500">Foto #{idx + 1}</span>
                      <label className="flex items-center justify-between border border-dashed border-slate-300 dark:border-slate-700 p-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <div className="flex items-center space-x-2">
                          <Camera className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs text-slate-600 dark:text-slate-400">Pilih foto #{idx + 1}...</span>
                        </div>
                        <input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(e, idx)} className="hidden" />
                        {flyerData.photos[idx] && (
                          <img src={flyerData.photos[idx]} alt={`Foto ${idx}`} className="w-8 h-8 object-cover rounded" />
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: CUSTOM BRANDING & ASSET UPLOADS */}
            {activeTab === 'branding' && (
              <div className="space-y-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
                  <span className="font-bold block mb-1">📌 Upload Header & Logo Custom:</span>
                  <p className="leading-relaxed">Unggah logo madrasah, logo sponsor, headline banner ZONASI, dan footer custom sesuai standar dinas.</p>
                </div>

                {/* 1. LOGO MADRASAH (KIRI ATAS) */}
                <div className="space-y-1.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    1. Upload Logo Madrasah (Kiri Atas)
                  </span>
                  {flyerData.matsagisaLogoAsset ? (
                    <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                      <img src={flyerData.matsagisaLogoAsset} alt="Logo Madrasah" className="h-10 object-contain" />
                      <button onClick={() => removeAsset('matsagisaLogoAsset')} className="text-xs text-rose-600 font-semibold">Hapus</button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-2 border border-dashed border-slate-300 dark:border-slate-700 p-2.5 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                      <Upload className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs text-slate-600 dark:text-slate-400">Pilih Gambar Logo Madrasah</span>
                      <input type="file" accept="image/*" onChange={(e) => handleAssetUpload(e, 'matsagisaLogoAsset')} className="hidden" />
                    </label>
                  )}
                </div>

                {/* 2. SPONSOR / PARTNER HEADER (KANAN ATAS) */}
                <div className="space-y-1.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    2. Upload Logo Sponsor / Header (Kanan Atas)
                  </span>
                  {flyerData.sponsorHeaderAsset ? (
                    <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                      <img src={flyerData.sponsorHeaderAsset} alt="Logo Sponsor Header" className="h-10 object-contain" />
                      <button onClick={() => removeAsset('sponsorHeaderAsset')} className="text-xs text-rose-600 font-semibold">Hapus</button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-2 border border-dashed border-slate-300 dark:border-slate-700 p-2.5 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                      <Upload className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs text-slate-600 dark:text-slate-400">Pilih Logo Sponsor / Header Kemenag</span>
                      <input type="file" accept="image/*" onChange={(e) => handleAssetUpload(e, 'sponsorHeaderAsset')} className="hidden" />
                    </label>
                  )}
                </div>

                {/* 3. CUSTOM HEADLINE ZONASI BANNER */}
                <div className="space-y-1.5 p-3 rounded-xl border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block">
                    3. Upload Custom Banner Headline "ZONASI Zona Informasi"
                  </span>
                  {flyerData.zonasiBannerAsset ? (
                    <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-2 rounded-lg border border-emerald-200">
                      <img src={flyerData.zonasiBannerAsset} alt="Banner ZONASI" className="h-12 object-contain" />
                      <button onClick={() => removeAsset('zonasiBannerAsset')} className="text-xs text-rose-600 font-semibold">Hapus</button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-2 border border-dashed border-emerald-400 dark:border-emerald-700 p-3 rounded-lg cursor-pointer hover:bg-emerald-100/50">
                      <Upload className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300">Upload Banner Headline ZONASI</span>
                      <input type="file" accept="image/*" onChange={(e) => handleAssetUpload(e, 'zonasiBannerAsset')} className="hidden" />
                    </label>
                  )}
                </div>

                {/* 4. CUSTOM FOOTER BANNER */}
                <div className="space-y-1.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    4. Upload Banner Footer (Paling Bawah)
                  </span>
                  {flyerData.customFooterAsset ? (
                    <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                      <img src={flyerData.customFooterAsset} alt="Footer Custom" className="h-10 object-contain" />
                      <button onClick={() => removeAsset('customFooterAsset')} className="text-xs text-rose-600 font-semibold">Hapus</button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-2 border border-dashed border-slate-300 dark:border-slate-700 p-2.5 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                      <Upload className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs text-slate-600 dark:text-slate-400">Pilih Banner Footer Custom</span>
                      <input type="file" accept="image/*" onChange={(e) => handleAssetUpload(e, 'customFooterAsset')} className="hidden" />
                    </label>
                  )}
                </div>

                {/* 5. OVERRIDE FULL HEADER */}
                <div className="space-y-1.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    5. Upload Full Header Banner (Ganti Semua Header)
                  </span>
                  {flyerData.customHeaderAsset ? (
                    <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                      <img src={flyerData.customHeaderAsset} alt="Header Full" className="h-10 object-contain" />
                      <button onClick={() => removeAsset('customHeaderAsset')} className="text-xs text-rose-600 font-semibold">Hapus</button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-2 border border-dashed border-slate-300 dark:border-slate-700 p-2.5 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                      <Upload className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs text-slate-600 dark:text-slate-400">Upload Banner Full Header</span>
                      <input type="file" accept="image/*" onChange={(e) => handleAssetUpload(e, 'customHeaderAsset')} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: AI NEWS GENERATOR */}
            {activeTab === 'ai' && (
              <div className="space-y-4">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-300 space-y-1">
                  <span className="font-bold flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>AI Assistant Berita Madrasah</span>
                  </span>
                  <p className="leading-relaxed">Tuliskan kata kunci kegiatan, lalu AI akan menyusun judul berita & narasi otomatis.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Topik Kegiatan / Kata Kunci
                  </label>
                  <textarea
                    rows={3}
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Contoh: Upacara Bendera Peringatan Hari Santri..."
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <button
                  onClick={generateAINews}
                  disabled={isGeneratingAI}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
                >
                  {isGeneratingAI ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Menyusun Berita...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Teks Berita AI</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* DEVELOPER CREDIT */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <UserCheck className="w-3.5 h-3.5" />
                Pengembang: Syahril Nur
              </span>
              <span className="italic">Senior Full-Stack Developer</span>
            </div>

          </aside>
        )}

        {/* PREVIEW CANVAS AREA */}
        <section className={`flex-1 flex flex-col items-center justify-start ${
          isEditing ? '' : 'w-full max-w-4xl mx-auto'
        }`}>

          {/* ACTION TOOLBAR DIRECTLY ABOVE PREVIEW */}
          <div className="w-full max-w-[820px] mb-3 p-2 bg-slate-200/70 dark:bg-slate-800/70 backdrop-blur rounded-xl flex items-center justify-between gap-2 border border-slate-300 dark:border-slate-700 print:hidden text-xs">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                A4 FORMAT
              </span>
              <span className="text-slate-600 dark:text-slate-300 font-medium hidden sm:inline">
                Layout: <b className="capitalize">{layoutStyle}</b> ({photoCount} Foto)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadJPG}
                disabled={isExporting}
                className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold flex items-center gap-1 shadow-sm transition-all text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save JPG</span>
              </button>

              <button
                onClick={handlePrintPDF}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1 shadow-sm transition-all text-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>

          {/* A4 CANVAS CONTAINER */}
          <div
            id="flyer-canvas"
            className="w-full bg-white text-slate-900 shadow-2xl rounded-md overflow-hidden border border-slate-300 print:border-none print:shadow-none"
            style={{
              maxWidth: '820px',
              minHeight: '1120px', // Standard proportion close to A4
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}
          >
            <div className="p-6 md:p-8 space-y-4 flex flex-col justify-between h-full">

              <div className="space-y-4">
                {/* 1. HEADER SECTION (LOGOS & SPONSOR / CUSTOM HEADER) */}
                {flyerData.customHeaderAsset ? (
                  <div className="w-full flex justify-center items-center pb-2 border-b-2 border-slate-100">
                    <img
                      src={flyerData.customHeaderAsset}
                      alt="Custom Full Header"
                      className="w-full max-h-32 object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex justify-between items-center pb-2 border-b-2 border-slate-100 gap-2">

                    {/* Left: Logo Madrasah (Custom or Default) */}
                    {flyerData.matsagisaLogoAsset ? (
                      <img src={flyerData.matsagisaLogoAsset} alt="Logo Madrasah" className="h-10 md:h-12 object-contain max-w-[160px]" />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <div className="w-11 h-11 bg-emerald-700 rounded-full flex items-center justify-center p-1.5 text-white shadow">
                          <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                            <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="none" stroke="currentColor" strokeWidth="6" />
                            <circle cx="50" cy="50" r="24" fill="#eab308" />
                            <path d="M50 30 L60 65 L35 45 L65 45 L40 65 Z" fill="#047857" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-extrabold text-rose-500 leading-none text-base tracking-tight font-sans">
                            MATSAGISA
                          </div>
                          <div className="font-bold text-teal-600 text-xs italic tracking-wide font-serif">
                            Boalemo
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Center Tagline Badge */}
                    <div className="bg-[#0b5c5c] text-white px-3 md:px-5 py-1.5 rounded-sm shadow-sm text-center">
                      <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase block">
                        {flyerData.tagline}
                      </span>
                    </div>

                    {/* Right: Sponsor / Partner Header (Custom or Default Kemenag) */}
                    <div className="flex items-center space-x-2">
                      {flyerData.sponsorHeaderAsset ? (
                        <img src={flyerData.sponsorHeaderAsset} alt="Sponsor Header" className="h-10 md:h-12 object-contain max-w-[180px]" />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Logo_Kementerian_Agama_Republik_Indonesia.svg/512px-Logo_Kementerian_Agama_Republik_Indonesia.svg.png"
                            alt="Kemenag Logo"
                            className="h-8 md:h-10 w-auto object-contain"
                            crossOrigin="anonymous"
                          />
                          <span className="text-blue-600 font-extrabold text-xs md:text-sm tracking-tighter">EMIS</span>
                          <span className="text-cyan-700 font-bold text-xs border-l border-slate-300 pl-1.5 lowercase">pusaka</span>
                        </div>
                      )}
                    </div>

                  </div>
                )}

                {/* 2. CUSTOM HEADLINE ZONASI BANNER & QR CODE */}
                {flyerData.zonasiBannerAsset ? (
                  <div className="w-full flex justify-between items-center border-b-2 border-slate-100 py-1 gap-2">
                    <img src={flyerData.zonasiBannerAsset} alt="Banner ZONASI" className="h-16 md:h-20 object-contain flex-1" />
                    <div className="flex flex-col items-center bg-slate-50 p-1 border border-slate-200 rounded shrink-0">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(flyerData.qrCodeLink)}`}
                        alt="QR Code"
                        className="w-12 h-12 md:w-14 md:h-14"
                      />
                      <span className="text-[7px] font-bold text-slate-500 mt-0.5 uppercase">Pindai Berita</span>
                    </div>
                  </div>
                ) : (
                  <div className="border-4 border-[#0b5c5c] p-3 md:p-4 rounded-sm flex justify-between items-center bg-white shadow-sm">
                    <div className="space-y-0.5">
                      <h1 className="text-4xl md:text-5xl font-black tracking-widest text-[#008751] font-serif leading-none">
                        {flyerData.mainTitle}
                      </h1>
                      <p className="text-xs md:text-sm font-extrabold tracking-[0.3em] text-amber-500 uppercase">
                        {flyerData.subTitle}
                      </p>
                    </div>

                    <div className="flex flex-col items-center bg-slate-50 p-1.5 border border-slate-200 rounded">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(flyerData.qrCodeLink)}`}
                        alt="QR Code"
                        className="w-14 h-14 md:w-16 md:h-16"
                      />
                      <span className="text-[8px] font-bold text-slate-500 mt-1 uppercase">Pindai Berita</span>
                    </div>
                  </div>
                )}

                {/* 3. NEWS BODY LAYOUT VARIATIONS */}

                {/* VARIATION A: KLASIK ZONASI (SIDEBAR STACKED PHOTOS) */}
                {layoutStyle === 'classic' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-1">
                    {/* Left: Headline & Text */}
                    <div className={photoCount > 1 ? 'md:col-span-7 space-y-3' : 'md:col-span-12 space-y-3'}>
                      {flyerData.photos[0] && (
                        <div
                          className="w-full rounded-sm overflow-hidden border border-slate-200 shadow-sm bg-slate-100"
                          style={{ height: `${photoHeight}px` }}
                        >
                          <img src={flyerData.photos[0]} alt="Foto Utama" className="w-full h-full object-cover" />
                        </div>
                      )}

                      <h2 className="text-base md:text-lg font-black text-[#852758] uppercase leading-snug tracking-tight">
                        {flyerData.headline}
                      </h2>

                      <div className={`text-slate-800 text-justify font-normal ${getFontSizeClass()}`}>
                        {flyerData.paragraphs.map((paragraph, idx) => (
                          <p key={idx}>
                            {idx === 0 ? (
                              <>
                                <span className="font-extrabold text-slate-900">
                                  {flyerData.location}, {flyerData.date} –
                                </span>{' '}
                                {paragraph.replace(new RegExp(`^${flyerData.location},?\\s*${flyerData.date}\\s*–?\\s*`), '')}
                              </>
                            ) : (
                              paragraph
                            )}
                            {idx === flyerData.paragraphs.length - 1 && flyerData.reporterInitials && (
                              <span className="font-extrabold ml-1 text-slate-900">({flyerData.reporterInitials})</span>
                            )}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Right: Side Photos */}
                    {photoCount > 1 && (
                      <div className="md:col-span-5 space-y-3">
                        {flyerData.photos.slice(1, photoCount).map((imgUrl, index) => (
                          <div
                            key={index}
                            className="w-full rounded-sm overflow-hidden border border-slate-200 shadow-sm bg-slate-100"
                            style={{ height: `${Math.max(100, photoHeight - 30)}px` }}
                          >
                            <img src={imgUrl} alt={`Galeri ${index + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* VARIATION B: EDITORIAL MODERN (HERO PHOTO AT TOP) */}
                {layoutStyle === 'editorial' && (
                  <div className="space-y-4 pt-1">
                    <h2 className="text-lg md:text-xl font-black text-[#0b5c5c] uppercase leading-snug tracking-tight text-center">
                      {flyerData.headline}
                    </h2>

                    {/* Hero Photo Grid */}
                    <div className="grid grid-cols-12 gap-2">
                      <div
                        className={photoCount > 1 ? 'col-span-8 rounded-sm overflow-hidden border bg-slate-100' : 'col-span-12 rounded-sm overflow-hidden border bg-slate-100'}
                        style={{ height: `${photoHeight + 40}px` }}
                      >
                        <img src={flyerData.photos[0]} alt="Hero Utama" className="w-full h-full object-cover" />
                      </div>

                      {photoCount > 1 && (
                        <div className="col-span-4 flex flex-col gap-2">
                          {flyerData.photos.slice(1, photoCount).map((img, i) => (
                            <div key={i} className="flex-1 rounded-sm overflow-hidden border bg-slate-100">
                              <img src={img} alt={`Side ${i}`} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Dual Column Text Layout */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-800 text-justify ${getFontSizeClass()}`}>
                      <div className="space-y-3">
                        {flyerData.paragraphs.slice(0, Math.ceil(flyerData.paragraphs.length / 2)).map((p, idx) => (
                          <p key={idx}>
                            {idx === 0 ? (
                              <>
                                <span className="font-extrabold text-slate-900">
                                  {flyerData.location}, {flyerData.date} –
                                </span>{' '}
                                {p.replace(new RegExp(`^${flyerData.location},?\\s*${flyerData.date}\\s*–?\\s*`), '')}
                              </>
                            ) : p}
                          </p>
                        ))}
                      </div>

                      <div className="space-y-3">
                        {flyerData.paragraphs.slice(Math.ceil(flyerData.paragraphs.length / 2)).map((p, idx) => (
                          <p key={idx}>
                            {p}
                            {idx === flyerData.paragraphs.slice(Math.ceil(flyerData.paragraphs.length / 2)).length - 1 && flyerData.reporterInitials && (
                              <span className="font-extrabold ml-1 text-slate-900">({flyerData.reporterInitials})</span>
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* VARIATION C: MAJALAH TRENDI (STRIP PHOTO GALLERY IN MIDDLE) */}
                {layoutStyle === 'magazine' && (
                  <div className="space-y-4 pt-1">
                    <h2 className="text-base md:text-xl font-black text-[#852758] uppercase leading-snug border-b-2 border-amber-400 pb-2">
                      {flyerData.headline}
                    </h2>

                    <div className={`text-slate-800 text-justify ${getFontSizeClass()}`}>
                      <p>
                        <span className="font-extrabold text-slate-900">
                          {flyerData.location}, {flyerData.date} –
                        </span>{' '}
                        {flyerData.paragraphs[0]?.replace(new RegExp(`^${flyerData.location},?\\s*${flyerData.date}\\s*–?\\s*`), '')}
                      </p>
                    </div>

                    {/* Horizontal Photo Strip */}
                    <div className={`grid grid-cols-${Math.min(photoCount, 4)} gap-2 my-2`}>
                      {flyerData.photos.slice(0, photoCount).map((img, i) => (
                        <div key={i} className="rounded border bg-slate-100 overflow-hidden" style={{ height: `${photoHeight - 20}px` }}>
                          <img src={img} alt={`Strip ${i}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>

                    <div className={`text-slate-800 text-justify ${getFontSizeClass()}`}>
                      {flyerData.paragraphs.slice(1).map((p, idx) => (
                        <p key={idx}>
                          {p}
                          {idx === flyerData.paragraphs.length - 2 && flyerData.reporterInitials && (
                            <span className="font-extrabold ml-1 text-slate-900">({flyerData.reporterInitials})</span>
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* VARIATION D: KORAN RINGKAS (TEXT FIRST COMPACT) */}
                {layoutStyle === 'compact' && (
                  <div className="space-y-3 pt-1">
                    <h2 className="text-base md:text-lg font-black text-slate-900 uppercase border-l-4 border-emerald-600 pl-3">
                      {flyerData.headline}
                    </h2>

                    <div className={`text-slate-800 text-justify ${getFontSizeClass()}`}>
                      {flyerData.paragraphs.map((paragraph, idx) => (
                        <p key={idx}>
                          {idx === 0 ? (
                            <>
                              <span className="font-extrabold text-slate-900">
                                {flyerData.location}, {flyerData.date} –
                              </span>{' '}
                              {paragraph.replace(new RegExp(`^${flyerData.location},?\\s*${flyerData.date}\\s*–?\\s*`), '')}
                            </>
                          ) : paragraph}
                          {idx === flyerData.paragraphs.length - 1 && flyerData.reporterInitials && (
                            <span className="font-extrabold ml-1 text-slate-900">({flyerData.reporterInitials})</span>
                          )}
                        </p>
                      ))}
                    </div>

                    {/* Bottom Photo Grid */}
                    <div className={`grid grid-cols-${Math.min(photoCount, 4)} gap-2 pt-2 border-t border-slate-200`}>
                      {flyerData.photos.slice(0, photoCount).map((img, i) => (
                        <div key={i} className="rounded border bg-slate-100 overflow-hidden" style={{ height: `${photoHeight - 30}px` }}>
                          <img src={img} alt={`Footer photo ${i}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. FOOTER MEDIA SOSIAL / CUSTOM FOOTER (PALING BAWAH) */}
              <div className="pt-3 border-t-2 border-slate-200 mt-auto">
                {flyerData.customFooterAsset ? (
                  <div className="w-full flex justify-center items-center">
                    <img src={flyerData.customFooterAsset} alt="Custom Full Footer" className="w-full max-h-16 object-contain" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-[10px] md:text-xs font-bold text-slate-700">
                    <div className="flex items-center justify-center space-x-1.5 bg-slate-50 py-1.5 px-2 rounded border border-slate-100">
                      <span className="text-red-600 font-black">▶</span>
                      <span className="truncate">{flyerData.socials.youtube}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1.5 bg-slate-50 py-1.5 px-2 rounded border border-slate-100">
                      <span className="text-pink-600 font-black">📷</span>
                      <span className="truncate">{flyerData.socials.instagram}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1.5 bg-slate-50 py-1.5 px-2 rounded border border-slate-100">
                      <span className="text-blue-600 font-black">f</span>
                      <span className="truncate">{flyerData.socials.facebook}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1.5 bg-slate-50 py-1.5 px-2 rounded border border-slate-100">
                      <span className="font-black text-black">🎵</span>
                      <span className="truncate">{flyerData.socials.tiktok}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}