// chave criptografica para descriptografar tokens
const privateKey = process.env.API_PRIVATE_KEY || 'chaveDev';
const tempoSessao = process.env.VALIDADE_TOKEN || '1h';
export { privateKey, tempoSessao };