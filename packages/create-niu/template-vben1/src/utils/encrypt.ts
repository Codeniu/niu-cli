import { JSEncrypt } from 'jsencrypt'

const PUBLIC_KEY = `MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALk+KkQL57n7TorF/a/1XYBl3DPwuL5ZQKQg4xy1jT+Ws7ZTAJeCQGyCVuDIwD0WMu5Q5dao26l0dn5tUgzdxP0CAwEAAQ==`
const PRIVATE_KEY = `MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAuT4qRAvnuftOisX9r/VdgGXcM/C4vllApCDjHLWNP5aztlMAl4JAbIJW4MjAPRYy7lDl1qjbqXR2fm1SDN3E/QIDAQABAkEAsAc/2LvLbzM9FqhAgyXRvUKONxlIJTHhOFY8Gzr2x3XGRoBXKjEUAz+GNNbzR9pMfWAhIAM6Tv9oHj2ZLBjVjQIhAPy5tQXCmiGQPpdfDjeRhJY1bDQxrQLyvZpD/cpmq/tHAiEAu6SeFospDULkuVoBsn4wUtnNAIkqWnII0Xno3ems15sCIQDgThcb6K+SMItNIIHm0hICm6HQ5XIwVq/v1n7PgLcOCwIgYwolQuLanRxEmyxNnweJvAEnefPr/ecYjnAZIB/5UacCID7Kf6l6bIzfFBGvtaMZR2y0wE+qxdvLglYdkzFFe9N2`

export function doEncrypt(password: string) {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(PUBLIC_KEY)
  const data = encrypt.encrypt(password)
  return data
}

export function doDecrypt(password: string) {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(PRIVATE_KEY)
  const data = encrypt.decrypt(password)
  return data
}
