# Vercel 部署指南

## 使用 Vercel 部署抽獎網站

這個版本專門為 Vercel 平台優化，包含完整的前端和後端功能。Vercel 對 Node.js 應用和 API 路由有更好的原生支持，能夠解決之前在 Netlify 上遇到的問題。

### 部署步驟

1. **準備工作**
   - 解壓下載的 `lottery-website-vercel.zip` 文件
   - 確保您已經註冊了 [Vercel 帳號](https://vercel.com/signup)

2. **使用 Vercel CLI 部署（推薦方法）**
   - 安裝 Vercel CLI：`npm install -g vercel`
   - 在終端機中導航到解壓後的文件夾
   - 執行 `vercel login` 登入您的 Vercel 帳號
   - 執行 `vercel` 開始部署流程
   - 按照提示操作，選擇您的團隊並確認設置
   - 部署完成後，Vercel 會提供一個預覽 URL
   - 確認一切正常後，執行 `vercel --prod` 進行正式部署

3. **使用 Vercel 網站部署**
   - 前往 [Vercel 儀表板](https://vercel.com/dashboard)
   - 點擊 "New Project"
   - 選擇 "Import Git Repository" 或 "Upload"
   - 如果選擇上傳，將解壓後的文件夾拖放到上傳區域
   - 在項目設置中，確保：
     - Framework Preset: Other
     - Build Command: 留空
     - Output Directory: 留空
   - 點擊 "Deploy" 開始部署

### 驗證部署

部署完成後，您應該能夠訪問以下功能：

1. **前端頁面**
   - 首頁：`https://your-project-name.vercel.app/`
   - 贊助商頁面：`https://your-project-name.vercel.app/sponsors.html`
   - 抽獎頁面：`https://your-project-name.vercel.app/lottery.html`

2. **API 端點**
   - 種子哈希值：`https://your-project-name.vercel.app/api/lottery/seed`
   - 參與抽獎：`https://your-project-name.vercel.app/api/lottery/participate`
   - 執行抽獎：`https://your-project-name.vercel.app/api/lottery/draw`
   - 留言功能：`https://your-project-name.vercel.app/api/social/comments`
   - 按讚功能：`https://your-project-name.vercel.app/api/social/like`
   - 分享功能：`https://your-project-name.vercel.app/api/social/share`

### 自訂域名設置

1. 在 Vercel 儀表板中，前往您的項目
2. 點擊 "Settings" > "Domains"
3. 輸入您擁有的域名
4. 按照 Vercel 提供的 DNS 設置指示進行操作

### 常見問題解決

1. **API 連接問題**
   - 確認 API 路徑是否正確
   - 檢查瀏覽器控制台是否有 CORS 相關錯誤
   - 確保 `api-client.js` 中的 `baseUrl` 設置正確

2. **部署失敗**
   - 檢查 Vercel 部署日誌中的錯誤訊息
   - 確認 `vercel.json` 配置正確
   - 確保所有文件路徑正確

3. **頁面載入問題**
   - 確認 HTML 文件中的資源路徑是相對路徑
   - 檢查 CSS 和 JavaScript 文件是否正確載入

### 更新網站

要更新已部署的網站：

1. **使用 Vercel CLI**
   - 修改本地文件
   - 執行 `vercel` 進行預覽部署
   - 確認無誤後執行 `vercel --prod` 進行正式部署

2. **使用 Vercel 網站**
   - 修改本地文件
   - 重新打包
   - 在 Vercel 儀表板中，點擊 "Deployments" > "New Deployment"
   - 上傳新文件

### 資源與支援

- [Vercel 文檔](https://vercel.com/docs)
- [Vercel API 路由指南](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Vercel CLI 指南](https://vercel.com/docs/cli)
- [Vercel 社區論壇](https://github.com/vercel/vercel/discussions)
