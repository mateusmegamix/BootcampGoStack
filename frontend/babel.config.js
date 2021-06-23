module.exports = {
    presets: [
        '@babel/preset-env', // env é responsável por fazer o browser compreender a leitura da aplição
        '@babel/preset-react' // Adiciona as funcionalidades react para o browser entender
    ],
    plugins: [
        '@babel/plugin-transform-runtime'
    ]
};