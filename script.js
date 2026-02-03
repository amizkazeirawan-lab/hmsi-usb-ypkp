/* =========================================
   1. Performance Check (Low-End Device)
   ========================================= */
if (navigator.deviceMemory < 4 || navigator.connection?.saveData) {
  document.body.classList.add('low-end-device');
  console.log("Perangkat terdeteksi low-end, mematikan animasi berat...");
}

/* =========================================
   2. Configuration & SDK Integration
   ========================================= */
const defaultConfig = {
  background_color: '#1e0a3c',
  surface_color: '#4c1d95',
  text_color: '#ffffff',
  primary_action_color: '#a855f7',
  secondary_action_color: '#c084fc',
  font_family: 'Times New Roman',
  font_size: 18,
  organization_name: 'HMSI',
  organization_tagline: 'Universitas Sangga Buana YPKP Bandung',
  hero_title: 'HIMPUNAN MAHASISWA SISTEM INFORMASI',
  hero_subtitle: 'Mahasiswa sistem informasi yang kolaboratif dan inovatif',
  about_title: 'Tentang HMSI',
  about_description: 'HMSI atau Himpunan Mahasiswa Sistem Informasi...', // (Isi deskripsi biarkan sama)
  programs_title: 'Program Kerja',
  
  // TAMBAHKAN/UBAH BAGIAN INI:
  gallery_title: 'Galeri Kegiatan', // Mengganti referensi proteksi jika ada
  
  contact_title: 'Hubungi Kami',
  footer_text: '© 2026 HMSI. All rights reserved.'
};

async function onConfigChange(config) {
  const customFont = config.font_family || defaultConfig.font_family;
  const baseSize = config.font_size || defaultConfig.font_size;
  const baseFontStack = 'Times, serif';

  document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;

  const bgColor = config.background_color || defaultConfig.background_color;
  const surfaceColor = config.surface_color || defaultConfig.surface_color;

  const appWrapper = document.getElementById('app-wrapper');
  if (appWrapper) {
    appWrapper.style.background = `linear-gradient(135deg, ${bgColor} 0%, #2d0f5a 25%, ${surfaceColor} 50%, #5b21b6 75%, #6b21a8 100%)`;
  }

  const navName = document.getElementById('nav-name');
  if (navName) navName.textContent = config.organization_name || defaultConfig.organization_name;

  const navTagline = document.getElementById('nav-tagline');
  if (navTagline) navTagline.textContent = config.organization_tagline || defaultConfig.organization_tagline;

  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) heroTitle.innerHTML = `<span class="text-gradient">${config.hero_title || defaultConfig.hero_title}</span>`;

  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle) heroSubtitle.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;

  const aboutTitle = document.getElementById('about-title');
  if (aboutTitle) {
    const titleText = config.about_title || defaultConfig.about_title;
    aboutTitle.innerHTML = `${titleText.split(' ')[0]} <span class="text-gradient">${titleText.split(' ').slice(1).join(' ')}</span>`;
  }

  const aboutDesc = config.about_description || defaultConfig.about_description;
  const aboutDescEl = document.getElementById('about-description');
  if (aboutDescEl) aboutDescEl.innerHTML = aboutDesc.split('\n\n').map(para => para.trim()).join('<br><br>');

  const progTitle = document.getElementById('programs-title');
  if (progTitle) {
    const pTitleText = config.programs_title || defaultConfig.programs_title;
    progTitle.innerHTML = `${pTitleText.split(' ')[0]} <span class="text-gradient">${pTitleText.split(' ').slice(1).join(' ')}</span>`;
  }

  const contactTitle = document.getElementById('contact-title');
  if (contactTitle) contactTitle.innerHTML = `<span class="text-gradient">${config.contact_title || defaultConfig.contact_title}</span>`;

  const footerText = document.getElementById('footer-text');
  if (footerText) footerText.textContent = config.footer_text || defaultConfig.footer_text;
  
  const galleryTitle = document.getElementById('gallery-title');
  if (galleryTitle) {
     const gText = config.gallery_title || 'Galeri Kegiatan HMSI';
     galleryTitle.innerHTML = `${gText.split(' ')[0]} <span class="text-gradient">${gText.split(' ').slice(1).join(' ')}</span>`;
  }

  // Font sizing updates
  if (heroTitle) heroTitle.style.fontSize = `${baseSize * 3}px`;
  if (heroSubtitle) heroSubtitle.style.fontSize = `${baseSize * 1.25}px`;
  if (aboutTitle) aboutTitle.style.fontSize = `${baseSize * 2.5}px`;
  if (progTitle) progTitle.style.fontSize = `${baseSize * 2.5}px`;
  if (contactTitle) contactTitle.style.fontSize = `${baseSize * 2.5}px`;
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities: (config) => ({
      recolorables: [{
          get: () => config.background_color || defaultConfig.background_color,
          set: (value) => {
            window.elementSdk.config.background_color = value;
            window.elementSdk.setConfig({
              background_color: value
            });
          }
        },
        {
          get: () => config.surface_color || defaultConfig.surface_color,
          set: (value) => {
            window.elementSdk.config.surface_color = value;
            window.elementSdk.setConfig({
              surface_color: value
            });
          }
        },
        {
          get: () => config.text_color || defaultConfig.text_color,
          set: (value) => {
            window.elementSdk.config.text_color = value;
            window.elementSdk.setConfig({
              text_color: value
            });
          }
        },
        {
          get: () => config.primary_action_color || defaultConfig.primary_action_color,
          set: (value) => {
            window.elementSdk.config.primary_action_color = value;
            window.elementSdk.setConfig({
              primary_action_color: value
            });
          }
        },
        {
          get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
          set: (value) => {
            window.elementSdk.config.secondary_action_color = value;
            window.elementSdk.setConfig({
              secondary_action_color: value
            });
          }
        }
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || defaultConfig.font_family,
        set: (value) => {
          window.elementSdk.config.font_family = value;
          window.elementSdk.setConfig({
            font_family: value
          });
        }
      },
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (value) => {
          window.elementSdk.config.font_size = value;
          window.elementSdk.setConfig({
            font_size: value
          });
        }
      }
    }),
    mapToEditPanelValues: (config) => new Map([
      ['organization_name', config.organization_name || defaultConfig.organization_name],
      ['organization_tagline', config.organization_tagline || defaultConfig.organization_tagline],
      ['hero_title', config.hero_title || defaultConfig.hero_title],
      ['hero_subtitle', config.hero_subtitle || defaultConfig.hero_subtitle],
      ['about_title', config.about_title || defaultConfig.about_title],
      ['about_description', config.about_description || defaultConfig.about_description],
      ['programs_title', config.programs_title || defaultConfig.programs_title],
      ['contact_title', config.contact_title || defaultConfig.contact_title],
      ['footer_text', config.footer_text || defaultConfig.footer_text]
    ])
  });
}
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities: (config) => ({
            // ... (bagian capabilities biarkan sama) ...
        }),
        mapToEditPanelValues: (config) => new Map([
            // ... (mapping yang lama) ...
            ['gallery_title', config.gallery_title || defaultConfig.gallery_title], // Tambahkan ini
        ])
    });
}

/* =========================================
   3. Navigation & Scrolling Logic
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* =========================================
   4. Stats Counter Animation
   ========================================= */
function animateCounter() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 16);
  });
}

/* =========================================
   5. Scroll To Top Button
   ========================================= */
const scrollTopBtn = document.getElementById('scrollTopBtn');
const appWrapper = document.getElementById('app-wrapper');

if (appWrapper && scrollTopBtn) {
  appWrapper.addEventListener('scroll', () => {
    if (appWrapper.scrollTop > 300) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.pointerEvents = 'auto';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.pointerEvents = 'none';
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    appWrapper.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* =========================================
   6. Particle Effects & Observers
   ========================================= */
function createParticle() {
  const app = document.getElementById('app-wrapper');
  if (!app) return;

  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
  particle.style.animationDelay = Math.random() * 2 + 's';
  app.appendChild(particle);

  setTimeout(() => particle.remove(), 5000);
}

// Jalankan partikel setiap 300ms
setInterval(createParticle, 300);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.card-hover').forEach(el => observer.observe(el));

// Jalankan counter setelah sedikit delay
setTimeout(animateCounter, 500);

/* =========================================
   7. Data Bidang & Modal Logic
   ========================================= */

// Data struktur organisasi per bidang
const bidangData = {
  psdm: {
    title: 'PSDM - Pengembangan Sumber Daya Manusia',
    description: 'Bidang yang memiliki peran mengelola SDM yang ada, membentuk anggota HMSI yang kompeten, mengelola dan mengembangkan kompetensi anggota HMSI.',
    image: 'https://lh3.googleusercontent.com/d/1MHeEwocuuf_X1R0xQ9HMi3qNaJYaoPdO',
    subBidangInfo: [{
        name: 'Sub Bidang Kaderisasi',
        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
        description: 'Berprogram untuk membangun keberlangsungan regenerasi HMSI yang komitmen, berkarakter, dan berjiwa pemimpin melalui penanaman nilai organisasi kepada anggota.'
      },
      {
        name: 'Sub Bidang Pendidikan',
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
        description: 'Membekali anggota di bidang akademik maupun non akademik melalui seminar, pelatihan, dan kegiatan pengembangan kompetensi lainnya.'
      },
      {
        name: 'Sub Bidang Rumah Tangga',
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        description: 'Menjaga kestabilan anggota HMSI dan menciptakan lingkungan organisasi yang kondusif bagi semua elemen.'
      }
    ],
    structure: [{
      level: 'Kepala Bidang PSDM',
      members: [{
        name: 'Fitrianing Rahayu',
        nim: '1.3.24.05.12'
      }],
      subBidang: [{
          level: 'Kepala Sub Bidang Kaderisasi',
          members: [{
            name: 'Sandika Rangga',
            nim: '1.3.23.04.01'
          }],
          staff: [{
            name: 'Dinggorang Otto Geisler T.',
            nim: '1.3.24.05.13'
          }]
        },
        {
          level: 'Kepala Sub Bidang Rumah Tangga',
          members: [{
            name: 'Fanya Silviani Putri',
            nim: '1.3.23.04.05'
          }],
          staff: [{
            name: 'Siti Nurkholisoh',
            nim: '1.3.24.05.02'
          }]
        },
        {
          level: 'Kepala Sub Bidang Pendidikan',
          members: [{
            name: 'Indra Nazru',
            nim: '1.3.24.05.01'
          }],
          staff: [{
            name: 'Arya Wangsa G.P',
            nim: '1.3.23.04.23'
          }]
        }
      ]
    }]
  },
  humas: {
    title: 'HUMAS - Hubungan Masyarakat',
    description: 'Bidang yang bertanggung jawab mengelola komunikasi dan hubungan baik antara HMSI dengan mahasiswa, kampus, dan pihak eksternal. Membangun dan memperkuat hubungan dengan berbagai organisasi, menjalin kerjasama strategis dengan mitra internal dan eksternal, serta meningkatkan kepedulian sosial dan keakraban anggota.',
    image: 'https://lh3.googleusercontent.com/d/1ZjxWKthSXlDSYaz-XqYydPuO18ftma3G',
    subBidangInfo: [{
        name: 'Sub Bidang Internal',
        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
        description: 'Mengelola hubungan internal dan meningkatkan keakraban antar anggota HMSI melalui kegiatan yang mempererat solidaritas dan kepedulian sosial.'
      },
      {
        name: 'Sub Bidang Eksternal',
        icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        description: 'Membangun dan memperkuat hubungan dengan berbagai organisasi eksternal serta menjalin kerjasama strategis dengan mitra di luar HMSI.'
      }
    ],
    structure: [{
      level: 'Kepala Bidang HUMAS',
      members: [{
        name: 'Rangga Febriansyah',
        nim: '1.3.23.04.03'
      }],
      subBidang: [{
          level: 'Kepala Sub Bidang Internal',
          members: [{
            name: 'Gilham Arda Sena',
            nim: '1.3.23.04.15'
          }],
          staff: [{
              name: 'Muhammad Rama Wijaya',
              nim: '1.3.24.05.06'
            },
            {
              name: 'Muchamad Rizky Nur Fariza',
              nim: '1.3.24.05.16'
            },
            {
              name: 'Farhan Musyaffa Jundulloh',
              nim: '1.3.23.04.18'
            }
          ]
        },
        {
          level: 'Kepala Sub Bidang Eksternal',
          members: [{
            name: 'Arij Maulana Achmad',
            nim: '1.3.24.05.11'
          }],
          staff: [{
              name: 'Adrian Fahriza Rahadian',
              nim: '1.3.23.04.19'
            },
            {
              name: 'Awang Sofrianda',
              nim: '1.3.23.04.16'
            },
            {
              name: 'Aldi Surya Putra',
              nim: '1.3.24.05.19'
            },
            {
              name: 'Marsa Raihhadatul',
              nim: '1.3.24.05.18'
            }
          ]
        }
      ]
    }]
  },
  bekraf: {
    title: 'BEKRAF - Ekonomi dan Kreatif',
    description: 'Bidang yang fokus meningkatkan keuangan himpunan melalui berbagai produk dan layanan berkualitas. Meningkatkan pendapatan organisasi, memperkuat identitas HMSI melalui merchandise, serta menyediakan layanan berkualitas bagi mahasiswa.',
    image: 'https://lh3.googleusercontent.com/d/1yEKkAi8FdshD9EC0O7BepA2MtrlS4cb8',
    subBidangInfo: [{
        name: 'Sub Bidang Ekonomi',
        icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
        description: 'Mengelola sumber pendapatan organisasi melalui iuran anggota, sponsorship, dan kerjasama ekonomi untuk mendukung kegiatan HMSI.'
      },
      {
        name: 'Sub Bidang Kreatif',
        icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
        description: 'Mengembangkan merchandise dan produk kreatif HMSI seperti kemeja, PDH, dan lainnya untuk memperkuat branding dan identitas himpunan.'
      }
    ],
    structure: [{
      level: 'Kepala Bidang BEKRAF',
      members: [{
        name: 'Muhammad Rizky Hidayatullah',
        nim: '1.3.24.05.04'
      }],
      subBidang: [{
          level: 'Kepala Sub Bidang Ekonomi',
          members: [{
            name: 'Delia Zahra Nurpadila',
            nim: '1.3.23.04.07'
          }],
          staff: [{
              name: 'Muhamad Fachry Firdaus',
              nim: '1.3.24.05.14'
            },
            {
              name: 'Rega Sabrina Fatmawati',
              nim: '1.3.24.05.20'
            }
          ]
        },
        {
          level: 'Kepala Sub Bidang Kreatif',
          members: [{
            name: 'Muhamad Rizky Oktarubbi',
            nim: '1.3.23.04.09'
          }],
          staff: [{
              name: 'Farhan Fadillah',
              nim: '1.3.23.04.25'
            },
            {
              name: 'Raffa Fajar Islami',
              nim: '1.3.24.05.15'
            }
          ]
        }
      ]
    }]
  },
  bks: {
    title: 'BKS - Kepedulian Sosial',
    description: 'Bidang yang bertanggung jawab menggerakkan kepedulian sosial dan kemanusiaan melalui program-program bakti sosial. Menumbuhkan empati dan kepedulian mahasiswa terhadap lingkungan sekitar, membangun karakter yang peduli sosial, serta berkontribusi nyata kepada masyarakat melalui kegiatan berbagi dan pengabdian.',
    image: 'https://lh3.googleusercontent.com/d/1rNhnzhvjajheAmJImoex6KCGOoOo7FoY',
    structure: [{
      level: 'Kepala Bidang BKS',
      members: [{
        name: 'Arifin Noor Sya\'ban Iqbal',
        nim: '1.3.23.04.11'
      }],
      hasDirectStaff: true,
      directStaff: [{
          name: 'Firyal Salsabilla A',
          nim: '1.3.23.04.20'
        },
        {
          name: 'Mochamad Athian Fadly',
          nim: '1.3.24.05.23'
        },
        {
          name: 'Gidion Ladimo',
          nim: '1.3.24.05.17'
        },
        {
          name: 'Rifan Muhamad Supriatna',
          nim: '1.3.23.04.24'
        },
        {
          name: 'Dimas Nugraha',
          nim: '1.3.24.05.22'
        },
        {
          name: 'Marshal Rifaldhi Matin',
          nim: '1.3.23.04.17'
        }
      ]
    }]
  },
  medinkom: {
    title: 'MEDINKOM - Media Informasi & Komunikasi',
    description: 'Bidang yang mengelola seluruh platform media informasi dan komunikasi HMSI. Bertanggung jawab atas publikasi konten edukatif, dokumentasi kegiatan, pengelolaan media sosial, serta membangun citra positif HMSI melalui strategi komunikasi yang kreatif dan informatif untuk meningkatkan engagement dengan mahasiswa dan publik.',
    image: 'https://lh3.googleusercontent.com/d/1OysCFpKXQiYdG8xPytIOKim2U0bZ8IZQ',
    structure: [{
      level: 'Kepala Bidang MEDINKOM',
      members: [{
        name: 'Muhammad Gilar Reza P',
        nim: '1.3.24.05.10'
      }],
      hasDirectStaff: true,
      directStaff: [{
          name: 'Syachrani H.C',
          nim: '1.3.23.04.08'
        },
        {
          name: 'Utari Dewi Apriliani',
          nim: '1.3.23.04.13'
        },
        {
          name: 'Azhar Didan',
          nim: '1.3.23.04.14'
        },
        {
          name: 'Kesha Ralfa S',
          nim: '1.3.24.05.09'
        },
        {
          name: 'Irwan Yunas',
          nim: '1.3.24.05.08'
        }
      ]
    }]
  }
};

// Fungsi membuka modal (Dideklarasikan di scope global agar bisa dipanggil via onclick di HTML)
function openBidangModal(bidang) {
  const modal = document.getElementById('bidangModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');

  const data = bidangData[bidang];

  modalTitle.textContent = data.title;

  let contentHTML = `
      <div class="mb-8 flex justify-center">
        <div class="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
          <img src="${data.image}" alt="${data.title}" class="w-full h-auto object-contain" loading="lazy" onerror="console.error('Image failed to load:', this.src); this.style.display='none'; this.parentElement.innerHTML='<div class=\\'w-full aspect-video flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-pink-500/10\\'><svg class=\\'w-32 h-32 text-purple-400\\' fill=\\'none\\' stroke=\\'currentColor\\' viewBox=\\'0 0 24 24\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'2\\' d=\\'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z\\'/></svg></div>';">
        </div>
      </div>
      
      <div class="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8">
        <p class="text-white text-lg leading-relaxed" style="text-align: justify;">${data.description}</p>
      </div>
    `;

  // Tampilkan sub-bidang jika ada
  if (data.subBidangInfo && data.subBidangInfo.length > 0) {
    contentHTML += `
      <div class="mb-8">
        <div class="flex items-center gap-2 justify-center mb-6">
          <div class="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
          <h4 class="text-xl font-bold text-white">Sub-Bidang</h4>
          <div class="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
        </div>
        <div class="flex justify-center">
          <div class="grid md:grid-cols-2 gap-6 max-w-3xl">
      `;

    data.subBidangInfo.forEach((subBidang) => {
      contentHTML += `
          <div class="bg-white/5 p-4 rounded-xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 bg-indigo-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${subBidang.icon}"/>
                </svg>
              </div>
              <h5 class="text-white font-bold text-sm">${subBidang.name}</h5>
            </div>
            <p class="text-white text-sm leading-relaxed" style="text-align: justify;">
              ${subBidang.description}
            </p>
          </div>
        `;
    });

    contentHTML += `
          </div>
        </div>
      </div>
      `;
  }

  contentHTML += `
      
      <div class="mb-6">
        <h4 class="text-2xl font-bold text-white mb-8 flex items-center gap-3 justify-center">
          <div class="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          Struktur Organisasi Bidang
        </h4>
    `;

  data.structure.forEach((kabiSection) => {
    // Struktur Tree/Pohon dengan arrow yang estetik
    contentHTML += `
        <div class="tree-structure relative">
          <div class="flex justify-center mb-6">
            <div class="tree-node org-card bg-gradient-to-br from-indigo-500/25 via-purple-500/25 to-fuchsia-500/25 backdrop-blur-xl p-6 rounded-3xl border-2 border-indigo-400/50 shadow-2xl max-w-sm" style="box-shadow: 0 20px 60px rgba(139, 92, 246, 0.5), 0 0 80px rgba(168, 85, 247, 0.3), inset 0 4px 20px rgba(255, 255, 255, 0.1);">
              <div class="flex flex-col items-center gap-3">
                <span class="rank-badge text-indigo-200">${kabiSection.level}</span>
                <div class="w-full bg-white/15 backdrop-blur-md p-4 rounded-2xl border-2 border-white/30 shadow-xl">
                  <p class="text-white font-black text-base mb-1 text-center drop-shadow-lg">${kabiSection.members[0].name}</p>
                  <div class="flex items-center justify-center gap-2">
                    <svg class="w-3 h-3 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
                    </svg>
                    <p class="text-indigo-200 text-xs font-mono font-semibold tracking-wide">${kabiSection.members[0].nim}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex justify-center mb-6">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-b from-purple-500 to-pink-500 blur-xl opacity-60 animate-pulse"></div>
              <svg class="w-16 h-16 text-gradient relative" fill="currentColor" viewBox="0 0 24 24" style="filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.8)); animation: bounce 2s ease-in-out infinite;">
                <defs>
                  <linearGradient id="arrow-gradient-main" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#a855f7;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
                  </linearGradient>
                </defs>
                <path fill="url(#arrow-gradient-main)" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" transform="rotate(90 12 12)"/>
              </svg>
            </div>
          </div>
      `;

    // Sub Bidang atau Staff Langsung dengan Arrow
    if (kabiSection.subBidang && kabiSection.subBidang.length > 0) {
      const subBidangCount = kabiSection.subBidang.length;

      contentHTML += `
          <div class="grid grid-cols-${subBidangCount} gap-8 mb-8">
        `;

      kabiSection.subBidang.forEach((subSection, index) => {
        contentHTML += `
            <div class="flex flex-col items-center">
              <div class="tree-node org-card bg-gradient-to-br from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 backdrop-blur-xl p-5 rounded-2xl border-2 border-purple-400/40 shadow-2xl w-full" style="box-shadow: 0 15px 50px rgba(168, 85, 247, 0.4), 0 0 60px rgba(192, 132, 252, 0.3), inset 0 3px 15px rgba(255, 255, 255, 0.1);">
                <div class="flex flex-col items-center gap-2">
                  <span class="rank-badge text-purple-200 text-xs">${subSection.level}</span>
                  <div class="w-full bg-white/15 backdrop-blur-md p-3 rounded-xl border border-white/30 shadow-lg">
                    <p class="text-white font-bold text-sm mb-1 text-center drop-shadow-md">${subSection.members[0].name}</p>
                    <div class="flex items-center justify-center gap-1">
                      <svg class="w-3 h-3 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
                      </svg>
                      <p class="text-purple-200 text-xs font-mono font-semibold">${subSection.members[0].nim}</p>
                    </div>
                  </div>
                </div>
              </div>
          `;

        // Staff di bawah Sub Bidang dengan Arrow
        if (subSection.staff && subSection.staff.length > 0) {
          contentHTML += `
              <div class="flex justify-center my-5">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-b from-fuchsia-500 to-pink-500 blur-lg opacity-50 animate-pulse" style="animation-delay: 0.5s;"></div>
                  <svg class="w-12 h-12 relative" fill="currentColor" viewBox="0 0 24 24" style="filter: drop-shadow(0 0 12px rgba(236, 72, 153, 0.7)); animation: bounce 2s ease-in-out infinite; animation-delay: 0.3s;">
                    <defs>
                      <linearGradient id="arrow-gradient-${index}" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#c084fc;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#e879f9;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#arrow-gradient-${index})" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" transform="rotate(90 12 12)"/>
                  </svg>
                </div>
              </div>
              
              <div class="w-full bg-gradient-to-br from-pink-500/15 via-fuchsia-500/15 to-purple-500/15 backdrop-blur-xl p-4 rounded-2xl border-2 border-pink-400/30 shadow-xl">
                <div class="flex items-center justify-center gap-1 mb-3">
                  <svg class="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  <h6 class="text-pink-300 font-bold text-xs text-center uppercase">Staff</h6>
                </div>
                <div class="space-y-2">
            `;

          subSection.staff.forEach((staffMember) => {
            contentHTML += `
                <div class="org-card bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/30 shadow-lg hover:bg-white/15">
                  <p class="text-white font-semibold text-xs mb-1 text-center drop-shadow-md">${staffMember.name}</p>
                  <div class="flex items-center justify-center gap-1">
                    <svg class="w-2 h-2 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
                    </svg>
                    <p class="text-gray-300 text-xs font-mono font-medium">${staffMember.nim}</p>
                  </div>
                </div>
              `;
          });

          contentHTML += `
                </div>
              </div>
            `;
        }

        contentHTML += `
            </div>
          `;
      });

      contentHTML += `
          </div>
        `;
    }

    // Staff Langsung untuk BKS dan MEDINKOM dengan Arrow
    if (kabiSection.hasDirectStaff && kabiSection.directStaff && kabiSection.directStaff.length > 0) {
      contentHTML += `
          <div class="max-w-5xl mx-auto">
            <div class="flex items-center justify-center gap-2 mb-6">
              <div class="h-px flex-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
              <div class="bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-indigo-500/30 backdrop-blur-xl px-6 py-2 rounded-full border-2 border-pink-400/40 shadow-xl">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  <span class="text-white font-bold text-sm uppercase tracking-wider">Staff Bidang</span>
                </div>
              </div>
              <div class="h-px flex-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4">
        `;

      kabiSection.directStaff.forEach((staffMember, index) => {
        contentHTML += `
              <div class="org-card bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 backdrop-blur-xl p-5 rounded-2xl border-2 border-pink-400/40 shadow-2xl hover:shadow-pink-500/50 transition-all" style="box-shadow: 0 10px 40px rgba(236, 72, 153, 0.3), 0 0 60px rgba(168, 85, 247, 0.2), inset 0 2px 15px rgba(255, 255, 255, 0.1);">
                <div class="flex items-center gap-4">
                  <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-white font-bold text-sm mb-1 drop-shadow-md">${staffMember.name}</p>
                    <div class="flex items-center gap-1">
                      <svg class="w-3 h-3 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
                      </svg>
                      <p class="text-pink-200 text-xs font-mono font-semibold tracking-wide">${staffMember.nim}</p>
                    </div>
                  </div>
                </div>
              </div>
          `;
      });

      contentHTML += `
            </div>
          </div>
        `;
    }

    contentHTML += `
        </div>
      `;
  });

  contentHTML += `
      </div>
    `;

  modalContent.innerHTML = contentHTML;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

// Fungsi menutup modal (Global)
function closeBidangModal(event) {
  if (event && event.target.id !== 'bidangModal') return;

  const modal = document.getElementById('bidangModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}
