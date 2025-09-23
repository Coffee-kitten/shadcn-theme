module.exports = {
  input: [
    'src/**/*.{js,jsx,ts,tsx}',
    // 排除一些不需要扫描的文件
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.spec.{js,jsx,ts,tsx}',
    '!src/i18n/**',
    '!**/node_modules/**',
  ],
  output: './src/i18n/locales',
  options: {
    debug: true,
    func: {
      // 扫描的函数名 - 更完整的列表
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    trans: {
      // 扫描 Trans 组件 - 使用最新配置
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      fallbackKey: function(ns, value) {
        return value;
      },
      // 支持基本HTML节点
      supportBasicHtmlNodes: true,
      keepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span'],
      // Acorn解析器配置 - 支持最新ES语法
      acorn: {
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    lngs: ['zh-CN', 'en-US'],
    ns: ['translation'],
    defaultLng: 'zh-CN',
    defaultNs: 'translation',
    defaultValue: function(lng, ns, key) {
      // 对于中文，返回 key 本身
      if (lng === 'zh-CN') {
        return key;
      }
      // 对于英文，返回空字符串，需要手动翻译
      return '';
    },
    resource: {
      // 输出格式 - JSON格式，随项目打包
      loadPath: './{{lng}}.json',
      savePath: './{{lng}}.json',
      jsonIndent: 2,
      lineEnding: '\n'
    },
    nsSeparator: false, // 禁用命名空间分隔符
    keySeparator: false, // 禁用键分隔符，允许使用点号作为键名
    interpolation: {
      prefix: '{{',
      suffix: '}}'
    },
    metadata: {},
    allowDynamicKeys: false
  }
};