// src/app/page.tsx

export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb', 
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#2563eb'
          }}>
            🚀 RareCurve
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a 
              href="/dashboard"
              style={{
                color: '#2563eb',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Dashboard
            </a>
            <a 
              href="/api/test"
              style={{
                color: '#6b7280',
                textDecoration: 'none'
              }}
            >
              API Test
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{
        padding: '80px 20px',
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          marginBottom: '24px',
          color: '#1f2937',
          lineHeight: '1.1'
        }}>
          Competitor Takeover Reports
        </h1>
        
        <p style={{ 
          color: '#6b7280', 
          marginBottom: '40px',
          fontSize: '20px',
          maxWidth: '600px',
          margin: '0 auto 40px auto',
          lineHeight: '1.5'
        }}>
          Generate psychological impact reports showing exactly how competitors are stealing your customers and revenue.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '64px' }}>
          <a 
            href="/dashboard"
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              display: 'inline-block'
            }}
          >
            Generate Report →
          </a>
          
          <a 
            href="/api/test"
            style={{
              backgroundColor: 'white',
              color: '#2563eb',
              padding: '16px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              border: '2px solid #2563eb',
              display: 'inline-block'
            }}
          >
            Test API
          </a>
        </div>

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '48px',
          maxWidth: '900px',
          margin: '0 auto 48px auto'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>💸</div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>
              Revenue Bleeding Analysis
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Show exact dollar amounts competitors are capturing from their market
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📞</div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>
              Call Hijacking Data
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Track daily phone calls going to competitor numbers instead of yours
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🗺️</div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>
              Territory Domination Map
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Visual map showing which competitors control each geographic zone
            </p>
          </div>
        </div>

        {/* Pricing */}
        <div style={{
          backgroundColor: 'white',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          marginBottom: '48px',
          maxWidth: '400px',
          margin: '0 auto 48px auto'
        }}>
          <div style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#059669',
            marginBottom: '8px'
          }}>
            $0.08
          </div>
          <div style={{ color: '#6b7280', marginBottom: '16px' }}>
            per report
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280', textAlign: 'left' }}>
            <div style={{ marginBottom: '4px' }}>✓ 8 SerpAPI searches</div>
            <div style={{ marginBottom: '4px' }}>✓ 2x2 geographic grid analysis</div>
            <div style={{ marginBottom: '4px' }}>✓ Named competitor data</div>
            <div style={{ marginBottom: '4px' }}>✓ Revenue impact calculations</div>
            <div style={{ marginBottom: '4px' }}>✓ Psychological insights</div>
            <div>✓ Database storage</div>
          </div>
        </div>

        {/* Live System Status */}
        <div style={{
          padding: '24px',
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '12px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#22c55e',
              borderRadius: '50%',
              marginRight: '8px'
            }}></div>
            <span style={{ color: '#16a34a', fontWeight: '600' }}>
              System Status: LIVE
            </span>
          </div>
          <div style={{ color: '#15803d', fontSize: '14px', textAlign: 'center' }}>
            ✅ SerpAPI Connected<br />
            ✅ Database Online<br />
            ✅ Report Generation Ready<br />
            ✅ Cost Tracking Active
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #e5e7eb',
        padding: '32px 20px',
        textAlign: 'center',
        color: '#6b7280',
        fontSize: '14px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p>RareCurve Competitor Analysis System • Built for maximum psychological impact</p>
          <p style={{ marginTop: '8px' }}>
            Contact: <strong>help@rarecurve.com</strong> • <strong>(555) 123-7265</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
