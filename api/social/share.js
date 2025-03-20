// 社交互動API路由 - 分享功能
// 模擬資料庫
let shares = [];

// API處理函數
module.exports = (req, res) => {
  // 設置CORS頭
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 處理OPTIONS請求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // 分享
  if (req.method === 'POST') {
    const { userId, platform } = req.body || {};
    const lotteryId = req.query.lotteryId || '';
    
    if (!userId || !platform || !lotteryId) {
      return res.status(400).json({
        success: false,
        message: '缺少必要參數'
      });
    }
    
    const newShare = {
      shareId: 's' + Math.random().toString(36).substring(2, 8),
      userId,
      lotteryId,
      platform,
      date: new Date().toISOString(),
      shareUrl: `https://luckydraw.com/lottery?id=${lotteryId}&ref=${userId}&platform=${platform}`
    };
    
    shares.push(newShare);
    
    return res.status(200).json({
      success: true,
      message: '分享成功',
      share: newShare
    });
  }
  
  // 獲取分享列表
  if (req.method === 'GET') {
    const lotteryId = req.query.lotteryId || '';
    
    let filteredShares = shares;
    
    if (lotteryId) {
      filteredShares = shares.filter(share => share.lotteryId === lotteryId);
    }
    
    return res.status(200).json({
      success: true,
      shares: filteredShares,
      count: filteredShares.length
    });
  }
  
  // 如果不是GET或POST請求，返回405
  return res.status(405).json({
    success: false,
    message: '不支援的請求方法'
  });
};
