module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    // 재할당이 없는 변수는 const 사용 강제
    'prefer-const': 'error',
    // 암묵적 타입 변환 방지 (!!value, +value 등)
    'no-implicit-coercion': 'warn',
    // 사용하지 않는 변수 체크 (언더스코어로 시작하면 허용)
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // any 사용 경고
    '@typescript-eslint/no-explicit-any': 'warn',
    // non-null assertion(!) 사용 경고
    '@typescript-eslint/no-non-null-assertion': 'warn',
    // map으로 JSX 렌더링할 때 key 누락 방지
    'react/jsx-key': 'warn',
    // useEffect / useCallback 의존성 배열 체크
    'react-hooks/exhaustive-deps': 'warn',
    // ' 따옴표 경고
    'react/no-unescaped-entities': 'warn',
    // React 17 이상에서는 import React 불필요
    'react/react-in-jsx-scope': 'off',
  },
  ignorePatterns: ['.next/', 'out/', 'build/', 'next-env.d.ts', '.eslintrc.js'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
