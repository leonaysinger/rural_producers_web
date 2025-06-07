export function isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false
  
    let sum = 0
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i)
    let rev = 11 - (sum % 11)
    if (rev >= 10) rev = 0
    if (rev !== parseInt(cpf.charAt(9))) return false
  
    sum = 0
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i)
    rev = 11 - (sum % 11)
    if (rev >= 10) rev = 0
    return rev === parseInt(cpf.charAt(10))
  }
  
  export function isValidCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '')
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false
  
    const t = cnpj.length - 2
    const d = cnpj.substring(t)
    const calc = (x: number) => {
      let n = 0
      let p = x - 7
      for (let i = x; i >= 1; i--) {
        n += parseInt(cnpj.charAt(x - i)) * p--
        if (p < 2) p = 9
      }
      return ((n % 11) < 2 ? 0 : 11 - (n % 11))
    }
    return calc(t) === parseInt(d.charAt(0)) && calc(t + 1) === parseInt(d.charAt(1))
  }
  