import { DownloadCloud, FileText, Inbox } from 'lucide-react';
import { useSavedDocuments } from '../contexts/SavedDocumentsContext';

export function DocumentStorage() {
  const { documents } = useSavedDocuments();

  if (documents.length === 0) {
    return (
      <div className="flex items-center justify-center h-full px-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F1FC' }}>
            <Inbox className="w-8 h-8" style={{ color: '#1A73E8' }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: '#0D1321' }}>저장된 문서가 없습니다</h2>
            <p className="text-sm" style={{ color: '#6B7280' }}>결제를 완료하면 문서가 자동으로 보관되고 이곳에서 확인할 수 있습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-4">
      <h1 className="text-xl md:text-2xl" style={{ color: '#0D1321' }}>내 문서 보관함</h1>
      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-4 md:p-5 rounded-2xl border flex flex-col md:flex-row md:items-center gap-4"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#E4E8EE' }}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#E8F1FC' }}>
                <FileText className="w-5 h-5" style={{ color: '#1A73E8' }} />
              </div>
              <div>
                <p className="text-sm md:text-base" style={{ color: '#0D1321' }}>{doc.name}</p>
                <p className="text-xs md:text-sm" style={{ color: '#6B7280' }}>{doc.agency}</p>
                <p className="text-xs md:text-sm" style={{ color: '#9CA3AF' }}>저장일시: {new Date(doc.savedAt).toLocaleString()}</p>
              </div>
            </div>
            <button
              className="px-4 py-2 rounded-xl border flex items-center justify-center gap-2 text-sm"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#E4E8EE', color: '#0D1321' }}
            >
              <DownloadCloud className="w-4 h-4" />
              <span>다운로드</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
