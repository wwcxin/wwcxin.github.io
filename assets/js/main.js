// 确保视频加载完成后播放
document.addEventListener('DOMContentLoaded', function() {
    // 获取网站图标元素
    const favicon = document.querySelector('link[rel="icon"]');
    
    // 设置图标URL
    function setFavicon(isVisible) {
        favicon.href = isVisible
            ? "https://webcnstatic.yostar.net/ba_cn_web/prod/web/assets/avatar4.8656c817.png"
            : "https://webcnstatic.yostar.net/ba_cn_web/prod/web/assets/avatar3.c9d108f1.png";
    }
    
    // 监听页面可见性变化
    document.addEventListener('visibilitychange', () => {
        setFavicon(!document.hidden);
    });
    
    // 初始设置图标
    setFavicon(!document.hidden);
    
    // 移动端视频加载优化
    const video = document.querySelector('video');
    const videoBackground = document.querySelector('.video-background');
    
    // 检查是否为移动端且屏幕高度大于宽度
    function shouldLoadVideo() {
        const isMobile = window.innerWidth <= 768;
        const isPortrait = window.innerHeight > window.innerWidth;
        return !isMobile || (isMobile && isPortrait);
    }
    
    // 如果不需要加载视频，隐藏视频背景
    if (!shouldLoadVideo()) {
        if (videoBackground) {
            videoBackground.style.display = 'none';
        }
        if (video) {
            video.pause();
            video.src = '';
        }
    } else {
        // 视频加载错误处理
        if (video) {
            video.addEventListener('error', function(e) {
                console.error('视频加载失败:', e);
            });
            
            // 尝试播放视频
            video.play().catch(function(error) {
                console.log("视频自动播放失败:", error);
            });
        }
    }
    
    // 监听屏幕方向变化
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            if (shouldLoadVideo()) {
                if (videoBackground) {
                    videoBackground.style.display = 'block';
                }
                if (video && video.src) {
                    video.play().catch(function(error) {
                        console.log("视频自动播放失败:", error);
                    });
                }
            } else {
                if (videoBackground) {
                    videoBackground.style.display = 'none';
                }
                if (video) {
                    video.pause();
                }
            }
        }, 100);
    });

    // 随机图片数组
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

    // 设置随机图片
    const randomImage = document.getElementById('randomImage');
    randomImage.src = images[Math.floor(Math.random() * images.length)];

    // 主题切换相关
    const themeButtons = document.querySelectorAll('.theme-btn');
    const html = document.documentElement;
    
    // 获取系统主题偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 设置主题
    function setTheme(theme, isSystem = false) {
        // 如果是系统主题，激活system按钮
        if (isSystem) {
            html.setAttribute('data-theme', theme);
            themeButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.classList.contains('system-btn')) {
                    btn.classList.add('active');
                }
            });
            localStorage.setItem('theme', 'system');
        } else {
            html.setAttribute('data-theme', theme);
            themeButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.classList.contains(`${theme}-btn`)) {
                    btn.classList.add('active');
                }
            });
            localStorage.setItem('theme', theme);
        }
    }
    
    // 初始化主题
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'system') {
        setTheme(prefersDark.matches ? 'dark' : 'light', true);
    } else {
        setTheme(savedTheme);
    }
    
    // 监听按钮点击
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('system-btn')) {
                setTheme(prefersDark.matches ? 'dark' : 'light', true);
            } else {
                const theme = btn.classList.contains('light-btn') ? 'light' : 'dark';
                setTheme(theme);
            }
        });
    });
    
    // 监听系统主题变化
    prefersDark.addEventListener('change', (e) => {
        if (localStorage.getItem('theme') === 'system') {
            setTheme(e.matches ? 'dark' : 'light', true);
        }
    });

    // 添加移动端视口高度处理函数
    function handleMobileViewport() {
        // 添加视口高度处理
        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        // 初始设置
        setVH();

        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            setVH();
        });

        // 监听设备方向变化
        window.addEventListener('orientationchange', () => {
            setVH();
        });
    }

    // 在文档加载完成后执行
    handleMobileViewport();
});