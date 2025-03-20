// 社交互動API路由 - 按讚功能
// 模擬資料庫
let likes = [];

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
  
  // 按讚
  if (req.method === 'POST') {
    const { userId } = req.body || {};
    const lotteryId = req.query.lotteryId || '';
    
    if (!userId || !lotteryId) {
      return res.status(400).json({
        success: false,
        message: '缺少必要參數'
      });
    }
    
    // 檢查是否已經按讚
    const existingLike = likes.find(like => 
      like.userId === userId && 
      like.targetType === 'lottery' && 
      like.targetId === lotteryId
    );
    
    if (existingLike) {
      return res.status(400).json({
        success: false,
        message: '已經按讚過此抽獎活動'
      });
    }
    
    // 記錄按讚行為
    const newLike = {
      userId,
      targetType: 'lottery',
      targetId: lotteryId,
      date: new Date().toISOString()
    };
    
    likes.push(newLike);
    
    return res.status(200).json({
      success: true,
      message: '按讚成功',
      like: newLike
    });
  }
  
  // 獲取按讚列表
  if (req.method === 'GET') {
    const lotteryId = req.query.lotteryId || '';
    
    let filteredLikes = likes;
    
    if (lotteryId) {
      filteredLikes = likes.filter(like => 
        like.targetType === 'lottery' && like.targetId === lotteryId
      );
    }
    
    return res.status(200).json({
      success: true,
      likes: filteredLikes,
      count: filteredLikes.length
    });
  }
  
  // 如果不是GET或POST請求，返回405
  return res.status(405).json({
    success: false,
    message: '不支援的請求方法'
  });
};
