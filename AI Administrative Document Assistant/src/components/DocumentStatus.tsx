import { useState } from 'react';
import { FileText, Download, RefreshCw, ChevronRight, CheckCircle, Clock, AlertCircle, Building2, Calendar, X } from 'lucide-react';

type FilterType = '전체' | '처리중' | '완료';

interface Document {
  id: number;
  title: string;
  status: 'processing' | 'completed' | 'error';
  progress: number;
  documents: string[];
  agency: string[];
  date: string;
  deadline?: string;
}

export function DocumentStatus() {
  const [filter, setFilter] = useState<FilterType>('전체');
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);

  const documents: Document[] = [
    {
      id: 1,
      title: '전입신고 자동발급 세트',
      status: 'completed',
      progress: 100,
      documents: ['주민등록등본', '전입세대 열람내역서', '건강보험자격득실확인서'],
      agency: ['정부24', '국민건강보험공단'],
      date: '2025.11.18',
      deadline: '2025.12.01'
    },
    {
      id: 2,
      title: '장학금 신청 서류 세트',
      status: 'processing',
      progress: 60,
      documents: ['가족관계증명서', '소득금액증명원', '재학증명서'],
      agency: ['정부24', '국세청 홈택스'],
      date: '2025.11.17',
      deadline: '2025.11.30'
    },
    {
      id: 3,
      title: '사업자등록 필요 서류',
      status: 'error',
      progress: 40,
      documents: ['본인서명사실확인서', '임대차계약서 사본'],
      agency: ['정부24', '지자체'],
      date: '2025.11.16'
    },
    {
      id: 4,
      title: '운전면허 갱신 서류',
      status: 'completed',
      progress: 100,
      documents: ['적성검사 증명서', '신분증명서'],
      agency: ['경찰청'],
      date: '2025.11.15'
    }
  ];

  const filters: FilterType[] = ['전체', '처리중', '완료'];

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#10B981' }} />;
      case 'processing':
        return <Clock className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#F59E0B' }} />;
      case 'error':
        return <AlertCircle className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#EF4444' }} />;
    }
  };

  const getStatusText = (status: Document['status']) => {
    switch (status) {
      case 'completed':
        return '완료';
      case 'processing':
        return '처리중';
      case 'error':
        return '오류';
    }
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'processing':
        return '#F59E0B';
      case 'error':
        return '#EF4444';
    }
  };

  const filteredDocs = documents.filter(doc => {
    if (filter === '전체') return true;
    if (filter === '처리중') return doc.status === 'processing';
    if (filter === '완료') return doc.status === 'completed';
    return true;
  });

  const selectedDocument = documents.find(d => d.id === selectedDoc);

  return (
    <>
      {/* List View */}
      <div className="p-4 md:p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <h1 className="mb-4 md:mb-6 text-xl md:text-2xl" style={{ color: '#0D1321' }}>내 발급 신청 내역</h1>

          {/* Filters */}
          <div className="flex gap-2 md:gap-3 mb-4 md:mb-6 overflow-x-auto pb-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-2 md:px-4 rounded-xl transition-all whitespace-nowrap text-sm md:text-base"
                style={{
                  backgroundColor: filter === f ? '#1A73E8' : '#FFFFFF',
                  color: filter === f ? '#FFFFFF' : '#0D1321',
                  border: filter === f ? 'none' : '1px solid #E4E8EE'
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Document List */}
          <div className="space-y-3 md:space-y-4">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-4 md:p-6 rounded-2xl border cursor-pointer transition-all hover:shadow-lg"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: selectedDoc === doc.id ? '#1A73E8' : '#E4E8EE',
                  borderWidth: selectedDoc === doc.id ? '2px' : '1px'
                }}
                onClick={() => setSelectedDoc(doc.id)}
              >
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className="flex items-start gap-2 md:gap-3 flex-1 min-w-0">
                    {getStatusIcon(doc.status)}
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 text-sm md:text-base truncate" style={{ color: '#0D1321' }}>
                        {doc.title}
                      </h3>
                      <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm flex-wrap" style={{ color: '#6B7280' }}>
                        <span>{doc.date}</span>
                        <span>•</span>
                        <span className="truncate">{doc.agency.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap ml-2"
                    style={{
                      backgroundColor: `${getStatusColor(doc.status)}20`,
                      color: getStatusColor(doc.status)
                    }}
                  >
                    {getStatusText(doc.status)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-3 md:mb-4">
                  <div className="flex items-center justify-between text-xs md:text-sm mb-2" style={{ color: '#6B7280' }}>
                    <span>진행률</span>
                    <span>{doc.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#E4E8EE' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${doc.progress}%`,
                        backgroundColor: getStatusColor(doc.status)
                      }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                  {doc.status === 'completed' && (
                    <button
                      className="flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 rounded-xl transition-all text-sm md:text-base"
                      style={{
                        backgroundColor: '#1A73E8',
                        color: '#FFFFFF'
                      }}
                    >
                      <Download className="w-4 h-4" />
                      <span>다운로드</span>
                    </button>
                  )}
                  {doc.status === 'error' && (
                    <button
                      className="flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 rounded-xl transition-all text-sm md:text-base"
                      style={{
                        backgroundColor: '#EF4444',
                        color: '#FFFFFF'
                      }}
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>재시도</span>
                    </button>
                  )}
                  <button
                    className="flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 rounded-xl border transition-all text-sm md:text-base"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E4E8EE',
                      color: '#0D1321'
                    }}
                  >
                    <span>상세보기</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Modal / Desktop Side Panel */}
      {selectedDoc && selectedDocument && (
        <>
          {/* Mobile: Full Screen Modal */}
          <div 
            className="md:hidden fixed inset-0 z-50"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <div className="flex flex-col h-full">
              {/* Modal Header */}
              <div 
                className="flex items-center justify-between p-4 border-b"
                style={{ borderColor: '#E4E8EE' }}
              >
                <h2 style={{ color: '#0D1321' }}>발급 상세 내역</h2>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-2 rounded-full"
                  style={{ color: '#6B7280' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-auto p-4">
                <DetailContent document={selectedDocument} />
              </div>
            </div>
          </div>

          {/* Desktop: Side Panel (Hidden on mobile) */}
          <div
            className="hidden md:block fixed right-0 top-16 bottom-0 w-96 border-l p-6 overflow-auto"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E4E8EE'
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ color: '#0D1321' }}>발급 상세 내역</h2>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-2 rounded-full hover:bg-opacity-10"
                style={{ color: '#6B7280' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <DetailContent document={selectedDocument} />
          </div>
        </>
      )}
    </>
  );
}

function DetailContent({ document }: { document: Document }) {
  return (
    <div>
      {/* Document List */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm md:text-base" style={{ color: '#0D1321' }}>
          발급한 서류
        </h3>
        <div className="space-y-2">
          {document.documents.map((docName, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ backgroundColor: '#F4F7FB' }}
            >
              <FileText className="w-4 h-4" style={{ color: '#1A73E8' }} />
              <span className="text-sm md:text-base" style={{ color: '#0D1321' }}>{docName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Agency Info */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm md:text-base" style={{ color: '#0D1321' }}>
          발급 기관
        </h3>
        <div className="space-y-2">
          {document.agency.map((agency, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ backgroundColor: '#F4F7FB' }}
            >
              <Building2 className="w-4 h-4" style={{ color: '#1A73E8' }} />
              <span className="text-sm md:text-base" style={{ color: '#0D1321' }}>{agency}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Deadline */}
      {document.deadline && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm md:text-base" style={{ color: '#0D1321' }}>
            제출 기한
          </h3>
          <div
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ backgroundColor: '#FFF9E6' }}
          >
            <Calendar className="w-4 h-4" style={{ color: '#F59E0B' }} />
            <span className="text-sm md:text-base" style={{ color: '#0D1321' }}>{document.deadline}</span>
          </div>
        </div>
      )}

      {/* Auto Submit */}
      <div
        className="p-4 rounded-xl border"
        style={{
          backgroundColor: '#F4F7FB',
          borderColor: '#E4E8EE'
        }}
      >
        <h3 className="mb-2 text-sm md:text-base" style={{ color: '#0D1321' }}>
          자동 제출 가능 기관
        </h3>
        <p className="text-xs md:text-sm mb-4" style={{ color: '#6B7280' }}>
          선택한 기관에 서류를 자동으로 제출할 수 있습니다.
        </p>
        <button
          className="w-full px-4 py-3 rounded-xl transition-all text-sm md:text-base"
          style={{
            backgroundColor: '#1A73E8',
            color: '#FFFFFF'
          }}
        >
          자동 제출하기
        </button>
      </div>
    </div>
  );
}

interface Document {
  id: number;
  title: string;
  status: 'processing' | 'completed' | 'error';
  progress: number;
  documents: string[];
  agency: string[];
  date: string;
  deadline?: string;
}
