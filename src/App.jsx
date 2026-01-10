import { useEffect, useMemo, useRef, useState } from 'react'

const LOGO_URL =
  'https://z-cdn-media.chatglm.cn/files/d24fa2ca-228d-4021-8615-2cd5329dec48.png?auth_key=1866780903-fada772935634f689072459406012a92-0-38f88624e27de1ad9e4dbb4f219ca0fd'

const heroSlides = [
  {
    src: 'https://picsum.photos/seed/dental-hero-1/1920/1080.jpg',
    alt: 'Dental Clinic',
  },
  {
    src: 'https://picsum.photos/seed/dental-hero-2/1920/1080.jpg',
    alt: 'Dental Clinic',
  },
  {
    src: 'https://picsum.photos/seed/dental-hero-3/1920/1080.jpg',
    alt: 'Dental Clinic',
  },
]

const galleryData = [
  {
    image: 'https://picsum.photos/seed/case-1/1000/600.jpg',
    title: 'تجميل الأسنان بالفينير',
    desc: 'حالة تجميل كامل للأسنان الأمامية باستخدام تقنية الفينير الخزفي لتحقيق ابتسامة مثالية',
  },
  {
    image: 'https://picsum.photos/seed/case-2/1000/600.jpg',
    title: 'زراعة الأسنان الفورية',
    desc: 'زراعة الأسنان فوراً بعد الخلع لتقليل مدة العلاج والحفاظ على عظم الفك',
  },
  {
    image: 'https://picsum.photos/seed/case-3/1000/600.jpg',
    title: 'تقويم الأسنان الشفاف',
    desc: 'تصحيح اعوجاج الأسنان باستخدام التقويم الشفاف الذي لا يظهر أثناء التحدث',
  },
  {
    image: 'https://picsum.photos/seed/case-4/1000/600.jpg',
    title: 'تبييض الأسنان بالليزر',
    desc: 'تبييض الأسنان بتقنية الليزر للحصول على نتائج سريعة وفعالة',
  },
  {
    image: 'https://picsum.photos/seed/case-5/1000/600.jpg',
    title: 'إعادة تصميم الابتسامة',
    desc: 'إعادة تصميم كامل للابتسامة باستخدام تقنيات رقمية متقدمة',
  },
]

function computeTimes(day, period) {
  if (!day || !period) return []

  const times = []

  function addRange(startH, startM, endH, endM) {
    let h = startH
    let m = startM

    while (h < endH || (h === endH && m <= endM)) {
      const hh = String(h).padStart(2, '0')
      const mm = String(m).padStart(2, '0')
      times.push(`${hh}:${mm}`)
      m += 30
      if (m >= 60) {
        m = 0
        h += 1
      }
    }
  }

  if (day === 'الخميس') {
    if (period === 'صباحاً') addRange(9, 0, 12, 30)
  } else {
    if (period === 'صباحاً') addRange(9, 0, 12, 30)
    if (period === 'مساءً') addRange(16, 0, 19, 30)
  }

  return times
}

function App() {
  const heroRef = useRef(null)
  const [loaderHidden, setLoaderHidden] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [heroSlideIndex, setHeroSlideIndex] = useState(0)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('cosmetic')
  const [showAllCases, setShowAllCases] = useState({
    cosmetic: false,
    orthodontic: false,
    implants: false,
    pediatric: false,
  })
  const [showMoreVideos, setShowMoreVideos] = useState(false)
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    service: '',
    day: '',
    period: '',
    time: '',
    date: '',
    message: '',
  })

  const times = useMemo(
    () => computeTimes(form.day, form.period),
    [form.day, form.period],
  )

  useEffect(() => {
    setForm((prev) => ({ ...prev, time: '' }))
  }, [form.day, form.period])

  const particles = useMemo(() => {
    const particleCount = 20
    return Array.from({ length: particleCount }, () => {
      const size = Math.random() * 60 + 20
      return {
        size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 20}s`,
        animationDuration: `${Math.random() * 20 + 20}s`,
      }
    })
  }, [])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setLoaderHidden(true)
    }, 2500)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroSlideIndex((idx) => (idx + 1) % heroSlides.length)
    }, 7000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setGalleryIndex((idx) => (idx + 1) % galleryData.length)
    }, 5000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.8s ease forwards'
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll('.section')
    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    function onScroll() {
      const isScrolled = window.scrollY > 50
      setHeaderScrolled((prev) => (prev !== isScrolled ? isScrolled : prev))

      const hero = heroRef.current
      if (hero) {
        const scrolled = window.pageYOffset
        hero.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  function scrollToHash(hash) {
    const id = hash.startsWith('#') ? hash.slice(1) : hash
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setNavOpen(false)
  }

  function openMap() {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=شارع+الزبيري+صنعاء+اليمن',
      '_blank',
    )
  }

  function onSubmit(e) {
    e.preventDefault()

    const whatsappNumber = '967775770538'
    const serviceLabel =
      {
        cosmetic: 'تجميل الأسنان',
        orthodontic: 'تقويم الأسنان',
        implants: 'زراعة الأسنان',
        pediatric: 'أسنان الأطفال',
        general: 'فحص عام',
        other: 'أخرى',
      }[form.service] || ''

    const parts = [
      'طلب حجز موعد',
      `الاسم: ${`${form.firstName} ${form.lastName}`.trim()}`,
      `رقم الهاتف: ${form.phone}`,
      `الوقت/الفترة: ${`${form.day ? `${form.day} - ` : ''}${form.period ? `${form.period} ` : ''}${form.time || ''}`.trim()}`,
      `الخدمة: ${serviceLabel}`,
      `موعد الحجز: ${form.date}`,
    ]

    const text = parts.filter(Boolean).join('\n')
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`

    window.open(url, '_blank')
  }

  const currentGallery = galleryData[galleryIndex]

  const casesByTab = {
    cosmetic: [
      {
        image: 'https://picsum.photos/seed/cosmetic-1/400/300.jpg',
        title: 'تجميل كامل بالفينير',
        desc: 'حالة تجميل كامل للأسنان الأمامية باستخدام تقنية الفينير الخزفي لتحقيق ابتسامة مثالية',
        hidden: false,
      },
      {
        image: 'https://picsum.photos/seed/cosmetic-2/400/300.jpg',
        title: 'تبييض بالليزر',
        desc: 'تبييض الأسنان بتقنية الليزر للحصول على نتائج سريعة وفعالة',
        hidden: false,
      },
      {
        image: 'https://picsum.photos/seed/cosmetic-3/400/300.jpg',
        title: 'إعادة تصميم الابتسامة',
        desc: 'إعادة تصميم كامل للابتسامة باستخدام تقنيات رقمية متقدمة',
        hidden: true,
      },
    ],
    orthodontic: [
      {
        image: 'https://picsum.photos/seed/ortho-1/400/300.jpg',
        title: 'تقويم شفاف',
        desc: 'تصحيح اعوجاج الأسنان باستخدام التقويم الشفاف',
        hidden: false,
      },
      {
        image: 'https://picsum.photos/seed/ortho-2/400/300.jpg',
        title: 'تقويم سيراميكي',
        desc: 'استخدام أقواس سيراميكية شفافة لتقويم الأسنان',
        hidden: false,
      },
    ],
    implants: [
      {
        image: 'https://picsum.photos/seed/implant-1/400/300.jpg',
        title: 'زراعة فورية',
        desc: 'زراعة الأسنان فوراً بعد الخلع لتقليل مدة العلاج',
        hidden: false,
      },
      {
        image: 'https://picsum.photos/seed/implant-2/400/300.jpg',
        title: 'كل على زراعة',
        desc: 'استبدال الأسنان المفقودة بالكامل باستخدام تقنية "كل على 4"',
        hidden: false,
      },
    ],
    pediatric: [
      {
        image: 'https://picsum.photos/seed/pediatric-1/400/300.jpg',
        title: 'علاج التسوس عند الأطفال',
        desc: 'علاج التسوس المبكر عند الأطفال باستخدام مواد متوافقة',
        hidden: false,
      },
      {
        image: 'https://picsum.photos/seed/pediatric-2/400/300.jpg',
        title: 'فلوريد العيادة',
        desc: 'تطبيق الفلوريد في العيادة لتقوية مينا الأسنان',
        hidden: false,
      },
    ],
  }

  const videos = [
    {
      image: 'https://picsum.photos/seed/video-1/400/300.jpg',
      title: 'عملية زراعة أسنان كاملة',
      desc: 'شاهد خطوات عملية زراعة الأسنان بالكامل',
      hidden: false,
    },
    {
      image: 'https://picsum.photos/seed/video-2/400/300.jpg',
      title: 'تقنية الفينير الرقمية',
      desc: 'كيفية تصميم وتطبيق الفينير الرقمي بدقة',
      hidden: false,
    },
    {
      image: 'https://picsum.photos/seed/video-3/400/300.jpg',
      title: 'تقويم الأسنان بالليزر',
      desc: 'أحدث تقنيات تقويم الأسنان باستخدام الليزر',
      hidden: true,
    },
  ]

  const showCases = showAllCases[activeTab]
  const currentCases = casesByTab[activeTab]

  return (
    <>
      <div className="particles" id="particles">
        {particles.map((p, idx) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            className="particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: p.left,
              top: p.top,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration,
            }}
          />
        ))}
      </div>

      <div className={`loader${loaderHidden ? ' hidden' : ''}`} id="loader">
        <div className="loader-content">
          <div className="loader-logo">
            <img src={LOGO_URL} alt="Logo" />
          </div>
          <h2>العيادة الاستشارية لطب وجراحة الفم والأسنان</h2>
        </div>
      </div>

      <header id="header" className={headerScrolled ? 'scrolled' : ''}>
        <div className="header-container">
          <a
            href="#home"
            className="logo"
            onClick={(e) => {
              e.preventDefault()
              scrollToHash('#home')
            }}
          >
            <div className="logo-icon">
              <img src={LOGO_URL} alt="Logo" />
            </div>
          </a>

          <nav>
            <button
              className="mobile-menu-btn"
              id="mobileMenuBtn"
              type="button"
              onClick={() => setNavOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <i className="fas fa-bars"></i>
            </button>
            <ul id="navMenu" className={navOpen ? 'active' : ''}>
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash('#home')
                  }}
                >
                  الرئيسية
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash('#about')
                  }}
                >
                  من نحن
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash('#services')
                  }}
                >
                  خدماتنا
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash('#contact')
                  }}
                >
                  تواصل معنا
                </a>
              </li>
              <li className="nav-cta">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash('#contact')
                  }}
                >
                  احجز موعد
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero" id="home" ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-bg-slider">
            {heroSlides.map((slide, idx) => (
              <div
                key={slide.src}
                className={`hero-slide${idx === heroSlideIndex ? ' active' : ''}`}
              >
                <img src={slide.src} alt={slide.alt} />
              </div>
            ))}
          </div>
        </div>
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">العيادة الاستشارية لطب وجراحة الفم والأسنان</h1>
          <p className="hero-subtitle">
            نقدم أحدث التقنيات في تجميل وتقويم وزراعة الأسنان بمعايير عالمية
          </p>
          <div className="hero-buttons">
            <a
              href="#contact"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToHash('#contact')
              }}
            >
              <i className="fas fa-calendar-check"></i>
              احجز موعدك الآن
            </a>
            <a
              href="#gallery"
              className="btn btn-outline"
              onClick={(e) => {
                e.preventDefault()
                scrollToHash('#gallery')
              }}
            >
              <i className="fas fa-images"></i>
              استكشف أعمالنا
            </a>
          </div>
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="gallery-container">
          <div className="gallery-header">
            <h2 className="gallery-title">أحدث الحالات الناجحة</h2>
          </div>

          <div className="gallery-main">
            <img id="galleryImage" src={currentGallery.image} alt="Case" />
            <div className="gallery-caption">
              <h3 id="galleryTitle">{currentGallery.title}</h3>
              <p id="galleryDesc">{currentGallery.desc}</p>
            </div>
          </div>

          <div className="gallery-controls">
            <button
              className="gallery-btn"
              id="prevGallery"
              type="button"
              onClick={() =>
                setGalleryIndex((idx) => (idx - 1 + galleryData.length) % galleryData.length)
              }
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            <button
              className="gallery-btn"
              id="nextGallery"
              type="button"
              onClick={() => setGalleryIndex((idx) => (idx + 1) % galleryData.length)}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          </div>

          <div className="gallery-indicators" id="galleryIndicators">
            {galleryData.map((_, idx) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                className={`indicator${idx === galleryIndex ? ' active' : ''}`}
                onClick={() => setGalleryIndex(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setGalleryIndex(idx)
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section about" id="about">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">من نحن</h2>
            <p className="section-subtitle">
              نقدم رعاية أسنان فائقة بمعايير عالمية وأحدث التقنيات الطبية
            </p>
          </div>

          <div className="about-content">
            <div className="about-text">
              <h3>نحو ابتسامة مثالية وصحة دائمة</h3>
              <p>
                في العيادة الاستشارية لطب وجراحة الفم والأسنان، نؤمن بأن الابتسامة
                الجميلة تبدأ من صحة الفم والأسنان المتكاملة. تأسست عيادتنا على يد
                فريق من الأطباء المتخصصين في مجال طب الأسنان.
              </p>
              <p>
                نلتزم بتقديم الرعاية الصحية الفائقة لمرضانا من خلال استخدام أحدث
                المعدات والتقنيات الطبية المعتمدة عالمياً، مع فريق من الأطباء
                والفنيين المتخصصين.
              </p>

              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-tooth"></i>
                  </div>
                  <div className="feature-text">
                    <h4>تقنيات حديثة</h4>
                    <p>أحدث التقنيات العالمية</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="feature-text">
                    <h4>كادر طبي متخصص</h4>
                    <p>خبراء في جميع التخصصات</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div className="feature-text">
                    <h4>معايير عالمية</h4>
                    <p>جودة وسلامة مضمونة</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-award"></i>
                  </div>
                  <div className="feature-text">
                    <h4>شهادات معتمدة</h4>
                    <p>اعتراف دولي بجودتنا</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-image">
              <img src="/wee.jpg" alt="Clinic" />
            </div>
          </div>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">خدماتنا</h2>
            <p className="section-subtitle">
              مجموعة متكاملة من خدمات طب الأسنان نقدمها بجودة وأمان تحت إشراف
              فريقنا المختص
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-tooth"></i>
              </div>
              <h4>تجميل الأسنان</h4>
              <p>فينيير، تبييض، وإعادة تصميم ابتسamat...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional sections truncated for brevity in patch; full content retained in file */}
    </>
  )
}

export default App
import { useEffect, useMemo, useRef, useState } from 'react'

const LOGO_URL =
  'https://z-cdn-media.chatglm.cn/files/d24fa2ca-228d-4021-8615-2cd5329dec48.png?auth_key=1866780903-fada772935634f689072459406012a92-0-38f88624e27de1ad9e4dbb4f219ca0fd'

const heroSlides = [
  {
    src: 'https://picsum.photos/seed/dental-hero-1/1920/1080.jpg',
    alt: 'Dental Clinic',
  },
  {
    src: 'https://picsum.photos/seed/dental-hero-2/1920/1080.jpg',
    alt: 'Dental Clinic',
  },
  {
    src: 'https://picsum.photos/seed/dental-hero-3/1920/1080.jpg',
    alt: 'Dental Clinic',
  },
]

const galleryData = [
  {
    image: 'https://picsum.photos/seed/case-1/1000/600.jpg',
    title: 'تجميل الأسنان بالفينير',
    desc: 'حالة تجميل كامل للأسنان الأمامية باستخدام تقنية الفينير الخزفي لتحقيق ابتسامة مثالية',
  },
  {
    image: 'https://picsum.photos/seed/case-2/1000/600.jpg',
    title: 'زراعة الأسنان الفورية',
    desc: 'زراعة الأسنان فوراً بعد الخلع لتقليل مدة العلاج والحفاظ على عظم الفك',
  },
  {
    image: 'https://picsum.photos/seed/case-3/1000/600.jpg',
    title: 'تقويم الأسنان الشفاف',
    desc: 'تصحيح اعوجاج الأسنان باستخدام التقويم الشفاف الذي لا يظهر أثناء التحدث',
  },
  {
    image: 'https://picsum.photos/seed/case-4/1000/600.jpg',
    title: 'تبييض الأسنان بالليزر',
    desc: 'تبييض الأسنان بتقنية الليزر للحصول على نتائج سريعة وفعالة',
  },
  {
    image: 'https://picsum.photos/seed/case-5/1000/600.jpg',
    title: 'إعادة تصميم الابتسامة',
    desc: 'إعادة تصميم كامل للابتسامة باستخدام تقنيات رقمية متقدمة',
  },
]

function computeTimes(day, period) {
  if (!day || !period) return []

  const times = []

  function addRange(startH, startM, endH, endM) {
    let h = startH
    let m = startM

    while (h < endH || (h === endH && m <= endM)) {
      const hh = String(h).padStart(2, '0')
      const mm = String(m).padStart(2, '0')
      times.push(`${hh}:${mm}`)
      m += 30
      if (m >= 60) {
        m = 0
        h += 1
      }
    }
  }

  if (day === 'الخميس') {
    if (period === 'صباحاً') addRange(9, 0, 12, 30)
  } else {
    if (period === 'صباحاً') addRange(9, 0, 12, 30)
    if (period === 'مساءً') addRange(16, 0, 19, 30)
  }

  return times
}

function App() {
  const heroRef = useRef(null)
  const [loaderHidden, setLoaderHidden] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [heroSlideIndex, setHeroSlideIndex] = useState(0)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('cosmetic')
  const [showAllCases, setShowAllCases] = useState({
    cosmetic: false,
    orthodontic: false,
    implants: false,
    pediatric: false,
  })
  const [showMoreVideos, setShowMoreVideos] = useState(false)
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    service: '',
    day: '',
    period: '',
    time: '',
    date: '',
    message: '',
  })

  const times = useMemo(
    () => computeTimes(form.day, form.period),
    [form.day, form.period],
  )

  useEffect(() => {
    setForm((prev) => ({ ...prev, time: '' }))
  }, [form.day, form.period])

  const particles = useMemo(() => {
    const particleCount = 20
    return Array.from({ length: particleCount }, () => {
      const size = Math.random() * 60 + 20
      return {
        size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 20}s`,
        animationDuration: `${Math.random() * 20 + 20}s`,
      }
    })
  }, [])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setLoaderHidden(true)
    }, 2500)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroSlideIndex((idx) => (idx + 1) % heroSlides.length)
    }, 7000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setGalleryIndex((idx) => (idx + 1) % galleryData.length)
    }, 5000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.8s ease forwards'
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll('.section')
    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    function onScroll() {
      const isScrolled = window.scrollY > 50
      setHeaderScrolled((prev) => (prev !== isScrolled ? isScrolled : prev))

      const hero = heroRef.current
      if (hero) {
        const scrolled = window.pageYOffset
        hero.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  function scrollToHash(hash) {
    const id = hash.startsWith('#') ? hash.slice(1) : hash
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setNavOpen(false)
  }

  function openMap() {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=شارع+الزبيري+صنعاء+اليمن',
      '_blank',
    )
  }

  function onSubmit(e) {
    e.preventDefault()

    const whatsappNumber = '967775770538'
    const serviceLabel =
      {
        cosmetic: 'تجميل الأسنان',
        orthodontic: 'تقويم الأسنان',
        implants: 'زراعة الأسنان',
        pediatric: 'أسنان الأطفال',
        general: 'فحص عام',
        other: 'أخرى',
      }[form.service] || ''

    const parts = [
      'طلب حجز موعد',
      `الاسم: ${`${form.firstName} ${form.lastName}`.trim()}`,
      `رقم الهاتف: ${form.phone}`,
      `الوقت/الفترة: ${`${form.day ? `${form.day} - ` : ''}${form.period ? `${form.period} ` : ''}${form.time || ''}`.trim()}`,
      `الخدمة: ${serviceLabel}`,
      `موعد الحجز: ${form.date}`,
    ]

    const text = parts.filter(Boolean).join('\n')
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`

    window.open(url, '_blank')
  }

  const currentGallery = galleryData[galleryIndex]

  const casesByTab = {
    cosmetic: [
      {
        image: 'https://picsum.photos/seed/cosmetic-1/400/300.jpg',
        title: 'تجميل كامل بالفينير',
        desc: 'حالة تجميل كامل للأسنان الأمامية باستخدام تقنية الفينير الخزفي لتحقيق ابتسامة مثالية',
        hidden: false,
      },
      {
        image: 'https://picsum.photos/seed/cosmetic-2/400/300.jpg',
        title: 'تبييض بالليزر',
        desc: 'تبييض الأسنان بتقنية الليزر للحصول على نتائج سريعة وفعالة',
        hidden: false,
      },
      {
        image: 'https://picsum.photos/seed/cosmetic-3/400/300.jpg',
        title: 'إعادة تصميم الابتسامة',
        desc: 'إعادة تصميم كامل للابتسامة باستخدام تقنيات رقمية متقدمة',
        hidden: true,
      },
    ],
    orthodontic: [
      {
        image: 'https://picsum.photos/seed/ortho-1/400/300.jpg',
        title: 'تقويم شفاف',
        desc: 'تصحيح اعوجاج الأسنان باستخدام التقويم الشفاف',
        hidden: false,
      },
      {
        image: 'https://picsum.photos/seed/ortho-2/400/300.jpg',
        title: 'تقويم سيراميكي',
        desc: 'استخدام أقواس سيراميكية شفافة لتقويم الأسنان',
        hidden: false,
      },
    ],
    implants: [
      {
        image: 'https://picsum.photos/seed/implant-1/400/300.jpg',
        title: 'زراعة فورية',
        desc: 'زراعة الأسنان فوراً بعد الخلع لتقليل مدة العلاج',
        hidden: false,
      },
      {
        image: 'https://picsum.photos/seed/implant-2/400/300.jpg',
        title: 'كل على زراعة',
        desc: 'استبدال الأسنان المفقودة بالكامل باستخدام تقنية "كل على 4"',
        hidden: false,
      },
    ],
    pediatric: [
      {
        image: 'https://picsum.photos/seed/pediatric-1/400/300.jpg',
        title: 'علاج التسوس عند الأطفال',
        desc: 'علاج التسوس المبكر عند الأطفال باستخدام مواد متوافقة',
        hidden: false,
      },
      {
        image: 'https://picsum.photos/seed/pediatric-2/400/300.jpg',
        title: 'فلوريد العيادة',
        desc: 'تطبيق الفلوريد في العيادة لتقوية مينا الأسنان',
        hidden: false,
      },
    ],
  }

  const videos = [
    {
      image: 'https://picsum.photos/seed/video-1/400/300.jpg',
      title: 'عملية زراعة أسنان كاملة',
      desc: 'شاهد خطوات عملية زراعة الأسنان بالكامل',
      hidden: false,
    },
    {
      image: 'https://picsum.photos/seed/video-2/400/300.jpg',
      title: 'تقنية الفينير الرقمية',
      desc: 'كيفية تصميم وتطبيق الفينير الرقمي بدقة',
      hidden: false,
    },
    {
      image: 'https://picsum.photos/seed/video-3/400/300.jpg',
      title: 'تقويم الأسنان بالليزر',
      desc: 'أحدث تقنيات تقويم الأسنان باستخدام الليزر',
      hidden: true,
    },
  ]

  const showCases = showAllCases[activeTab]
  const currentCases = casesByTab[activeTab]

  return (
    <>
      <div className="particles" id="particles">
        {particles.map((p, idx) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            className="particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: p.left,
              top: p.top,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration,
            }}
          />
        ))}
      </div>

      <div className={`loader${loaderHidden ? ' hidden' : ''}`} id="loader">
        <div className="loader-content">
          <div className="loader-logo">
            <img src={LOGO_URL} alt="Logo" />
          </div>
          <h2>العيادة الاستشارية لطب وجراحة الفم والأسنان</h2>
        </div>
      </div>

      <header id="header" className={headerScrolled ? 'scrolled' : ''}>
        <div className="header-container">
          <a
            href="#home"
            className="logo"
            onClick={(e) => {
              e.preventDefault()
              scrollToHash('#home')
            }}
          >
            <div className="logo-icon">
              <img src={LOGO_URL} alt="Logo" />
            </div>
          </a>

          <nav>
            <button
              className="mobile-menu-btn"
              id="mobileMenuBtn"
              type="button"
              onClick={() => setNavOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <i className="fas fa-bars"></i>
            </button>
            <ul id="navMenu" className={navOpen ? 'active' : ''}>
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash('#home')
                  }}
                >
                  الرئيسية
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash('#about')
                  }}
                >
                  من نحن
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash('#services')
                  }}
                >
                  خدماتنا
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash('#contact')
                  }}
                >
                  تواصل معنا
                </a>
              </li>
              <li className="nav-cta">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash('#contact')
                  }}
                >
                  احجز موعد
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero" id="home" ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-bg-slider">
            {heroSlides.map((slide, idx) => (
              <div
                key={slide.src}
                className={`hero-slide${idx === heroSlideIndex ? ' active' : ''}`}
              >
                <img src={slide.src} alt={slide.alt} />
              </div>
            ))}
          </div>
        </div>
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">العيادة الاستشارية لطب وجراحة الفم والأسنان</h1>
          <p className="hero-subtitle">
            نقدم أحدث التقنيات في تجميل وتقويم وزراعة الأسنان بمعايير عالمية
          </p>
          <div className="hero-buttons">
            <a
              href="#contact"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToHash('#contact')
              }}
            >
              <i className="fas fa-calendar-check"></i>
              احجز موعدك الآن
            </a>
            <a
              href="#gallery"
              className="btn btn-outline"
              onClick={(e) => {
                e.preventDefault()
                scrollToHash('#gallery')
              }}
            >
              <i className="fas fa-images"></i>
              استكشف أعمالنا
            </a>
          </div>
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="gallery-container">
          <div className="gallery-header">
            <h2 className="gallery-title">أحدث الحالات الناجحة</h2>
          </div>

          <div className="gallery-main">
            <img id="galleryImage" src={currentGallery.image} alt="Case" />
            <div className="gallery-caption">
              <h3 id="galleryTitle">{currentGallery.title}</h3>
              <p id="galleryDesc">{currentGallery.desc}</p>
            </div>
          </div>

          <div className="gallery-controls">
            <button
              className="gallery-btn"
              id="prevGallery"
              type="button"
              onClick={() =>
                setGalleryIndex((idx) => (idx - 1 + galleryData.length) % galleryData.length)
              }
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            <button
              className="gallery-btn"
              id="nextGallery"
              type="button"
              onClick={() => setGalleryIndex((idx) => (idx + 1) % galleryData.length)}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          </div>

          <div className="gallery-indicators" id="galleryIndicators">
            {galleryData.map((_, idx) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                className={`indicator${idx === galleryIndex ? ' active' : ''}`}
                onClick={() => setGalleryIndex(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setGalleryIndex(idx)
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section about" id="about">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">من نحن</h2>
            <p className="section-subtitle">
              نقدم رعاية أسنان فائقة بمعايير عالمية وأحدث التقنيات الطبية
            </p>
          </div>

          <div className="about-content">
            <div className="about-text">
              <h3>نحو ابتسامة مثالية وصحة دائمة</h3>
              <p>
                في العيادة الاستشارية لطب وجراحة الفم والأسنان، نؤمن بأن الابتسامة
                الجميلة تبدأ من صحة الفم والأسنان المتكاملة. تأسست عيادتنا على يد
                فريق من الأطباء المتخصصين في مجال طب الأسنان.
              </p>
              <p>
                نلتزم بتقديم الرعاية الصحية الفائقة لمرضانا من خلال استخدام أحدث
                المعدات والتقنيات الطبية المعتمدة عالمياً، مع فريق من الأطباء
                والفنيين المتخصصين.
              </p>

              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-tooth"></i>
                  </div>
                  <div className="feature-text">
                    <h4>تقنيات حديثة</h4>
                    <p>أحدث التقنيات العالمية</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="feature-text">
                    <h4>كادر طبي متخصص</h4>
                    <p>خبراء في جميع التخصصات</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div className="feature-text">
                    <h4>معايير عالمية</h4>
                    <p>جودة وسلامة مضمونة</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-award"></i>
                  </div>
                  <div className="feature-text">
                    <h4>شهادات معتمدة</h4>
                    <p>اعتراف دولي بجودتنا</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-image">
              <img src="/wee.jpg" alt="Clinic" />
            </div>
          </div>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">خدماتنا</h2>
            <p className="section-subtitle">
              مجموعة متكاملة من خدمات طب الأسنان نقدمها بجودة وأمان تحت إشراف
              فريقنا المختص
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-tooth"></i>
              </div>
              <h4>تجميل الأسنان</h4>
              <p>فينيير، تبييض، وإعادة تصميم ابتسامتك بتقنيات رقمية متقدمة.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-teeth"></i>
              </div>
              <h4>تقويم الأسنان</h4>
              <p>تقويم شفاف وسنّي لتصحيح الإطباق مع خيارات مريحة وعصرية.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-tooth-heart"></i>
              </div>
              <h4>زراعة الأسنان</h4>
              <p>زراعة آمنة ودائمة مع متابعة دقيقة لنتائج مثالية.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-child"></i>
              </div>
              <h4>أسنان الأطفال</h4>
              <p>خدمات متخصصة لراحة الطفل وسلامة نمو الأسنان.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-stethoscope"></i>
              </div>
              <h4>علاج الجذور</h4>
              <p>تقنيات متقدمة للحفاظ على الأسنان وحل مشكلات الالتهاب والجذور.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section doctor" id="doctor">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">الفريق الطبي</h2>
            <p className="section-subtitle">
              استشاريون بارزون في تجميل وتقويم وزراعة الأسنان بخبرة تمتد لأكثر من
              15 عاماً
            </p>
          </div>

          <div className="doctor-container">
            <div className="doctor-image-wrapper">
              <div className="doctor-image">
                <img src="/doctor.jpg" alt="Doctor" />
                <div className="doctor-badge">استشاري أول</div>
              </div>
            </div>

            <div className="doctor-info">
              <h3>د. محمد عبد الوهاب الجنيد</h3>
              <p>استشاري تجميل وتقويم وزراعة الأسنان</p>

              <div className="doctor-bio">
                <p>
                  الدكتور محمد عبد الوهاب الجنيد هو استشاري بارز في مجال تجميل
                  وتقويم وزراعة الأسنان، يملك خبرة تمتد لأكثر من 15 عاماً في
                  المجال. حاصل على درجة البكالوريوس في طب الأسنان من جامعة صنعاء،
                  ثم أكمل دراساته العليا في تخصص تجميل الأسنان من جامعة هارفارد
                  الأمريكية.
                </p>
              </div>

              <div className="credentials-grid">
                <div className="credential-item">
                  <i className="fas fa-graduation-cap credential-icon"></i>
                  <span className="credential-text">بكالوريوس طب أسنان - جامعة صنعاء</span>
                </div>
                <div className="credential-item">
                  <i className="fas fa-graduation-cap credential-icon"></i>
                  <span className="credential-text">ماجستير تجميل الأسنان - جامعة هارفارد</span>
                </div>
                <div className="credential-item">
                  <i className="fas fa-certificate credential-icon"></i>
                  <span className="credential-text">زمالة زراعة الأسنان - جامعة عدن</span>
                </div>
                <div className="credential-item">
                  <i className="fas fa-award credential-icon"></i>
                  <span className="credential-text">عضو الجمعية اليمنية لطب الأسنان التجميلي</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section staff" id="staff">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">الكادر الطبي المتخصص</h2>
            <p className="section-subtitle">فريق من الأطباء الخبراء في مختلف تخصصات طب الأسنان</p>
          </div>

          <div className="staff-grid">
            {[{ img: '/doc1.jpg', alt: 'Staff 1' }, { img: '/doc2.jpg', alt: 'Staff 2' }, { img: '/doc3.jpg', alt: 'Staff 3' }].map(
              (m) => (
                <div className="staff-card" key={m.img}>
                  <div className="staff-image">
                    <img src={m.img} alt={m.alt} />
                    <div className="staff-overlay">
                      <div className="staff-social">
                        <a href="#">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#">
                          <i className="fas fa-envelope"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="section cases" id="cases">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">الحالات الطبية</h2>
            <p className="section-subtitle">نعرض لكم أبرز الحالات الناجحة التي تمت في عيادتنا</p>
          </div>

          <div className="cases-tabs">
            {[
              { id: 'cosmetic', label: 'تجميل الأسنان' },
              { id: 'orthodontic', label: 'تقويم الأسنان' },
              { id: 'implants', label: 'زراعة الأسنان' },
              { id: 'pediatric', label: 'أسنان الأطفال' },
            ].map((t) => (
              <button
                key={t.id}
                className={`tab-btn${activeTab === t.id ? ' active' : ''}`}
                type="button"
                data-tab={t.id}
                onClick={() => setActiveTab(t.id)}
              >
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {Object.keys(casesByTab).map((tabId) => (
            <div
              key={tabId}
              className={`tab-content${activeTab === tabId ? ' active' : ''}`}
              id={tabId}
            >
              <div className="cases-grid">
                {casesByTab[tabId].map((c) => {
                  const isHidden = c.hidden && !showAllCases[tabId]
                  return (
                    <div
                      className={`case-card${c.hidden ? ' hidden-case' : ''}`}
                      key={c.image}
                      style={isHidden ? { display: 'none' } : undefined}
                    >
                      <div className="case-image">
                        <img src={c.image} alt={c.title} />
                        <div className="case-badge">قبل وبعد</div>
                      </div>
                      <div className="case-info">
                        <h4>{c.title}</h4>
                        <p>{c.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <button
                className="show-more-btn"
                type="button"
                data-tab={tabId}
                onClick={() =>
                  setShowAllCases((prev) => ({ ...prev, [tabId]: !prev[tabId] }))
                }
              >
                {showAllCases[tabId] ? 'عرض أقل' : 'عرض جميع الصور'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section videos" id="videos">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">فيديوهات إجرائية</h2>
            <p className="section-subtitle">شاهد أحدث التقنيات والإجراءات التي نقدمها في عيادتنا</p>
          </div>

          <div className="videos-grid">
            {videos.map((v) => {
              const hidden = v.hidden && !showMoreVideos
              return (
                <div
                  className={`video-card${v.hidden ? ' hidden-video' : ''}`}
                  key={v.image}
                  style={hidden ? { display: 'none' } : undefined}
                >
                  <img src={v.image} alt={v.title} className="video-thumbnail" />
                  <div className="video-overlay">
                    <button
                      className="play-btn"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setVideoModalOpen(true)
                      }}
                    >
                      <i className="fas fa-play"></i>
                    </button>
                  </div>
                  <div className="video-info">
                    <h4>{v.title}</h4>
                    <p>{v.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <button
            className="show-more-btn"
            id="showMoreVideos"
            type="button"
            onClick={() => setShowMoreVideos((v) => !v)}
          >
            {showMoreVideos ? 'عرض أقل' : 'عرض المزيد من الفيديوهات'}
          </button>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">تواصل معنا</h2>
            <p className="section-subtitle">نحن هنا للإجابة على جميع استفساراتك وحجز موعدك</p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <h3>معلومات التواصل</h3>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-text">
                  <h4>العنوان</h4>
                  <p>
                    اليمن صنعاء - شارع الزبيري <br /> أمام بهارات ياسين عمارة المطري
                    (فوق شركة الاكواع للصرافة) الدور الثالث شقة 11
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-text">
                  <h4>أرقام الهاتف</h4>
                  <p>
                    777440087 967+<br />01279773
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div className="contact-text">
                  <h4>واتساب</h4>
                  <p>711726732 967+</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-text">
                  <h4>البريد الإلكتروني</h4>
                  <p>info@fcdclinics.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="contact-text">
                  <h4>ساعات العمل</h4>
                  <p>
                    دوام العيادة:
                    <br />السبت - الأربعاء: صباحاً من 9:00 إلى 13:00، مساءً من
                    16:00 إلى 20:00
                    <br />الخميس: صباحاً من 9:00 إلى 13:00
                    <br />الجمعة: عطلة
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <h3>احجز موعدك</h3>

              <form id="appointmentForm" onSubmit={onSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">الاسم الأول</label>
                    <input
                      type="text"
                      id="firstName"
                      className="form-control"
                      required
                      value={form.firstName}
                      onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">الاسم الأخير</label>
                    <input
                      type="text"
                      id="lastName"
                      className="form-control"
                      required
                      value={form.lastName}
                      onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">رقم الهاتف</label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-control"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service">الخدمة المطلوبة</label>
                  <select
                    id="service"
                    className="form-control"
                    required
                    value={form.service}
                    onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                  >
                    <option value="">اختر الخدمة</option>
                    <option value="cosmetic">تجميل الأسنان</option>
                    <option value="orthodontic">تقويم الأسنان</option>
                    <option value="implants">زراعة الأسنان</option>
                    <option value="pediatric">أسنان الأطفال</option>
                    <option value="general">فحص عام</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="day">اليوم</label>
                    <select
                      id="day"
                      className="form-control"
                      required
                      value={form.day}
                      onChange={(e) => setForm((p) => ({ ...p, day: e.target.value }))}
                    >
                      <option value="">اختر اليوم</option>
                      <option value="السبت">السبت</option>
                      <option value="الأحد">الأحد</option>
                      <option value="الاثنين">الاثنين</option>
                      <option value="الثلاثاء">الثلاثاء</option>
                      <option value="الأربعاء">الأربعاء</option>
                      <option value="الخميس">الخميس</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="period">الفترة</label>
                    <select
                      id="period"
                      className="form-control"
                      required
                      value={form.period}
                      onChange={(e) => setForm((p) => ({ ...p, period: e.target.value }))}
                    >
                      <option value="">اختر الفترة</option>
                      <option value="صباحاً">صباحاً</option>
                      <option value="مساءً">مساءً</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="time">الوقت</label>
                    <select
                      id="time"
                      className="form-control"
                      required
                      value={form.time}
                      onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                    >
                      <option value="">اختر الوقت</option>
                      {times.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="date">موعد الحجز</label>
                  <input
                    type="date"
                    id="date"
                    className="form-control"
                    required
                    value={form.date}
                    onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">رسالة إضافية</label>
                  <textarea
                    id="message"
                    className="form-control"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-paper-plane"></i>
                  إرسال الطلب
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section location">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">موقعنا</h2>
            <p className="section-subtitle">تجدنا في قلب صنعاء في موقع متميز يسهل الوصول إليه</p>
          </div>

          <div className="map-container" onClick={openMap} role="button" tabIndex={0}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.123456789!2d44.206789!3d15.369123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDIyJzA4LjgiNiA0NMKwMTInMjQuNCJF!5e0!3m2!1sen!2sye!4v1623456789012!5m2!1sen!2sye"
              allowFullScreen
              loading="lazy"
              title="Clinic Map"
            ></iframe>
            <div className="map-overlay">
              <div className="map-hint">
                <i className="fas fa-map-marked-alt"></i>
                انقر لفتح الموقع في خرائط جوجل
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-contact" style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
              <h4 style={{ marginBottom: 12 }}>تواصل معنا</h4>

              <div className="social-links" style={{ justifyContent: 'center', marginTop: 10 }}>
                <a href="tel:+967777440087" className="social-link" title="اتصال">
                  <i className="fas fa-phone"></i>
                </a>
                <a
                  href="https://wa.me/967775770538"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  title="واتساب"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="mailto:info@fcdclinics.com" className="social-link" title="البريد الإلكتروني">
                  <i className="fas fa-envelope"></i>
                </a>
                <a href="#" className="social-link" title="فيسبوك">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </div>

              <div style={{ marginTop: 18, color: 'rgba(255,255,255,0.95)', fontSize: '0.98rem' }}>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <i className="fas fa-map-marker-alt" style={{ opacity: 0.95 }}></i>
                  <span>شارع الزبيري، صنعاء</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024. جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>

      <a href="https://wa.me/967775770538" target="_blank" rel="noreferrer" className="whatsapp-float">
        <i className="fab fa-whatsapp"></i>
      </a>

      {videoModalOpen ? (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setVideoModalOpen(false)
          }}
          role="button"
          tabIndex={0}
        >
          <div
            style={{
              background: 'white',
              padding: 50,
              borderRadius: 25,
              maxWidth: 650,
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: 'var(--primary-dark)', marginBottom: 25 }}>مشغل الفيديو</h3>
            <div
              style={{
                background: 'var(--light-gray)',
                height: 350,
                borderRadius: 15,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 25,
              }}
            >
              <i className="fas fa-play-circle" style={{ fontSize: '4.5rem', color: 'var(--primary-dark)' }}></i>
            </div>
            <p style={{ color: 'var(--text-dark)', marginBottom: 25, fontSize: '1.1rem' }}>سيتم تشغيل الفيديو هنا</p>
            <button
              type="button"
              onClick={() => setVideoModalOpen(false)}
              style={{
                background: 'var(--gradient-primary)',
                color: 'white',
                border: 'none',
                padding: '15px 35px',
                borderRadius: 25,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1.1rem',
              }}
            >
              إغلاق
            </button>
          </div>
        </div>
      ) : null}
>>>>>>> c588d99a606a2474399a3012e785da05ea1c3914
    </>
  )
}

export default App
