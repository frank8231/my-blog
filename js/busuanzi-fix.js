/**
 * 自定义不蒜子统计脚本 - 修复版
 * 用于解决所有页面共享同一个访问量计数器的问题
 * 通过为每个页面生成唯一ID来确保访问量统计的独立性
 */

(function() {
    // 获取当前页面路径作为唯一标识
    var pagePathname = window.location.pathname;
    // 修正路径末尾的斜杠，确保一致性
    if (pagePathname.endsWith('/')) {
        pagePathname = pagePathname.slice(0, -1);
    }
    
    // 创建唯一的页面ID
    var pageId = encodeURIComponent(pagePathname);
    
    // 创建脚本元素
    var script = document.createElement('script');
    script.async = true;
    
    // 添加页面唯一ID参数到不蒜子脚本URL
    script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js?page=' + pageId;
    
    // 将脚本添加到文档中
    document.head.appendChild(script);
    
    // 调试信息
    console.log('不蒜子统计已初始化，页面ID:', pageId);
})();