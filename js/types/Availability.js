// наличие товара в каждом доступном городе
export default class Availability {
    _moscow = 0;
    _orenburg = 0;
    _saintPetersburg = 0;

    constructor(moscow, orenburg, saintPetersburg) {
        if (moscow) {
            this._moscow = moscow;
        }
        if (orenburg) {
            this._orenburg = orenburg;
        }
        if (saintPetersburg) {
            this._saintPetersburg = saintPetersburg;
        }
    }

    get moscow() {
        return this._moscow;
    }

    set moscow(value) {
        this._moscow = value;

        if (value<0) {
            this._moscow = 0;
        } else {
            this._moscow = value;
        }
    }

    get orenburg() {
        return this._orenburg;
    }

    set orenburg(value) {
        this._orenburg = value;

        if (value<0) {
            this._orenburg = 0;
        } else {
            this._orenburg = value;
        }
    }

    get saintPetersburg() {
        return this._saintPetersburg;
    }

    set saintPetersburg(value) {
        this._saintPetersburg = value;

        if (value<0) {
            this._saintPetersburg = 0;
        } else {
            this._saintPetersburg = value;
        }
    }
}