#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 配置
const config = {
  srcDir: './src',
  excludePatterns: [
    'node_modules',
    'dist',
    'build',
    'i18n'
  ],
  fileExtensions: ['.tsx', '.ts', '.jsx', '.js'],
  outputDir: './public/static/i18n',
  chineseRegex: /[\u4e00-\u9fff]+/g
};

// 存储提取的字符串
const extractedStrings = new Set();
const existingTranslations = new Map();

// 递归扫描目录
function scanDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // 跳过排除的目录
      if (!config.excludePatterns.some(pattern => item.includes(pattern))) {
        scanDirectory(fullPath);
      }
    } else if (stat.isFile()) {
      // 检查文件扩展名
      if (config.fileExtensions.some(ext => fullPath.endsWith(ext))) {
        extractChineseStrings(fullPath);
      }
    }
  }
}

// 读取现有翻译文件
function loadExistingTranslations() {
  try {
    const zhCNPath = path.join(config.outputDir, 'zh-CN.js');
    
    if (fs.existsSync(zhCNPath)) {
      const content = fs.readFileSync(zhCNPath, 'utf8');
      // 简单的正则匹配现有翻译
      const matches = content.match(/\s+([\u4e00-\u9fff][^:]*?):\s*"([^"]*)"/g);
      if (matches) {
        matches.forEach(match => {
          const keyMatch = match.match(/\s+([\u4e00-\u9fff][^:]*?):\s*"([^"]*)"/); 
          if (keyMatch) {
            const key = keyMatch[1].trim();
            const value = keyMatch[2];
            existingTranslations.set(key, value);
          }
        });
      }
    }
  } catch (error) {
    console.log('读取现有翻译文件时出错:', error.message);
  }
}

// 提取文件中的中文字符串
function extractChineseStrings(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 匹配字符串字面量中的中文
    const stringRegex = /["'`]([^"'`]*[\u4e00-\u9fff][^"'`]*)["'`]/g;
    let match;
    
    while ((match = stringRegex.exec(content)) !== null) {
      const str = match[1].trim();
      
      // 跳过空字符串和过长的字符串
      if (str.length === 0 || str.length > 100) continue;
      
      // 跳过 t() 函数中的字符串
      const beforeMatch = content.substring(Math.max(0, match.index - 10), match.index);
      if (beforeMatch.includes('t(')) continue;
      
      // 跳过注释
      const lineStart = content.lastIndexOf('\n', match.index);
      const lineContent = content.substring(lineStart, match.index);
      if (lineContent.includes('//') || lineContent.includes('/*')) continue;
      
      // 只保留包含中文的字符串
      if (config.chineseRegex.test(str)) {
        extractedStrings.add(str);
      }
    }
  } catch (error) {
    console.log(`处理文件 ${filePath} 时出错:`, error.message);
  }
}

// 生成翻译文件内容
function generateTranslationContent(translations, isEnglish = false) {
  const entries = Object.entries(translations)
    .map(([key, value]) => {
      const safeKey = key.replace(/"/g, '\\"');
      const safeValue = isEnglish ? `[TODO: ${value}]` : value;
      return `  ${safeKey}: "${safeValue.replace(/"/g, '\\"')}",`;
    })
    .join('\n');
  
  const lang = isEnglish ? 'en-US' : 'zh-CN';
  return `window["${lang}"] = {\n${entries}\n};`;
}

// 写入翻译文件
function writeTranslationFiles() {
  // 确保输出目录存在
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }
  
  const allTranslations = {};
  
  // 添加现有翻译
  existingTranslations.forEach((value, key) => {
    allTranslations[key] = value;
  });
  
  // 添加新发现的字符串
  const newStrings = [];
  extractedStrings.forEach(str => {
    if (!existingTranslations.has(str)) {
      newStrings.push(str);
      allTranslations[str] = str; // 中文保持原样
    }
  });
  
  // 写入中文翻译文件
  const zhContent = generateTranslationContent(allTranslations, false);
  fs.writeFileSync(path.join(config.outputDir, 'zh-CN.js'), zhContent, 'utf8');
  
  // 写入英文翻译文件
  const enContent = generateTranslationContent(allTranslations, true);
  fs.writeFileSync(path.join(config.outputDir, 'en-US.js'), enContent, 'utf8');
  
  return { newStrings, total: Object.keys(allTranslations).length };
}

// 生成使用说明
function generateUsageGuide(newStrings) {
  const guide = `# i18n 使用指南

## 新发现的字符串 (${newStrings.length} 条)

${newStrings.map((str, index) => `${index + 1}. "${str}"`).join('\n')}

## 使用步骤

1. 在组件中导入 useTranslation:
   \`\`\`javascript
   import { useTranslation } from 'react-i18next';
   \`\`\`

2. 在组件中使用 t 函数:
   \`\`\`javascript
   const { t } = useTranslation();
   \`\`\`

3. 替换硬编码字符串:
   \`\`\`javascript
   // 替换前
   <div>用户中心</div>
   
   // 替换后
   <div>{t('用户中心')}</div>
   \`\`\`

## 翻译文件位置

- 中文: public/static/i18n/zh-CN.js
- 英文: public/static/i18n/en-US.js (需要手动翻译 [TODO:] 标记的内容)

## 注意事项

- 翻译键使用中文原文
- 英文翻译文件中的 [TODO:] 标记需要手动替换为英文翻译
- 修改翻译文件后需要重新加载页面
`;
  
  fs.writeFileSync('./i18n-guide.md', guide, 'utf8');
}

// 主函数
function main() {
  console.log('🚀 开始扫描项目中的中文字符串...');
  
  loadExistingTranslations();
  
  if (fs.existsSync(config.srcDir)) {
    scanDirectory(config.srcDir);
  } else {
    console.log('❌ 源代码目录不存在:', config.srcDir);
    return;
  }
  
  const { newStrings, total } = writeTranslationFiles();
  generateUsageGuide(newStrings);
  
  console.log('\n✅ 扫描完成！');
  console.log(`📊 统计信息:`);
  console.log(`   - 现有翻译: ${existingTranslations.size} 条`);
  console.log(`   - 新发现: ${newStrings.length} 条`);
  console.log(`   - 总计: ${total} 条`);
  
  if (newStrings.length > 0) {
    console.log('\n🆕 新发现的字符串:');
    newStrings.slice(0, 10).forEach((str, index) => {
      console.log(`   ${index + 1}. ${str}`);
    });
    if (newStrings.length > 10) {
      console.log(`   ... 还有 ${newStrings.length - 10} 条`);
    }
  }
  
  console.log('\n📁 文件已生成:');
  console.log('   - public/static/i18n/zh-CN.js (中文翻译)');
  console.log('   - public/static/i18n/en-US.js (英文翻译，需要手动完善)');
  console.log('   - i18n-guide.md (使用指南)');
  
  console.log('\n📖 下一步:');
  console.log('   1. 查看 i18n-guide.md 了解使用方法');
  console.log('   2. 手动替换代码中的硬编码字符串为 t() 函数');
  console.log('   3. 完善英文翻译文件中的 [TODO:] 标记');
}

if (require.main === module) {
  main();
}

module.exports = { main, extractChineseStrings };