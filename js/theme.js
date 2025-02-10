// **初始化主题**
function initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
    
    // **确保 Giscus 主题正确**
    syncGiscusTheme(theme);
}

// **切换主题**
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // **同步 Giscus 主题**
    syncGiscusTheme(newTheme);
}

// **更新主题切换按钮图标**
function updateThemeIcon(theme) {
    const themeSwitch = document.querySelector('.theme-switch i');
    if (!themeSwitch) return;
    
    if (theme === 'dark') {
        themeSwitch.classList.remove('fa-sun-o');
        themeSwitch.classList.add('fa-moon-o');
    } else {
        themeSwitch.classList.remove('fa-moon-o');
        themeSwitch.classList.add('fa-sun-o');
    }
}

// **同步 Giscus 主题**
function syncGiscusTheme(theme) {
    function updateGiscusTheme() {
        const giscusFrame = document.querySelector('iframe.giscus-frame');
        if (giscusFrame) {
            giscusFrame.contentWindow.postMessage(
                { giscus: { setConfig: { theme: theme === 'dark' ? 'dark' : 'light' } } },
                'https://giscus.app'
            );
        } else {
            // **如果找不到 Giscus，延迟 500ms 再尝试**
            setTimeout(updateGiscusTheme, 500);
        }
    }
    updateGiscusTheme();
}

// **页面加载完成后初始化**
document.addEventListener('DOMContentLoaded', initTheme);
