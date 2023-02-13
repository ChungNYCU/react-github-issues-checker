import Image from 'next/image'

const About = () => {
    return (
        <section>
            <h3 className="text-center font-semibold mt-20 dark:text-blue-500">About</h3>

            <h4 className="text-center font-semibold mt-20 dark:text-blue-500">Dcard 2023 Frontend Intern Homework</h4>
            <p className="mt-10">強尼是一名工程師,他想要幫助開發團隊更有效地管理專案。團隊已⻑期使用 GitHub,但他們在使用 Issue 來追蹤進度上遇到困難。
                因此他決定串接 GitHub API 並使用 React.js 開發一個網頁來提供更有效的專案管理工具,希望熟悉前端的你能幫助他完成這個專案。</p>

            <h5 className="font-semibold mt-20 dark:text-blue-500">題目描述</h5>
            <p className="mt-5">串接 GitHub API,使用戶能夠「新增」、「更新」、「搜尋」Task,並能夠更新 Task 的狀態。 <span className='text-green-500 font-bold'>&#x2713;</span></p>

            <h5 className="font-semibold mt-20 dark:text-blue-500">基本要求</h5>
            <ul className="mt-5 list-disc">
                <li>使用 React.js 或基於此的框架,例如 Next.js <span className='text-green-500 font-bold'>&#x2713;</span></li>
                <li>不限制使用任何第三方 library <span className='text-green-500 font-bold'>&#x2713;</span></li>
                <li>請使用 Git 版本控制,並將程式碼上傳至 GitHub 上,作業完成後繳交連結即可 <span className='text-green-500 font-bold'>&#x2713;</span></li>
                <li>請在 README 內說明如何啟動專案與作業架構的設計</li>
            </ul>

            <h5 className="font-semibold mt-20 dark:text-blue-500">功能</h5>

            <h6 className="mt-5 font-semibold">GitHub Login <span className='text-green-500 font-bold'>&#x2713;</span></h6>
            <ul className="mt-1 list-disc">
                <li>請串接 GitHub OAuth,讓使用者有權限操作 GitHub API <span className='text-green-500 font-bold'>&#x2713;</span></li>
                <li>詳見 GitHub OAuth documentation <span className='text-green-500 font-bold'>&#x2713;</span></li>
                <li>注意:在登入時需要求正確的 scope <span className='text-green-500 font-bold'>&#x2713;</span></li>
            </ul>

            <h6 className="mt-5 font-semibold">Task Management <span className='text-green-500 font-bold'>&#x2713;</span></h6>
            <ul className="mt-1 list-disc">
                <li>請將 GitHub Issue 作為 Task,以 GitHub Issue 實作, 並將 close Issue 視為刪除 Task <span className='text-green-500 font-bold'>&#x2713;</span></li>
                <li>你可能會需要 GitHub Issue documentation 或 GitHub GraphQL API Explorer <span className='text-green-500 font-bold'>&#x2713;</span></li>
            </ul>

            <h6 className="mt-5 font-semibold">Task Search <span className='text-green-500 font-bold'>&#x2713;</span></h6>
            <ul className="mt-1 list-disc">
                <li>使用 GitHub Search API 搜尋 <span className='text-green-500 font-bold'>&#x2713;</span></li>
                <li>你可能會需要 GitHub Search documentation 或 GitHub GraphQL API Explorer <span className='text-green-500 font-bold'>&#x2713;</span></li>
            </ul>

            <h6 className="mt-10 font-semibold">User Interface <span className='text-green-500 font-bold'>&#x2713;</span></h6>

            <p className="mt-3 font-semibold">列表頁 <span className='text-green-500 font-bold'>&#x2713;</span></p>
            <ul className="mt-1 list-disc">
                <li>第一次只能載入 10 筆 <span className='text-green-500 font-bold'>&#x2713;</span></li>
                <li>每當列表滾到底部時要需要自動發送 API 請求,並載入額外 10 筆,直到沒有更多 Task <span className='text-green-500 font-bold'>&#x2713;</span></li>
                <li>能夠根據 Task 的狀態 (Open / In Progress / Done) 進行篩選,預設顯示所有 Task <span className='text-green-500 font-bold'>&#x2713;</span></li>
                <li>能夠根據建立的時間進行排序,預設根據建立時間從新到舊 <span className='text-green-500 font-bold'>&#x2713;</span></li>
                <li>能夠根據 Task 的內容進行搜尋 <span className='text-green-500 font-bold'>&#x2713;</span></li>
            </ul>
            <p className="mt-3 font-semibold">Task 詳情頁 <span className='text-green-500 font-bold'>&#x2713;</span></p>
            <ul className="mt-1 list-disc">
                <li>顯示 Task 內容、狀態 <span className='text-green-500 font-bold'>&#x2713;</span></li>
                <li>使用者可以在此「編輯」、「刪除」<span className='text-green-500 font-bold'>&#x2713;</span></li>
            </ul>
            <p className="mt-3 font-semibold">新增 / 編輯 Task 時,可以使用 Modal 或 <span className='text-green-500 font-bold'>跳轉至新的頁面操作 &#x2713;</span></p>
            <ul className="mt-1 list-disc">
                <li>至少需要使用 title 和 body 兩個欄位 <span className='text-green-500 font-bold'>&#x2713;</span></li>
                <li>表單驗證:title 為必填,body 至少需要 30 字 <span className='text-green-500 font-bold'>&#x2713;</span></li>
            </ul>


            <h5 className="font-semibold mt-20 dark:text-blue-500">範例</h5>
            <Image className='mt-5' src={'/example.png'} alt={'example'} width="1491" height="924"></Image>

            <h5 className="font-semibold mt-20 dark:text-blue-500">加分條件</h5>
            <ul className="mt-5 list-disc">
                <li>使用 TypeScript <span className='text-green-500 font-bold'>&#x2713;</span></li>
                <li>未使用現成的 GitHub API client (如 Octokit) 串接 GitHub API <span className='text-green-500 font-bold'>&#x2713;</span></li>
                <li>有處理例外狀況 (Error Handling) <span className='text-green-500 font-bold'>&#x2713;</span></li>
                <li>有 deploy 至線上環境 <span className='text-green-500 font-bold'>&#x2713;</span></li>
            </ul>

            <h5 className="font-semibold mt-20 dark:text-blue-500">評分項目</h5>
            <ul className="mt-5 list-disc">
                <li>正確性:必須符合基本要求、能正常運作</li>
                <li>效能:例如避免重複發送 API 請求、避免 component re-render</li>
                <li>程式碼架構與品質:例如易讀性、一致性、重用性</li>
            </ul>

        </section>
    )
}

export default About