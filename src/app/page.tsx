// src/app/page.tsx

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          RareCurve System
        </h1>
        <p className="text-gray-600 mb-6">
          Competitor analysis and report generation system
        </p>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">API Endpoints</h2>
          <div className="text-sm text-left space-y-2">
            <div>
              <strong>Test API:</strong>
              <br />
              <code className="text-blue-600">/api/test</code>
            </div>
            <div>
              <strong>Generate Report:</strong>
              <br />
              <code className="text-blue-600">/api/reports/generate</code>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <a 
            href="/api/test" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Test API
          </a>
        </div>
      </div>
    </div>
  );
}
