// src/app/page.tsx

export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '400px', 
        textAlign: 'center', 
        padding: '24px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          color: '#1f2937'
        }}>
          🚀 RareCurve System
        </h1>
        
        <p style={{ 
          color: '#6b7280', 
          marginBottom: '24px' 
        }}>
          Competitor analysis and report generation system is LIVE!
        </p>
        
        <div style={{ 
          backgroundColor: '#f3f4f6', 
          padding: '16px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            marginBottom: '12px',
            color: '#374151'
          }}>
            API Endpoints
          </h2>
          
          <div style={{ fontSize: '14px', textAlign: 'left' }}>
            <div style={{ marginBottom: '8px' }}>
              <strong>Test API:</strong><br />
              <code style={{ color: '#2563eb' }}>/api/test</code>
            </div>
            <div>
              <strong>Generate Report:</strong><br />
              <code style={{ color: '#2563eb' }}>/api/reports/generate</code>
            </div>
          </div>
        </div>
        
        <a 
          href="/api/test" 
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            display: 'inline-block',
            fontWeight: '500'
          }}
        >
          Test API Now →
        </a>
      </div>
    </div>
  );
}
