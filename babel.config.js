const ignore = ['src/utils/libs/**'];

const presets = isDev => [
  [
    '@babel/preset-env',
    {
      debug: false,
      modules: false,
      loose: !isDev,
      targets: {
        browsers: 'defaults',
      },
    },
  ],
  '@babel/preset-typescript',
  '@babel/preset-react',
];

const plugins = isTest => {
  const $plugins = [
    // '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ];

  if (!isTest) {
    $plugins.push([
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ]);
  }

  return $plugins;
};

module.exports = {
  env: {
    production: {
      presets: presets(),
      plugins: plugins(),
      ignore,
    },
    development: {
      presets: presets(true),
      plugins: [...plugins()],
      ignore,
    },
    test: {
      presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
      plugins: plugins(true),
    },
  },
};
