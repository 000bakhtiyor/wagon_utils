import { Injectable } from '@nestjs/common';

@Injectable()
export class WagonUtilsService {
  getWagonType(wagonId: string): string {
    if (wagonId.startsWith('2')) return 'Крытый';
    if (wagonId.startsWith('3')) return 'Платформа, думкар, фитинговая платформа';
    if (wagonId.startsWith('4')) return 'Платформа';
    if (wagonId.startsWith('5')) return 'Газовая цистерна, машина-вагон';
    if (wagonId.startsWith('6')) return 'Полувагон';
    if (wagonId.startsWith('7')) return 'Цистерна';
    if (wagonId.startsWith('8')) return 'Рефрижератор';
    if (wagonId.startsWith('9')) return 'Прочие фитинговые платформы, зерновоз';
    return 'Неизвестный тип';
  }

  calculateLuhnCheckDigit(code7: string): string {
    const digits = code7.split('').map(c => parseInt(c, 10));
    let checksum = 0;
    for (let i = 0; i < 7; i++) {
      let digit = digits[i];
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      checksum += digit;
    }
    return String((10 - (checksum % 10)) % 10);
  }

  fixLuhnCode(code: string): string {
    if (code.length !== 8) return code;

    if (!code.includes('*')) {
      const code7 = code.slice(0, 7);
      return code7 + this.calculateLuhnCheckDigit(code7);
    }

    const indices = [...code].map((c, i) => (c === '*' ? i : -1)).filter(i => i >= 0);
    if (indices.length > 2) return code;

    const digits = '0123456789';
    const product = (arr: string[], repeat: number): string[][] => {
      if (repeat === 1) return arr.map(v => [v]);
      const result: string[][] = [];
      for (const val of arr) {
        for (const sub of product(arr, repeat - 1)) {
          result.push([val, ...sub]);
        }
      }
      return result;
    };

    for (const repl of product(digits.split(''), indices.length)) {
      const candidate = code.split('');
      indices.forEach((idx, j) => candidate[idx] = repl[j]);

      if (candidate[0] === '0' || candidate[0] === '1') continue;

      const candidate7 = candidate.slice(0, 7).join('');
      const correctCheck = this.calculateLuhnCheckDigit(candidate7);
      const fullCode = candidate7 + correctCheck;

      if (candidate.join('') === fullCode) {
        return fullCode;
      }
    }

    return code;
  }

  checkLuhnCode(code: string): boolean {
    if (code.length !== 8 || code.includes('*')) return false;

    const code7 = code.slice(0, 7);
    const digits = code7.split('').map(c => parseInt(c, 10));
    let checksum = 0;
    for (let i = 0; i < 7; i++) {
      let digit = digits[i];
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      checksum += digit;
    }
    return checksum === parseInt(code[7], 10);
  }
}
