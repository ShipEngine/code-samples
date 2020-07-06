function getFutureDate() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0!
    let yyyy = today.getFullYear();

    dd += 4;

    if (dd < 10) {
        dd = `0${dd}`;
    }
    if (dd > 28) {
        dd = '01';
        mm += 1;
    }
    // dec->jan rollover
    if (mm > 12) {
        mm -= 12;
        yyyy += 1;
    }
    if (mm < 10) {
        mm = `0${mm}`;
    }

    const future = `${yyyy}-${mm}-${dd}T00:00:00Z`;
    return future;
}

module.exports = {
    getFutureDate,
}
