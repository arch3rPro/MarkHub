// 获取用户首选语言
function getUserLanguage() {
  // 优先使用用户设置的语言
  const savedLang = localStorage.getItem('language');
  if (savedLang) {
    return savedLang;
  }
  return chrome.i18n.getUILanguage();
}

// 使用 Chrome 的 i18n API 获取本地化消息
window.getLocalizedMessage = function(messageName, substitutions) {
  // 使用 Chrome 内置的 i18n API
  let message = chrome.i18n.getMessage(messageName, substitutions);
  
  // 如果没有找到消息，返回消息名称（用于调试）
  if (!message) {
    console.warn(`No localized message found for: ${messageName}`);
    return messageName;
  }
  
  return message;
};

window.updateUILanguage = function() {
  // 处理常规的 data-i18n 属性
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const messageName = element.getAttribute('data-i18n');
    const localizedMessage = window.getLocalizedMessage(messageName);
    element.textContent = localizedMessage;
  });

  // 处理 placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const messageName = element.getAttribute('data-i18n-placeholder');
    element.placeholder = window.getLocalizedMessage(messageName);
  });

  // 处理 title
  document.querySelectorAll('[data-i18n-title]').forEach((element) => {
    const messageName = element.getAttribute('data-i18n-title');
    element.title = window.getLocalizedMessage(messageName);
  });
};

// 在文档加载完成后自动更新 UI 语言
document.addEventListener('DOMContentLoaded', () => {
  window.updateUILanguage();
});
