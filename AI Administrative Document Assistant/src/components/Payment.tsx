import { useState } from 'react';
import { CreditCard, Building2, CheckCircle, Download, FileText, ChevronRight, ArrowLeft } from 'lucide-react';

type PaymentStep = 'summary' | 'method' | 'confirmation' | 'history';

export function Payment() {
  const [step, setStep] = useState<PaymentStep>('summary');
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const documents = [
    { name: '주민등록등본', agency: '정부24', fee: 1000 },
    { name: '전입세대 열람내역서', agency: '정부24', fee: 0 },
    { name: '건강보험자격득실확인서', agency: '국민건강보험공단', fee: 0 }
  ];

  const totalFee = documents.reduce((sum, doc) => sum + doc.fee, 0);

  const paymentMethods = [
    { id: 'card', name: '신용/체크카드', icon: CreditCard },
    { id: 'kakao', name: '카카오페이', icon: Building2 },
    { id: 'toss', name: '토스페이', icon: Building2 },
    { id: 'bank', name: '계좌이체', icon: Building2 }
  ];

  const paymentHistory = [
    { id: 1, date: '2025.11.18', title: '전입신고 자동발급 세트', amount: 1000 },
    { id: 2, date: '2025.11.15', title: '운전면허 갱신 서류', amount: 2500 },
    { id: 3, date: '2025.11.10', title: '사업자등록 필요 서류', amount: 3000 },
    { id: 4, date: '2025.11.05', title: '부동산 거래 서류', amount: 5000 }
  ];

  // Payment Summary
  if (step === 'summary') {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto">
        <h1 className="mb-6 md:mb-8 text-xl md:text-2xl" style={{ color: '#0D1321' }}>서류 발급 수수료 결제</h1>

        <div
          className="p-4 md:p-6 rounded-2xl border mb-4 md:mb-6"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#E4E8EE'
          }}
        >
          <h2 className="mb-4 text-base md:text-lg" style={{ color: '#0D1321' }}>발급 대상 서류</h2>

          <div className="space-y-2 md:space-y-3 mb-6">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 md:p-4 rounded-xl"
                style={{ backgroundColor: '#F4F7FB' }}
              >
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <FileText className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" style={{ color: '#1A73E8' }} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm md:text-base truncate" style={{ color: '#0D1321' }}>{doc.name}</div>
                    <div className="text-xs md:text-sm" style={{ color: '#6B7280' }}>
                      {doc.agency}
                    </div>
                  </div>
                </div>
                <div className="text-sm md:text-base ml-2" style={{ color: '#0D1321' }}>
                  {doc.fee === 0 ? '무료' : `${doc.fee.toLocaleString()}원`}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4" style={{ borderColor: '#E4E8EE' }}>
            <div className="flex items-center justify-between mb-4 text-sm md:text-base">
              <span style={{ color: '#6B7280' }}>서비스 이용료</span>
              <span style={{ color: '#0D1321' }}>500원</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base md:text-lg" style={{ color: '#0D1321' }}>총 결제 금액</span>
              <span className="text-lg md:text-xl" style={{ color: '#1A73E8' }}>
                {(totalFee + 500).toLocaleString()}원
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setStep('method')}
          className="w-full px-6 py-3 md:py-4 rounded-2xl transition-all text-sm md:text-base"
          style={{
            backgroundColor: '#1A73E8',
            color: '#FFFFFF'
          }}
        >
          결제하기
        </button>

        <button
          onClick={() => setStep('history')}
          className="w-full mt-3 px-6 py-3 md:py-4 rounded-2xl border transition-all text-sm md:text-base"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#E4E8EE',
            color: '#0D1321'
          }}
        >
          결제 내역 보기
        </button>
      </div>
    );
  }

  // Payment Method Selection
  if (step === 'method') {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto">
        <button
          onClick={() => setStep('summary')}
          className="mb-4 md:mb-6 flex items-center gap-2 text-sm md:text-base"
          style={{ color: '#1A73E8' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>뒤로</span>
        </button>

        <h1 className="mb-6 md:mb-8 text-xl md:text-2xl" style={{ color: '#0D1321' }}>결제 수단 선택</h1>

        <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className="w-full p-4 rounded-2xl border transition-all flex items-center justify-between"
                style={{
                  backgroundColor: selectedMethod === method.id ? '#E8F1FC' : '#FFFFFF',
                  borderColor: selectedMethod === method.id ? '#1A73E8' : '#E4E8EE',
                  borderWidth: selectedMethod === method.id ? '2px' : '1px'
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" style={{ color: '#1A73E8' }} />
                  <span className="text-sm md:text-base" style={{ color: '#0D1321' }}>{method.name}</span>
                </div>
                {selectedMethod === method.id && (
                  <CheckCircle className="w-5 h-5" style={{ color: '#1A73E8' }} />
                )}
              </button>
            );
          })}
        </div>

        <div
          className="p-4 rounded-2xl mb-4 md:mb-6"
          style={{ backgroundColor: '#F4F7FB' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm md:text-base" style={{ color: '#0D1321' }}>결제 금액</span>
            <span className="text-lg md:text-xl" style={{ color: '#1A73E8' }}>
              {(totalFee + 500).toLocaleString()}원
            </span>
          </div>
        </div>

        <button
          onClick={() => setStep('confirmation')}
          disabled={!selectedMethod}
          className="w-full px-6 py-3 md:py-4 rounded-2xl transition-all disabled:opacity-50 text-sm md:text-base"
          style={{
            backgroundColor: '#1A73E8',
            color: '#FFFFFF'
          }}
        >
          {(totalFee + 500).toLocaleString()}원 결제하기
        </button>
      </div>
    );
  }

  // Payment Confirmation
  if (step === 'confirmation') {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: '#E8F1FC' }}
          >
            <CheckCircle className="w-8 h-8 md:w-10 md:h-10" style={{ color: '#10B981' }} />
          </div>
          <h1 className="mb-2 text-xl md:text-2xl" style={{ color: '#0D1321' }}>발급 완료</h1>
          <p className="text-sm md:text-base" style={{ color: '#6B7280' }}>
            서류 발급이 성공적으로 완료되었습니다
          </p>
        </div>

        <div
          className="p-4 md:p-6 rounded-2xl border mb-4 md:mb-6"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#E4E8EE'
          }}
        >
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm md:text-base">
              <span style={{ color: '#6B7280' }}>결제 일시</span>
              <span style={{ color: '#0D1321' }}>2025.11.18 14:30</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span style={{ color: '#6B7280' }}>결제 수단</span>
              <span style={{ color: '#0D1321' }}>신용카드</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span style={{ color: '#6B7280' }}>결제 금액</span>
              <span style={{ color: '#1A73E8' }}>
                {(totalFee + 500).toLocaleString()}원
              </span>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2 md:space-y-3" style={{ borderColor: '#E4E8EE' }}>
            <button
              className="w-full flex items-center justify-between p-3 rounded-xl transition-all"
              style={{ backgroundColor: '#F4F7FB' }}
            >
              <span className="text-sm md:text-base" style={{ color: '#0D1321' }}>영수증 다운로드</span>
              <Download className="w-4 h-4" style={{ color: '#1A73E8' }} />
            </button>
            <button
              className="w-full flex items-center justify-between p-3 rounded-xl transition-all"
              style={{ backgroundColor: '#F4F7FB' }}
            >
              <span className="text-sm md:text-base" style={{ color: '#0D1321' }}>세금계산서 발급</span>
              <ChevronRight className="w-4 h-4" style={{ color: '#1A73E8' }} />
            </button>
          </div>
        </div>

        <button
          onClick={() => setStep('summary')}
          className="w-full px-6 py-3 md:py-4 rounded-2xl transition-all text-sm md:text-base"
          style={{
            backgroundColor: '#1A73E8',
            color: '#FFFFFF'
          }}
        >
          내 문서 보관함으로 이동
        </button>

        <button
          onClick={() => setStep('summary')}
          className="w-full mt-3 px-6 py-3 md:py-4 rounded-2xl border transition-all text-sm md:text-base"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#E4E8EE',
            color: '#0D1321'
          }}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  // Payment History
  if (step === 'history') {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto">
        <button
          onClick={() => setStep('summary')}
          className="mb-4 md:mb-6 flex items-center gap-2 text-sm md:text-base"
          style={{ color: '#1A73E8' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>뒤로</span>
        </button>

        <h1 className="mb-6 md:mb-8 text-xl md:text-2xl" style={{ color: '#0D1321' }}>결제 내역</h1>

        <div className="space-y-3">
          {paymentHistory.map((payment) => (
            <div
              key={payment.id}
              className="p-4 md:p-5 rounded-2xl border transition-all hover:shadow-lg cursor-pointer"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E4E8EE'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm md:text-base truncate" style={{ color: '#0D1321' }}>{payment.title}</div>
                  <div className="text-xs md:text-sm" style={{ color: '#6B7280' }}>
                    {payment.date}
                  </div>
                </div>
                <div className="text-sm md:text-base ml-4" style={{ color: '#0D1321' }}>
                  {payment.amount.toLocaleString()}원
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-2 px-3 md:px-4 py-2 rounded-xl border transition-all text-xs md:text-sm"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E4E8EE',
                    color: '#0D1321'
                  }}
                >
                  <Download className="w-4 h-4" />
                  <span>영수증</span>
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 px-3 md:px-4 py-2 rounded-xl border transition-all text-xs md:text-sm"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E4E8EE',
                    color: '#0D1321'
                  }}
                >
                  <FileText className="w-4 h-4" />
                  <span>세금계산서</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
