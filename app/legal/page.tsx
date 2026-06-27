import Link from 'next/link'

export default function Legal() {
  const pageStyle = 'min-h-screen bg-[#F9F6F1]'
  const containerStyle = 'max-w-2xl mx-auto px-6 py-12 flex flex-col gap-10'

  const backLinkStyle =
    'inline-flex items-center gap-1.5 text-sm font-medium text-[#57534E] hover:text-[#1C1917] transition-colors w-fit'

  const titleStyle = 'text-2xl font-medium text-[#1C1917] tracking-tight'

  const cardStyle = 'bg-white border border-[#1C19170F] rounded-2xl p-6 sm:p-8 flex flex-col gap-8'

  const sectionHeadingStyle = 'text-base font-medium text-[#1C1917] flex items-center gap-2'

  const articleStyle = 'flex flex-col gap-2'
  const articleTitleStyle = 'text-sm font-medium text-[#57534E] tracking-wide'
  const paragraphStyle = 'text-sm text-[#57534E] leading-relaxed [overflow-wrap:anywhere]'

  const listStyle = 'flex flex-col gap-1.5'
  const listItemStyle = 'flex items-start gap-2 text-sm text-[#57534E] leading-relaxed [overflow-wrap:anywhere]'
  const bulletStyle = 'mt-[7px] w-1 h-1 rounded-full bg-[#A8A29E] flex-shrink-0'

  const dividerStyle = 'h-px bg-[#1C19170F]'

  return (
    <div className={pageStyle}>
      <div className={containerStyle}>
        <div className="flex flex-col gap-5">
          <Link href="/" className={backLinkStyle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l7 7m-7-7l7-7" />
            </svg>
            ホームに戻る
          </Link>
          <h1 className={titleStyle}>利用規約・プライバシーポリシー</h1>
        </div>

        <div className={cardStyle}>
          {/* 利用規約 */}
          <div className="flex flex-col gap-6">
            <h2 className={sectionHeadingStyle}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C42]" />
              利用規約
            </h2>

            <p className={paragraphStyle}>
              本利用規約（以下「本規約」）は、当サービス（以下「本サービス」）の利用条件を定めるものです。
              本サービスをご利用いただく際には、本規約にご同意いただいたものとみなします。
            </p>

            <div className={articleStyle}>
              <h3 className={articleTitleStyle}>第1条（適用）</h3>
              <p className={paragraphStyle}>
                本規約は、ユーザーと当サービス運営者との間の本サービスの利用に関わる一切の関係に適用されます。
              </p>
            </div>

            <div className={articleStyle}>
              <h3 className={articleTitleStyle}>第2条（利用登録）</h3>
              <p className={paragraphStyle}>
                本サービスでは、外部認証サービス（Google、GitHub等）を通じてアカウント登録を行います。
                これらのサービスの利用規約にも従っていただく必要があります。
              </p>
            </div>

            <div className={articleStyle}>
              <h3 className={articleTitleStyle}>第3条（禁止事項）</h3>
              <p className={paragraphStyle}>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
              <ul className={listStyle}>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  法令または公序良俗に違反する行為
                </li>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  犯罪行為に関連する行為
                </li>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  本サービスの運営を妨害する行為
                </li>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  他のユーザーまたは第三者の知的財産権を侵害する行為
                </li>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  他のユーザーまたは第三者の名誉、信用、プライバシー等を侵害する行為
                </li>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  本サービスに過度な負荷をかける行為
                </li>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  その他、当サービス運営者が不適切と判断する行為
                </li>
              </ul>
            </div>

            <div className={articleStyle}>
              <h3 className={articleTitleStyle}>第4条（本サービスの停止等）</h3>
              <p className={paragraphStyle}>
                当サービス運営者は、以下の場合には、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができます。
              </p>
              <ul className={listStyle}>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
                </li>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
                </li>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  コンピュータまたは通信回線等が事故により停止した場合
                </li>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  その他、当サービス運営者が本サービスの提供が困難と判断した場合
                </li>
              </ul>
            </div>

            <div className={articleStyle}>
              <h3 className={articleTitleStyle}>第5条（免責事項）</h3>
              <p className={paragraphStyle}>
                当サービス運営者は、本サービスに関して、明示または黙示を問わず、完全性、正確性、確実性、有用性等についていかなる保証も行いません。
                本サービスの利用により生じた損害について、当サービス運営者は一切の責任を負いません。
              </p>
            </div>

            <div className={articleStyle}>
              <h3 className={articleTitleStyle}>第6条（準拠法・裁判管轄）</h3>
              <p className={paragraphStyle}>
                本規約の解釈にあたっては、日本法を準拠法とします。
                本サービスに関して紛争が生じた場合、当サービス運営者の所在地を管轄する裁判所を専属的合意管轄とします。
              </p>
            </div>
          </div>

          <div className={dividerStyle} />

          {/* プライバシーポリシー */}
          <div className="flex flex-col gap-6">
            <h2 className={sectionHeadingStyle}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3AAFCC]" />
              プライバシーポリシー
            </h2>

            <div className={articleStyle}>
              <h3 className={articleTitleStyle}>収集する情報</h3>
              <p className={paragraphStyle}>本サービスでは、以下の情報を収集します：</p>
              <ul className={listStyle}>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  外部認証サービス（Google、GitHub等）から提供される基本的なプロフィール情報（氏名、メールアドレス、プロフィール画像等）
                </li>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  サービス利用時に入力される旅行データ（行き先、日程、写真等）
                </li>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  アクセスログ、クッキー等の技術的情報
                </li>
              </ul>
            </div>

            <div className={articleStyle}>
              <h3 className={articleTitleStyle}>利用目的</h3>
              <p className={paragraphStyle}>収集した情報は以下の目的で利用します：</p>
              <ul className={listStyle}>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  本サービスの提供・運営
                </li>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  ユーザー認証・本人確認
                </li>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  サービスの改善・開発
                </li>
                <li className={listItemStyle}>
                  <span className={bulletStyle} />
                  技術的な問題の解決
                </li>
              </ul>
            </div>

            <div className={articleStyle}>
              <h3 className={articleTitleStyle}>情報の共有・開示</h3>
              <p className={paragraphStyle}>
                当サービス運営者は、法令に基づく場合を除き、ユーザーの同意なく第三者に個人情報を提供することはありません。
              </p>
            </div>

            <div className={articleStyle}>
              <h3 className={articleTitleStyle}>データの保存・削除</h3>
              <p className={paragraphStyle}>
                ユーザーデータは適切にセキュリティ対策を施したデータベースに保存されます。
                アカウント削除時には、関連するデータも削除されます。
              </p>
            </div>

            <div className={articleStyle}>
              <h3 className={articleTitleStyle}>お問い合わせ</h3>
              <p className={paragraphStyle}>
                本規約およびプライバシーポリシーに関するご質問は、
                <Link
                  href="https://github.com/sjbworks/ryotei-share"
                  className="text-[#1A7A93] hover:text-[#3AAFCC] underline underline-offset-2 transition-colors"
                >
                  GitHubリポジトリ
                </Link>
                のIssueにてお寄せください。
              </p>
            </div>
          </div>

          <div className={dividerStyle} />

          <p className="text-xs text-[#A8A29E] leading-relaxed">
            制定日：2025年8月28日
            <br />
            最終更新：2025年11月2日
          </p>
        </div>
      </div>
    </div>
  )
}
