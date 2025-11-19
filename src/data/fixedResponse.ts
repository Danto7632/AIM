export type StageMessage =
  | { kind: 'text'; text: string }
  | { kind: 'tip'; text: string }
  | { kind: 'documents' };

export interface StageConfig {
  id: string;
  messages: StageMessage[];
}

export const fixedResponse = {
  greetingText: '안녕하세요! AI 행정서류 비서입니다. 어떤 행정 업무를 도와드릴까요?',
  placeholderText: '질문을 입력하거나 아래 추천 질문 버튼을 눌러주세요. MVP 데모용 고정 응답이 순차적으로 표시됩니다.',
  responseDelayMs: 2000,
  typewriterSpeedMs: 30,
  documents: [
    { name: '주민등록등본', agency: '정부24' },
    { name: '전입세대 열람내역서', agency: '정부24' },
    { name: '건강보험자격득실확인서', agency: '국민건강보험공단' },
  ],
  stages: [
    {
      id: 'stage-1',
      messages: [
        { kind: 'text', text: '전입신고를 도와드리겠습니다. 필요한 서류를 자동으로 확인했어요.' },
        { kind: 'documents' },
        { kind: 'tip', text: '💡 전입신고는 이사 후 14일 이내에 완료하셔야 합니다.' },
      ],
    },
    {
      id: 'stage-2',
      messages: [
        { kind: 'text', text: '요청하신 업무를 검토했고, 준비된 고정 응답을 전달드립니다.' },
        { kind: 'tip', text: '서류 자동발급 후 결제를 진행하면 즉시 제출용 파일을 내려받을 수 있습니다.' },
      ],
    },
    {
      id: 'stage-3',
      messages: [
        { kind: 'text', text: '현재는 데모 단계이므로 동일한 결과가 반복됩니다. 필요한 문구로 자유롭게 수정하세요.' },
      ],
    },
  ] as StageConfig[],
};
