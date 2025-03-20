// 抽獎系統API路由 - 參與抽獎
const crypto = require('crypto');

// 模擬資料庫
let participants = [];

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
  
  // 參與抽獎活動
  if (req.method === 'POST') {
    const { userId, username, actions } = req.body;
    
    if (!userId || !username || !actions) {
      return res.status(400).json({
        success: false,
        message: '缺少必要參數'
      });
    }
    
    const participant = {
      id: userId,
      name: username,
      actions: actions,
      participationDate: new Date().toISOString()
    };
    
    // 檢查參與者是否符合參與條件
    const requiredActions = ['comment', 'like', 'share'];
    const isValid = requiredActions.every(action => actions.includes(action));
    
    if (isValid) {
      participants.push(participant);
      
      return res.status(200).json({
        success: true,
        message: '成功參與抽獎活動',
        participant
      });
    } else {
      return res.status(400).json({
        success: false,
        message: '參與條件不符合，請確保完成留言、按讚和分享'
      });
    }
  }
  
  // 獲取參與者列表
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      participants: participants,
      count: participants.length
    });
  }
  
  // 如果不是GET或POST請求，返回405
  return res.status(405).json({
    success: false,
    message: '不支援的請求方法'
  });
};
