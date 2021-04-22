

export const monthDays = (month) => {
    if ([1,3,5,7,8,10,12].includes(month)){
        return 31;
    } else if ([4,6,9,11].includes(month)) {
        return 30;
    } else {
        return 28;
    }
}

export const generateTimeStamp = (date) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    let dateObj = new Date(date);

    let offset = dateObj.getTimezoneOffset()/60;

    var msgD = today.getDate()
    var msgM = today.getMonth() + 1
    var msgY = today.getFullYear();
    if (date) {
        var msgD = dateObj.getDate('en-US', { timeZone: 'America/New_York' })
        var msgM = dateObj.getMonth('en-US', { timeZone: 'America/New_York' }) + 1
        var msgY = dateObj.getFullYear('en-US', { timeZone: 'America/New_York' })
    }
    
    if (dateObj.getHours() - offset < 0) {
        msgD--;
        if (msgD == 0) {
            msgM--;
            if (msgM == 0) {
                msgY--;
                msgM = 12;
            }
            msgD = monthDays(msgM)
        }
    }

    if (parseInt(dd) == msgD && parseInt(mm) == msgM && parseInt(yyyy) == msgY) {
        let dateObj = new Date();
        let timeH = parseInt(dateObj.getHours())
        let timeM = dateObj.getMinutes()
        if (date) {
            timeH = (parseInt(date.slice(11, 13)) + 24 - offset) % 24
            timeM = date.slice(14, 16)
        }
        
        
        if (timeH >= 12) {
            if (timeH > 12) {
                timeH -= 12;
            }
            return (`Today at ${timeH.toString()}:${timeM.toString().padStart(2, '0')} PM`)
        }

        if (timeH == 0) {
            timeH = 12;
        }
        return (`Today at ${timeH.toString()}:${timeM.toString().padStart(2, '0')} AM`)
    } else if (parseInt(dd) == msgD + 1 && parseInt(mm) == msgM && parseInt(yyyy) == msgY) {
        let dateObj = new Date();
        let timeH = parseInt(dateObj.getHours());
        let timeM = dateObj.getMinutes();
        if (date) {
            timeH = (parseInt(date.slice(11, 13)) + 24 - offset) % 24
            timeM = date.slice(14, 16)
        }
        if (timeH > 12) {
            timeH -= 12;
            return (`Yesterday at ${timeH.toString() + ":" + timeM.toString().padStart(2, '0')} PM`)
        }
        return (`Yesterday at ${timeH.toString() + ":" + timeM.toString().padStart(2, '0')} AM`)
    } else {
        return (`${msgM}/${msgD.toString().padStart(2,'0')}/${msgY}`)
    }

    
}

export const generateTimeStampRepeat = (date) => {

    let dateObj = new Date();
    let offset = dateObj.getTimezoneOffset()/60;
    
    let timeH = dateObj.getHours();
    let timeM = dateObj.getMinutes()
    if (date) {
        timeH = (parseInt(date.slice(11, 13)) + 24 - offset) % 24
        timeM = date.slice(14, 16)
    }

    
    if (timeH > 12) {
        timeH -= 12;
        return (`${timeH.toString()}:${timeM.toString().padStart(2, '0')} PM`)
    }
    return (`${timeH.toString()}:${timeM.toString().padStart(2, '0')} AM`)
}