# 📚 math-flat

**수학 학습지 문제 리스트 & 유사문제 관리 플랫폼**

학습지 편집/문제 관리 프로젝트입니다.

---
## ✨ 주요 기능

* 문제 리스트/유사문제 리스트 관리
* 문제 추가/삭제/교체
* 난이도별 문제 개수 및 전체 집계
* 상태관리(zustand), 데이터 fetch(react-query)

---

## ⚡️ 빠른 시작

**1. 의존성 설치**
yarn install

**2. 개발 서버 실행**
yarn start 

**3. 테스트 실행**
yarn test


## 💻 주요 컴포넌트/스토어

* WorksheetEditor
  　문제 리스트, 난이도별 집계, 문제수 표시, 유사문제 패널 연동
* SimilarProblemPanel
    선택한 문제에 대한 유사문제 리스트, 교체, 추가 가능
* ProblemCard
  　문제별 정보 및 교체/삭제/유사문제 버튼
* zustand store
  　문제/유사문제 리스트, active 상태, swap/insert/remove 액션 제공

---



# 📦 프로젝트 폴더 구조

```
src/
  App.tsx
  index.css
  main.tsx
  api/
    Problems.ts
  assets/
    react.svg
  components/
    common/
      CustomScrollbar.tsx
      ProblemCard.tsx
    worksheet/
      SimilarProblemPanel.tsx
      WorksheetEditor.tsx
  hooks/
    useLevelLabel.ts
    useProblemActions.ts
    useProblems.ts
  store/
    useProbleamStore.ts
  tests/
    useProbleamStore.test.ts
  types/
    ProblemCard.ts
  utils/
    problemStats.ts
```

---

# ⚙️ 기술 스택

* **React 18**
  UI 라이브러리

* **TypeScript**
  정적 타입 언어

* **Vite**
  번들러 및 개발 서버

* **Zustand**
  전역 상태 관리

* **@tanstack/react-query**
  비동기 데이터 패칭 및 캐싱

* **Jest**
  테스트 프레임워크

* **Tailwind CSS**
  유틸리티 퍼스트 CSS 프레임워크

* **React Testing Library**
  컴포넌트 단위 테스트 지원

---

# 🌟 주요 기능

* **문제 리스트 표시**

  * 학습지에 등록된 문제들을 리스트 형태로 보여줍니다.

* **문제별 난이도 및 정답률 표시**

  * 각 문제의 난이도(하\~최상), 정답률을 시각적으로 확인할 수 있습니다.

* **유사문제 리스트 조회**

  * 선택된(Active) 문제에 대해 유사문제를 조회하여,
    교체/추가할 수 있는 리스트를 보여줍니다.

* **문제 교체 / 추가 / 삭제**

  * \[교체] 선택한 문제와 유사문제를 자리만 바꿔서 바로 교체
  * \[추가] 유사문제를 학습지 문제 리스트의 원하는 위치에 추가
  * \[삭제] 문제 리스트에서 원하는 문제를 즉시 삭제

* **문제 Active(선택) 상태 관리**

  * 클릭 시 문제가 active되어,
    해당 문제에 맞는 유사문제를 바로 조회

* **난이도별 문제 개수, 전체 문제수 실시간 집계**

  * 하단에 난이도별 집계와 전체 문제 수가 바로 반영

* **상태관리 및 비동기 동기화**

  * 상태 변화(zustand), 데이터 fetch/react-query 사용
  * UI와 데이터 일관성 보장


