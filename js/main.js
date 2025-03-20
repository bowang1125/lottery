// 倒數計時器功能
function updateCountdown() {
    // 設定目標日期（每月最後一天）
    const now = new Date();
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    lastDayOfMonth.setHours(23, 59, 59, 999);
    
    // 計算剩餘時間
    const diff = lastDayOfMonth - now;
    
    // 如果已經過了本月，重設為下個月
    if (diff < 0) {
        lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
        diff = lastDayOfMonth - now;
    }
    
    // 計算天、時、分、秒
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // 更新DOM
    document.getElementById('countdown-days').innerText = days.toString().padStart(2, '0');
    document.getElementById('countdown-hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('countdown-minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('countdown-seconds').innerText = seconds.toString().padStart(2, '0');
}

// 每秒更新倒數計時
setInterval(updateCountdown, 1000);
updateCountdown(); // 初始化

// 卡片動畫效果
document.addEventListener('DOMContentLoaded', function() {
    // 滾動動畫
    const animateElements = document.querySelectorAll('.animate-fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(element);
    });
    
    // 社交互動按鈕
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 如果是讚按鈕
            if (this.innerHTML.includes('讚')) {
                const likeCount = parseInt(this.innerText.match(/\d+/)[0]);
                this.innerHTML = `<i class="fas fa-thumbs-up"></i> 讚 (${likeCount + 1})`;
                this.classList.add('text-primary');
            }
            
            // 如果是分享按鈕
            if (this.innerHTML.includes('分享')) {
                alert('感謝您的分享！');
            }
            
            // 如果是回覆按鈕
            if (this.innerHTML.includes('回覆')) {
                const commentItem = this.closest('.comment-item');
                const replyForm = document.createElement('div');
                replyForm.className = 'mt-3';
                replyForm.innerHTML = `
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" placeholder="回覆...">
                        <button class="btn btn-sm btn-primary">送出</button>
                    </div>
                `;
                
                // 檢查是否已經有回覆表單
                if (!commentItem.querySelector('.input-group')) {
                    commentItem.appendChild(replyForm);
                }
            }
        });
    });
});

// 哈希值驗證功能模擬
function generateHash() {
    const characters = 'abcdef0123456789';
    let hash = '';
    for (let i = 0; i < 64; i++) {
        hash += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return hash;
}

// 模擬抽獎功能
function simulateLottery() {
    // 這裡只是模擬，實際應用中應該使用更安全的方法
    const participants = [
        { id: 1, name: '陳小明', actions: ['comment', 'like', 'share'] },
        { id: 2, name: '林美玲', actions: ['comment', 'like'] },
        { id: 3, name: '王大華', actions: ['comment', 'share'] },
        // ... 更多參與者
    ];
    
    // 使用種子哈希值
    const seedHash = document.querySelector('.hash-code code').innerText.split(': ')[1];
    
    // 將參與者資料與種子哈希結合
    const combinedData = JSON.stringify(participants) + seedHash;
    
    // 生成最終哈希值（實際應用中應使用更安全的方法）
    const finalHash = generateHash();
    
    // 使用哈希值最後幾位數字決定獲獎者
    const winnerIndex = parseInt(finalHash.substring(60), 16) % participants.length;
    
    return participants[winnerIndex];
}

// 表單提交處理
document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.querySelector('.comment-form form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const textarea = this.querySelector('textarea');
            const commentText = textarea.value.trim();
            
            if (commentText) {
                // 創建新留言元素
                const newComment = document.createElement('div');
                newComment.className = 'comment-item';
                
                const now = new Date();
                const dateStr = `${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}`;
                
                newComment.innerHTML = `
                    <div class="comment-header">
                        <span class="comment-user">訪客用戶</span>
                        <span class="comment-date">${dateStr}</span>
                    </div>
                    <p>${commentText}</p>
                    <div class="social-actions">
                        <button class="social-btn"><i class="fas fa-thumbs-up"></i> 讚 (0)</button>
                        <button class="social-btn"><i class="fas fa-reply"></i> 回覆</button>
                        <button class="social-btn"><i class="fas fa-share"></i> 分享</button>
                    </div>
                `;
                
                // 添加到留言列表頂部
                const commentList = document.querySelector('.comment-list');
                commentList.insertBefore(newComment, commentList.querySelector('h4').nextSibling);
                
                // 清空輸入框
                textarea.value = '';
                
                // 添加社交按鈕事件監聽
                const socialBtns = newComment.querySelectorAll('.social-btn');
                socialBtns.forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // 如果是讚按鈕
                        if (this.innerHTML.includes('讚')) {
                            const likeCount = parseInt(this.innerText.match(/\d+/)[0]);
                            this.innerHTML = `<i class="fas fa-thumbs-up"></i> 讚 (${likeCount + 1})`;
                            this.classList.add('text-primary');
                        }
                        
                        // 如果是分享按鈕
                        if (this.innerHTML.includes('分享')) {
                            alert('感謝您的分享！');
                        }
                        
                        // 如果是回覆按鈕
                        if (this.innerHTML.includes('回覆')) {
                            const commentItem = this.closest('.comment-item');
                            const replyForm = document.createElement('div');
                            replyForm.className = 'mt-3';
                            replyForm.innerHTML = `
                                <div class="input-group">
                                    <input type="text" class="form-control form-control-sm" placeholder="回覆...">
                                    <button class="btn btn-sm btn-primary">送出</button>
                                </div>
                            `;
                            
                            // 檢查是否已經有回覆表單
                            if (!commentItem.querySelector('.input-group')) {
                                commentItem.appendChild(replyForm);
                            }
                        }
                    });
                });
            }
        });
    }
});
