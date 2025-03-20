// API客戶端文件 - 連接前端與Vercel API
class ApiClient {
  constructor() {
    // 在本地開發環境使用localhost，在Vercel環境使用相對路徑
    this.baseUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:3000/api'
      : '/api';
  }

  // 通用請求方法
  async request(endpoint, method = 'GET', data = null) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || '請求失敗');
      }
      
      return result;
    } catch (error) {
      console.error('API請求錯誤:', error);
      throw error;
    }
  }

  // 抽獎系統API
  async getSeedHash() {
    return this.request('/lottery/seed');
  }

  async participateLottery(userData) {
    return this.request('/lottery/participate', 'POST', userData);
  }

  async drawLottery(winnerCount = 1) {
    return this.request('/lottery/draw', 'POST', { winnerCount });
  }

  // 社交互動API
  async getComments(lotteryId, sort = 'latest', limit = 10) {
    return this.request(`/social/comments?lotteryId=${lotteryId}&sort=${sort}&limit=${limit}`);
  }

  async postComment(commentData) {
    return this.request('/social/comments', 'POST', commentData);
  }

  async likeLottery(lotteryId, userId) {
    return this.request(`/social/like?lotteryId=${lotteryId}`, 'POST', { userId });
  }

  async shareLottery(lotteryId, userId, platform) {
    return this.request(`/social/share?lotteryId=${lotteryId}`, 'POST', { userId, platform });
  }

  // 測試API連接
  async testConnection() {
    try {
      const result = await this.getSeedHash();
      return {
        message: 'API 正常運行',
        timestamp: new Date().toISOString(),
        seedHash: result.seedHash
      };
    } catch (error) {
      throw new Error('API連接失敗');
    }
  }
}

// 創建全局API客戶端實例
const api = new ApiClient();

// 頁面載入時測試API連接
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 嘗試連接API
    const result = await api.testConnection();
    console.log('API連接成功:', result);
    
    // 更新UI顯示API狀態
    const apiStatusElement = document.getElementById('api-status');
    if (apiStatusElement) {
      apiStatusElement.textContent = '已連接';
      apiStatusElement.classList.add('connected');
    }
  } catch (error) {
    console.error('API連接失敗:', error);
    
    // 更新UI顯示API狀態
    const apiStatusElement = document.getElementById('api-status');
    if (apiStatusElement) {
      apiStatusElement.textContent = '未連接';
      apiStatusElement.classList.add('disconnected');
    }
  }
});
