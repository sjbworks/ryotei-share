---
allowed-tools: Bash(gh pr diff:*), Bash(gh pr comment:*), Bash(gh pr review:*), Bash(gh pr checks:*), Bash(echo *), Bash(head *), Write
description: PR のコードレビューを行い、品質・セキュリティ・パフォーマンスの観点でコメントを投稿する。Critical がなく CI が通過していれば Approve する。
---

あなたはシニアエンジニアとして、以下の手順でコードレビューを行ってください。

## 重要な制約

- `gh pr view` を引数なしで実行してはならない（CI では detached HEAD のため必ず失敗する）
- `--body "..."` のようにフラグ値に引用符を使ってはならない（Claude Code のセキュリティチェックで拒否される）
- PR 番号は `$ARGUMENTS` として渡される（例: `/review 51` なら `$ARGUMENTS` = `51`）

## 手順

1. PR 番号は `$ARGUMENTS` を使う（例: `gh pr diff $ARGUMENTS`）
2. `gh pr diff $ARGUMENTS | head -300` で変更差分を確認する
3. 変更ファイルを必要に応じて `Read` ツールで読み込む（大きいファイルは offset/limit を使う）
4. 以下のチェックリストに従ってレビューする
5. レビュー結果を `Write` ツールで `/tmp/review-comment.md` に保存する
6. `gh pr comment $ARGUMENTS --body-file /tmp/review-comment.md` でコメントを投稿する
7. Approve 条件を満たしているか判断し、該当すれば Approve する

## チェックリスト

### 🔴 Critical（必ず修正）

- セキュリティ脆弱性（XSS, SQL Injection, 機密情報の露出など）
- 型安全性を壊す `any` の使用
- 未処理の Promise / エラーハンドリングの欠如
- 本番環境に影響するバグ

### 🟡 Warning（修正を推奨）

- TypeScript の型が不正確・不十分
- React のベストプラクティス違反（useEffect の deps 漏れ、不要な再レンダリングなど）
- 重複コード・責務の混在
- テストが書かれていない重要なロジック

### 🔵 Suggestion（改善提案）

- 可読性・命名の改善
- パフォーマンスの最適化余地
- コンポーネント分割の提案

## このプロジェクト固有の観点

- **Next.js App Router**: Server Component と Client Component の使い分けが適切か
- **Supabase**: RLS（Row Level Security）に依存した操作になっているか、直接 Service Role Key を使っていないか
- **Apollo Client**: キャッシュ戦略は適切か、不要なリクエストが発生していないか
- **GraphQL**: 型生成（codegen）を活用しているか、`any` で逃げていないか
- **MUI**: テーマに沿ったスタイリングになっているか
- **ESLint**: ルール違反がないか、特にセキュリティ関連のルールは守られているか
- **Accessibility**: ARIA 属性の適切な使用、キーボード操作のサポートなど

## 出力フォーマット（/tmp/review-comment.md に保存する内容）

```
## コードレビュー結果

### 🔴 Critical
（なければ「なし」）

### 🟡 Warning
（なければ「なし」）

### 🔵 Suggestion
（なければ「なし」）

### 総評
全体的な印象と、最優先で対応すべき点をまとめる。
```

## Approve 判断

コメント投稿後、以下の **両方** を満たす場合のみ `gh pr review $ARGUMENTS --approve` を実行する。

**条件 1: Critical がない**
- 上記レビューで 🔴 Critical が「なし」であること

**条件 2: CI がすべて通過している**
- `gh pr checks $ARGUMENTS` を実行し、全チェックが `pass` であること
- `fail` または `pending` のチェックが1つでもある場合は Approve しない

どちらか1つでも満たさない場合は Approve せず、レビューコメントのみを残す。
