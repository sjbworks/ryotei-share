import Link from 'next/link'

export default function Legal() {
  const containerStyle = 'max-w-4xl mx-auto p-6 bg-white'
  const h1Style = 'text-xl font-bold mb-6 text-gray-800 break-words'
  const sectionStyle = 'mb-8'
  const h2Style = 'text-lg font-semibold mb-3 text-gray-700'
  const h3Style = 'text-base font-semibold mb-2 text-gray-700'
  const paragraphStyle = 'mb-4 text-gray-600 leading-relaxed'
  const listStyle = 'list-disc list-inside mb-4 text-gray-600 space-y-1'

  return (
    <div className={containerStyle}>
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
          ← ホームに戻る
        </Link>
      </div>

      <h1 className={h1Style}>利用規約・プライバシーポリシー</h1>

      <section className={sectionStyle}>
        <h2 className={h2Style}>利用規約</h2>
        <p className={paragraphStyle}>
          本利用規約（以下「本規約」）は、当サービス（以下「本サービス」）の利用条件を定めるものです。
          本サービスをご利用いただく際には、本規約にご同意いただいたものとみなします。
        </p>

        <h3 className={h3Style}>第1条（適用）</h3>
        <p className={paragraphStyle}>
          本規約は、ユーザーと当サービス運営者との間の本サービスの利用に関わる一切の関係に適用されます。
        </p>

        <h3 className={h3Style}>第2条（利用登録）</h3>
        <p className={paragraphStyle}>
          本サービスでは、外部認証サービス（Google、GitHub等）を通じてアカウント登録を行います。
          これらのサービスの利用規約にも従っていただく必要があります。
        </p>

        <h3 className={h3Style}>第3条（禁止事項）</h3>
        <p className={paragraphStyle}>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
        <ul className={listStyle}>
          <li>法令または公序良俗に違反する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>本サービスの運営を妨害する行為</li>
          <li>他のユーザーまたは第三者の知的財産権を侵害する行為</li>
          <li>他のユーザーまたは第三者の名誉、信用、プライバシー等を侵害する行為</li>
          <li>本サービスに過度な負荷をかける行為</li>
          <li>その他、当サービス運営者が不適切と判断する行為</li>
        </ul>

        <h3 className={h3Style}>第4条（本サービスの停止等）</h3>
        <p className={paragraphStyle}>
          当サービス運営者は、以下の場合には、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができます。
        </p>
        <ul className={listStyle}>
          <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
          <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
          <li>コンピュータまたは通信回線等が事故により停止した場合</li>
          <li>その他、当サービス運営者が本サービスの提供が困難と判断した場合</li>
        </ul>

        <h3 className={h3Style}>第5条（免責事項）</h3>
        <p className={paragraphStyle}>
          当サービス運営者は、本サービスに関して、明示または黙示を問わず、完全性、正確性、確実性、有用性等についていかなる保証も行いません。
          本サービスの利用により生じた損害について、当サービス運営者は一切の責任を負いません。
        </p>

        <h3 className={h3Style}>第6条（準拠法・裁判管轄）</h3>
        <p className={paragraphStyle}>
          本規約の解釈にあたっては、日本法を準拠法とします。
          本サービスに関して紛争が生じた場合、当サービス運営者の所在地を管轄する裁判所を専属的合意管轄とします。
        </p>
      </section>

      <section className={sectionStyle}>
        <h2 className={h2Style}>プライバシーポリシー</h2>

        <h3 className={h3Style}>収集する情報</h3>
        <p className={paragraphStyle}>本サービスでは、以下の情報を収集します：</p>
        <ul className={listStyle}>
          <li>
            外部認証サービス（Google、GitHub等）から提供される基本的なプロフィール情報（氏名、メールアドレス、プロフィール画像等）
          </li>
          <li>サービス利用時に入力される旅行データ（行き先、日程、写真等）</li>
          <li>アクセスログ、クッキー等の技術的情報</li>
        </ul>

        <h3 className={h3Style}>利用目的</h3>
        <p className={paragraphStyle}>収集した情報は以下の目的で利用します：</p>
        <ul className={listStyle}>
          <li>本サービスの提供・運営</li>
          <li>ユーザー認証・本人確認</li>
          <li>サービスの改善・開発</li>
          <li>技術的な問題の解決</li>
        </ul>

        <h3 className={h3Style}>情報の共有・開示</h3>
        <p className={paragraphStyle}>
          当サービス運営者は、法令に基づく場合を除き、ユーザーの同意なく第三者に個人情報を提供することはありません。
        </p>

        <h3 className={h3Style}>データの保存・削除</h3>
        <p className={paragraphStyle}>
          ユーザーデータは適切にセキュリティ対策を施したデータベースに保存されます。
          アカウント削除時には、関連するデータも削除されます。
        </p>

        <h3 className={h3Style}>お問い合わせ</h3>
        <p className={paragraphStyle}>
          本規約およびプライバシーポリシーに関するご質問は、本サービス内のお問い合わせ機能またはGitHubリポジトリのIssueにてお寄せください。
        </p>
      </section>

      <p className="text-sm text-gray-500 border-t pt-4">
        制定日：2025年8月28日
        <br />
        最終更新：2025年8月28日
      </p>
    </div>
  )
}
