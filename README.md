# Ryotei Share

![Ryotei Share](assets/svg/WalkingMan.svg)

https://ryotei-share.vercel.app/

## 📝 プロジェクト概要

**Ryotei Share**は、旅行の行程表をシンプルに作成・管理できるWebアプリケーションです。

### 主な機能

- 📅 **タイムライン形式での旅程作成**: 時系列で旅行スケジュールを管理
- 🗂️ **複数の旅行計画管理**: 複数のトリップを作成・切り替え可能
- 🔐 **認証機能**: Supabase認証によるユーザー管理（Github, Google）
- ⚡ **リアルタイム更新**: GraphQLによる効率的なデータ同期

## 🛠️ 技術スタック

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [Material-UI](https://mui.com/) v6
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Apollo Client](https://www.apollographql.com/docs/react/)

### Backend & Infrastructure

- **BaaS**: [Supabase](https://supabase.com/) (認証・データベース)
- **API**: [GraphQL](https://graphql.org/)
- **Type Generation**: [GraphQL Code Generator](https://www.graphql-code-generator.com/)

### Development Tools

- **Component Development**: [Storybook](https://storybook.js.org/)
- **Code Quality**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- **Package Manager**: npm

### Deployment

- **Hosting**: [Vercel](https://vercel.com/)

## 🏗️ プロジェクト構成

本プロジェクトは**Feature-based Architecture**を採用しています。

```
ryotei-share/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ
│   ├── login/             # ログインページ
│   └── legal/             # 利用規約ページ
├── component/             # 再利用可能なUIコンポーネント
│   ├── Button/
│   ├── Form/
│   ├── Modal/
│   └── Timeline/
├── feature/               # 機能別コンポーネント
│   ├── auth/              # 認証機能
│   ├── provider/          # Providerコンポーネント
│   └── ryotei/            # 旅程管理機能
│       ├── components/    # 機能専用コンポーネント
│       └── hooks/         # カスタムフック
├── utils/                 # ユーティリティ関数
├── assets/                # 静的アセット
└── stories/               # Storybookストーリー
```

### 設計

- **コンポーネント駆動開発**: Storybook + コンポーネント開発
- **型安全性**: TypeScript + GraphQL Code Generatorによる型サポート
- **関心の分離**: feature/component分離による保守性の向上
- **カスタムフック活用**: ロジックとUIの分離による再利用性の向上

## 開発

```bash
# 開発サーバー起動
npm run dev

# Storybook起動
npm run storybook

# GraphQL型生成
npm run codegen

# ビルド
npm run build
```
