// src/types/index.ts

export interface BusinessInfo {
  id?: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  latitude: number;
  longitude: number;
  industry: string;
  keywords: string[];
}

export interface GridPoint {
  lat: number;
  lng: number;
  name: string;
  zone: string;
}

export interface SearchParams {
  keyword: string;
  location: string;
  gridPoint: GridPoint;
  engine?: string;
  type?: string;
}

export interface CompetitorResult {
  name: string;
  phone: string;
  address: string;
  rating: number;
  reviews: number;
  rank: number;
  website?: string;
  place_id?: string;
  zone: string;
}

export interface CompetitorAnalysis {
  name: string;
  phone: string;
  address: string;
  rating: number;
  reviews: number;
  dominanceScore: number;
  marketPresence: number;
  estimatedDailyCalls: number;
  reviewAdvantage: boolean;
  geographicCoverage: string[];
  totalRevenue: number;
}

export interface GeographicAnalysis {
  totalZones: number;
  clientVisibleZones: number;
  competitorDominatedZones: number;
  opportunityZones: number;
  gridData: GridZoneData[];
}

export interface GridZoneData {
  zone: string;
  position: { row: number; col: number };
  status: 'client' | 'competitor' | 'opportunity' | 'empty';
  topCompetitor?: string;
  clientRank?: number;
  competitorRank?: number;
}

export interface RevenueImpact {
  dailyLostRevenue: number;
  monthlyLostRevenue: number;
  annualLostRevenue: number;
  opportunityValue: number;
  competitorRevenue: { [key: string]: number };
  totalMarketValue: number;
}

export interface PsychologicalInsight {
  type: 'revenue_bleeding' | 'territory_loss' | 'call_hijacking' | 'review_paradox' | 'customer_theft';
  headline: string;
  description: string;
  impact: string;
  urgency: 'high' | 'medium' | 'low';
  competitorName?: string;
  dollarAmount?: number;
  callVolume?: number;
}

export interface MarketData {
  dailySearchVolume: number;
  averageServiceValue: number;
  conversionRate: number;
  marketSize: number;
}

export interface ReportData {
  id?: string;
  businessInfo: BusinessInfo;
  competitorAnalysis: CompetitorAnalysis[];
  geographicData: GeographicAnalysis;
  revenueImpact: RevenueImpact;
  psychologicalInsights: PsychologicalInsight[];
  marketData: MarketData;
  generatedAt: Date;
  searchCost: number;
}

export interface ReportParams {
  businessName: string;
  address: string;
  phone?: string;
  website?: string;
  industry: string;
  keywords: string[];
  radius?: number;
}

export interface SearchResult {
  organic_results?: Array<{
    title: string;
    link: string;
    snippet: string;
    rating?: number;
    reviews?: number;
    price?: string;
    hours?: string;
  }>;
  local_results?: Array<{
    title: string;
    place_id: string;
    data_id: string;
    gps_coordinates: {
      latitude: number;
      longitude: number;
    };
    rating: number;
    reviews: number;
    phone: string;
    address: string;
    website?: string;
    hours?: string;
    price?: string;
  }>;
}

export interface SerpApiResponse {
  search_metadata: {
    id: string;
    status: string;
    json_endpoint: string;
    created_at: string;
    processed_at: string;
    google_url: string;
    raw_html_file: string;
    total_time_taken: number;
  };
  search_parameters: {
    engine: string;
    q: string;
    location: string;
    hl: string;
    gl: string;
    google_domain: string;
  };
  search_information: {
    organic_results_state: string;
    query_displayed: string;
    total_results: number;
    time_taken_displayed: number;
  };
  local_results: CompetitorResult[];
  organic_results?: Array<any>;
}

export interface CostMetrics {
  searchesPerReport: number;
  costPerSearch: number;
  totalMonthlyCost: number;
  reportsGenerated: number;
  costPerReport: number;
  remainingBudget: number;
}

export interface SearchLog {
  id: string;
  query: string;
  location: string;
  cost: number;
  timestamp: Date;
  results: any;
  success: boolean;
}

export interface BusinessLead {
  id?: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  industry: string;
  estimatedRevenue?: number;
  lastContacted?: Date;
  status: 'new' | 'contacted' | 'interested' | 'converted' | 'rejected';
}

export interface EmailTemplate {
  subject: string;
  htmlContent: string;
  textContent: string;
  attachments?: string[];
}

export interface UsageMetrics {
  totalSearches: number;
  totalCost: number;
  averageCostPerReport: number;
  reportsGenerated: number;
  successRate: number;
  dailyUsage: number;
  monthlyProjection: number;
}
