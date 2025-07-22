// 联系页面专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 随机背景图片数组
    const images = [
        "https://webcnstatic.yostar.net/ba_cn_web/prod/upload/wallpaper/7ft_I1QQ.jpeg",
        "https://webcnstatic.yostar.net/ba_cn_web/prod/upload/wallpaper/N_aE3k_1.jpeg",
        "https://webcnstatic.yostar.net/ba_cn_web/prod/upload/wallpaper/2z7XTYS8.jpeg",
        "https://webcnstatic.yostar.net/ba_cn_web/prod/upload/wallpaper/RzxI-Axa.jpeg",
        "https://webcnstatic.yostar.net/ba_cn_web/prod/upload/wallpaper/QuYg1g4-.jpeg",
        "https://webcnstatic.yostar.net/ba_cn_web/prod/upload/wallpaper/MefDndfh.jpeg",
        "https://webcnstatic.yostar.net/ba_cn_web/prod/upload/wallpaper/8LWhoodw.jpeg",
        "https://webcnstatic.yostar.net/ba_cn_web/prod/upload/wallpaper/5C_FYyko.jpeg"
    ];

    // 设置随机背景图片（移动端）
    function setRandomBackground() {
        if (window.innerWidth <= 768) {
            const randomImage = images[Math.floor(Math.random() * images.length)];
            document.body.style.backgroundImage = `url('${randomImage}')`;
        }
    }

    // 初始化背景
    setRandomBackground();

    // 监听窗口大小变化
    window.addEventListener('resize', setRandomBackground);

    // 联系方式按钮点击效果
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 添加点击动画效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 如果是电话链接，在移动端直接拨号，在桌面端显示提示
            if (this.classList.contains('phone-btn')) {
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                
                if (!isMobile) {
                    e.preventDefault();
                    showNotification('请在移动设备上点击拨打电话，或复制电话号码：17623681084');
                }
            }
        });
        
        // 添加键盘导航支持
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // 显示通知函数
    function showNotification(message) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            font-size: 14px;
            max-width: 300px;
            word-wrap: break-word;
            animation: slideIn 0.3s ease;
        `;
        
        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // 3秒后自动移除
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // 复制功能（用于桌面端复制电话号码）
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('已复制到剪贴板');
            }).catch(() => {
                fallbackCopyToClipboard(text);
            });
        } else {
            fallbackCopyToClipboard(text);
        }
    }

    function fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification('已复制到剪贴板');
        } catch (err) {
            showNotification('复制失败，请手动复制');
        }
        
        document.body.removeChild(textArea);
    }

    // 为电话号码按钮添加右键菜单（复制功能）
    const phoneBtn = document.querySelector('.phone-btn');
    if (phoneBtn) {
        phoneBtn.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            copyToClipboard('17623681084');
        });
    }
}); 