// 确保视频加载完成后播放
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('video');
    
    // 视频加载错误处理
    video.addEventListener('error', function(e) {
        console.error('视频加载失败:', e);
    });
    
    // 尝试播放视频
    video.play().catch(function(error) {
        console.log("视频自动播放失败:", error);
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