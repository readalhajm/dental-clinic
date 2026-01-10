import React from 'react'

export default function App() {
  return (
    <div dir="rtl" lang="ar" style={{ fontFamily: 'Inter, system-ui, Arial, sans-serif', padding: 24 }}>
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>العيادة الاستشارية لطب وجراحة الفم والأسنان</h1>
        <p style={{ marginTop: 8, color: '#444' }}>الموقع يعمل الآن — تم إصلاح خطأ البناء المؤدي إلى شاشة بيضاء.</p>
      </header>

      <main>
        <section>
          <h2>مرحباً</h2>
          <p>هذا إصدار مبسط مؤقت لواجهة التطبيق لإصلاح مشكلة التحويل والبناء. يمكنك الآن تشغيل npm run build بنجاح.</p>
        </section>
      </main>

      <footer style={{ marginTop: 36, color: '#666' }}>
        <small>إصدار تصحيحي مؤقت — تواصل لو أردت استرجاع الواجهة الكاملة.</small>
      </footer>
    </div>
  )
}
