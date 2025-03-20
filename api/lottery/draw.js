// 抽獎系統API路由 - 執行抽獎
const crypto = require('crypto');

// 模擬資料庫
let participants = [];
let seedHash = '';

// 從seed.js獲取種子哈希值
try {
  const seedModule = require('./seed');
  if (seedModule.seedHash) {
    seedHash = seedModule.seedHash;
  }
} catch (error) {
  // 如果無法獲取，生成新的種子哈希值
  const seed = Date.now().toString() + Math.random().toString();
  seedHash = crypto.createHash('sha256').update(seed).digest('hex');
}

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
  
  // 執行抽獎
  if (req.method === 'POST') {
    // 嘗試從participate.js獲取參與者列表
    try {
      const participateModule = require('./participate');
      if (participateModule.participants && participateModule.participants.length > 0) {
        participants = participateModule.participants;
      }
    } catch (error) {
      // 如果無法獲取，使用模擬數據
      if (participants.length === 0) {
        participants = [
          { id: '1', name: '陳小明', actions: ['comment', 'like', 'share'], participationDate: '2025-03-15T08:30:00Z' },
          { id: '2', name: '林美玲', actions: ['comment', 'like', 'share'], participationDate: '2025-03-16T10:15:00Z' },
          { id: '3', name: '王大華', actions: ['comment', 'like', 'share'], participationDate: '2025-03-17T14:45:00Z' }
        ];
      }
    }
    
    const { winnerCount } = req.body || { winnerCount: 1 };
    
    if (participants.length === 0) {
      return res.status(400).json({
        success: false,
        message: '沒有符合條件的參與者'
      });
    }
    
    const count = parseInt(winnerCount) || 1;
    
    // 將參與者資料轉換為JSON字串
    const participantsData = JSON.stringify(participants);
    
    // 結合種子哈希值和參與者資料生成最終哈希值
    const combinedData = seedHash + participantsData;
    const finalHash = crypto.createHash('sha256').update(combinedData).digest('hex');
    
    // 選擇獲獎者
    const winners = [];
    const participantsCopy = [...participants];
    
    for (let i = 0; i < Math.min(count, participantsCopy.length); i++) {
      const hashPart = finalHash.substring(i * 8, (i + 1) * 8);
      const randomValue = parseInt(hashPart, 16);
      const winnerIndex = randomValue % participantsCopy.length;
      
      winners.push(participantsCopy[winnerIndex]);
      participantsCopy.splice(winnerIndex, 1);
    }
    
    const resultDetails = {
      seedHash: seedHash,
      participantsCount: participants.length,
      winners: winners,
      drawTime: new Date().toISOString(),
      verificationUrl: `/verify?seed=${seedHash}`
    };
    
    return res.status(200).json({
      success: true,
      message: '抽獎成功',
      resultDetails
    });
  }
  
  // 如果不是POST請求，返回405
  return res.status(405).json({
    success: false,
    message: '不支援的請求方法'
  });
};
