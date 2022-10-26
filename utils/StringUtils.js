import { NumericFormat } from 'react-number-format';

export const substring = (value, {firstBreak = 4, lastBreak = 4, joiner = '...'} = {firstBreak: 4, lastBreak: 3, joiner : '...'}) => {
    if (!value) {
        return '';
    }
    const len = value.length;
    if (len <= firstBreak+lastBreak+joiner.length) {
        return value;
    }
    return `${value.substring(0, firstBreak)}${joiner}${value.slice(-lastBreak)}`
}


export const NumberToString = (value) => {

    if(!value) {
        return ''
    }

    return <NumericFormat value={value.toFixed(2)} displayType={'text'} thousandSeparator={','}/>
}
