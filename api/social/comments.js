// 社交互動API路由 - 留言功能
// 模擬資料庫
let comments = [
  {
    commentId: 'c1',
    userId: '4',
    username: '張小芳',
    lotteryId: 'march2025',
    content: '上個月參加了抽獎活動，雖然沒中獎，但整個過程很有趣！這個月繼續支持！',
    date: '2025-03-18T09:15:00Z',
    likes: ['1', '2', '3', '5'],
    replies: [
      {
        replyId: 'r1',
        userId: '1',
        username: '陳小明',
        content: '我也是！希望這次能中獎！',
        date: '2025-03-18T10:30:00Z',
        likes: ['4', '5']
      }
    ]
  },
  {
    commentId: 'c2',
    userId: '5',
    username: '李志明',
    lotteryId: 'march2025',
    content: '哈希值抽獎真的很公平，可以自己驗證結果，希望這次能中到那個智能手錶！',
    date: '2025-03-17T16:05:00Z',
    likes: ['1', '3', '4'],
    replies: []
  }
];

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
  
  // 獲取留言列表
  if (req.method === 'GET') {
    const { lotteryId, sort, limit } = req.query || {};
    
    let filteredComments = comments;
    
    // 如果指定了抽獎活動ID，則過濾相關留言
    if (lotteryId) {
      filteredComments = comments.filter(comment => comment.lotteryId === lotteryId);
    }
    
    // 排序
    if (sort === 'latest') {
      filteredComments.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === 'likes') {
      filteredComments.sort((a, b) => b.likes.length - a.likes.length);
    } else if (sort === 'replies') {
      filteredComments.sort((a, b) => b.replies.length - a.replies.length);
    }
    
    // 限制數量
    if (limit) {
      filteredComments = filteredComments.slice(0, parseInt(limit));
    }
    
    return res.status(200).json({
      success: true,
      comments: filteredComments,
      count: filteredComments.length
    });
  }
  
  // 發表留言
  if (req.method === 'POST') {
    const { userId, username, lotteryId, content } = req.body || {};
    
    if (!userId || !username || !lotteryId || !content) {
      return res.status(400).json({
        success: false,
        message: '缺少必要參數'
      });
    }
    
    const newComment = {
      commentId: 'c' + Math.random().toString(36).substring(2, 8),
      userId,
      username,
      lotteryId,
      content,
      date: new Date().toISOString(),
      likes: [],
      replies: []
    };
    
    comments.push(newComment);
    
    return res.status(200).json({
      success: true,
      message: '留言發表成功',
      comment: newComment
    });
  }
  
  // 如果不是GET或POST請求，返回405
  return res.status(405).json({
    success: false,
    message: '不支援的請求方法'
  });
};
