
export const formatDuration = (duration, {firstLetter = false} = {firstLetter: false}) => {
    const days = addZeroOnStart(duration.days());
    const hours = addZeroOnStart(duration.hours());
    const minutes = addZeroOnStart(duration.minutes());
    const seconds = addZeroOnStart(duration.seconds());

    if (firstLetter) {

    }

    return <span>
        {days}<span className={'addon'}>{firstLetter? 'd': addSOnEND(days, 'day')}</span>
        {hours}<span className={'addon'}>{firstLetter? 'h': addSOnEND(hours, 'hour')}</span>
        {minutes}<span className={'addon'}>{firstLetter? 'm': addSOnEND(minutes, 'min')}</span>
        {seconds}<span className={'addon'}>{firstLetter? 's': addSOnEND(seconds, 'sec')}</span>
    </span>

}


const addZeroOnStart = (value) => `${value<10? 0: ''}${value}`
const addSOnEND = (value, text) => `${text}${value>1? 's': ''}`
